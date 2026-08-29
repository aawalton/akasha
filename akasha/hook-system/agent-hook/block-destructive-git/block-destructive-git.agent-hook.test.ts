import { expect, test } from "bun:test"
import { join } from "node:path"
import { payloadOf } from "../../hook-payload/hook-payload.module.code.ts"
import { refusalFor, refusalIn, SCOPE } from "./block-destructive-git.agent-hook.code.ts"

const SCRIPT = join(import.meta.dir, "block-destructive-git.agent-hook.code.ts")

const VERBS = ["stash", "reset", "rebase", "checkout", "restore", "clean", "rm"]

test("every verb it names is refused on its own", () => {
  for (const verb of VERBS) {
    expect(refusalIn(`git ${verb}`)).not.toBeNull()
  }
})

test("a verb it names is refused whatever follows it, and no path narrows it", () => {
  expect(refusalIn("git reset --hard")).not.toBeNull()
  expect(refusalIn("git reset --soft HEAD~1")).not.toBeNull()
  expect(refusalIn("git checkout -- tools/one.ts")).not.toBeNull()
  expect(refusalIn("git restore --staged akasha/one.ts")).not.toBeNull()
  expect(refusalIn("git clean -fdx")).not.toBeNull()
})

test("a refusal says what the call would destroy", () => {
  expect(refusalIn("git clean -fd")).toContain("deletes untracked files")
  expect(refusalIn("git stash")).toContain("takes every uncommitted change")
})

test("a refusal over a body says how to get that body before it says to write it", () => {
  const said = refusalIn("git checkout -- akasha/one.ts") ?? ""
  expect(said).toContain("git show HEAD:<path> > <body>")
  expect(said.indexOf("git show HEAD:")).toBeLessThan(said.indexOf("akasha write"))
})

test("a refusal over a body names a route inside akasha and a route outside it", () => {
  const said = refusalIn("git checkout -- akasha/one.ts") ?? ""
  expect(said).toContain("under `akasha/`:  akasha write")
  expect(said).toContain("anywhere else:    cp <body> <path>")
})

test("a refusal over a body says the worktree is shared, not that the file is akasha's", () => {
  for (const command of ["git checkout -- one.ts", "git restore one.ts"]) {
    expect(refusalIn(command)).toContain("This worktree is shared")
  }
})

test("a refusal over a deletion names a route inside akasha and a route outside it", () => {
  const said = refusalIn("git rm akasha/one.ts") ?? ""
  expect(said).toContain("under `akasha/`:  akasha remove")
  expect(said).toContain('anywhere else:    rm <path> && git commit -m "<why>" -- <path>')
  expect(said).toContain("This worktree is shared")
})

test("a refusal names no flag of its own, and sends the reader to the help", () => {
  for (const command of ["git rm one.ts", "git checkout -- one.ts", "git commit --amend"]) {
    const said = refusalIn(command) ?? ""
    expect(said).toContain("Say `akasha --help` for what each takes.")
    expect(said).not.toContain("--file-path <path>")
  }
})

test("a refusal with no akasha command behind it says none does it", () => {
  for (const command of ["git stash", "git reset --hard", "git rebase main", "git clean -fd"]) {
    expect(refusalIn(command)).toContain("No akasha command does this")
  }
})

test("every refusal names the hook that made it", () => {
  expect(refusalIn("git stash")).toContain("block-destructive-git refused this call.")
})

test("an amend is refused, and a plain commit is not this hook's business", () => {
  expect(refusalIn("git commit --amend --no-edit")).toContain("rewrites the commit at HEAD")
  expect(refusalIn("git commit --amend=one")).not.toBeNull()
  expect(refusalIn('git commit -m "one"')).toBeNull()
})

test("an amend refusal names the command that lands another commit", () => {
  expect(refusalIn("git commit --amend")).toContain(
    "To change what a commit says, land another one with `akasha write`."
  )
})

test("every forced form of push is refused, and a plain push is not", () => {
  for (const flag of ["--force", "-f", "--force-with-lease", "--force-if-includes"]) {
    expect(refusalIn(`git push ${flag} origin main`)).not.toBeNull()
  }
  expect(refusalIn("git push --force-with-lease=main:abc123 origin main")).not.toBeNull()
  expect(refusalIn("git push origin main")).toBeNull()
})

test("a forced branch delete is refused, and a plain one is not", () => {
  expect(refusalIn("git branch -D one")).not.toBeNull()
  expect(refusalIn("git branch --delete --force one")).not.toBeNull()
  expect(refusalIn("git branch --force --delete one")).not.toBeNull()
  expect(refusalIn("git branch -d one")).toBeNull()
  expect(refusalIn("git branch --delete one")).toBeNull()
  expect(refusalIn("git branch one")).toBeNull()
})

test("a read is stood aside from", () => {
  for (const command of [
    "git status",
    "git log --oneline -5",
    "git diff --stat",
    "git show HEAD",
  ]) {
    expect(refusalIn(command)).toBeNull()
  }
})

test("an akasha command stands aside, whatever verb its words carry", () => {
  expect(
    refusalIn(
      'akasha write --file-path akasha/one.ts --content-file /tmp/one --message "reset the thing"'
    )
  ).toBeNull()
  expect(refusalIn("akasha remove --file-path akasha/one.ts")).toBeNull()
})

test("a command that is not git carrying a named verb stands aside", () => {
  expect(refusalIn("rm -rf one")).toBeNull()
  expect(refusalIn("echo reset")).toBeNull()
})

test("sudo in front does not hide the call", () => {
  expect(refusalIn("sudo git reset --hard")).not.toBeNull()
})

test("an assignment and a value-taking global flag do not hide the call", () => {
  expect(refusalIn("FOO=1 git -C /elsewhere clean -fd")).not.toBeNull()
})

test("a path to git does not hide the call", () => {
  expect(refusalIn("/usr/bin/git stash")).not.toBeNull()
})

test("a verb inside a quoted payload is not a call, and is stood aside from", () => {
  expect(refusalIn('echo "git reset --hard"')).toBeNull()
  expect(refusalIn("git commit -m 'git reset --hard'")).toBeNull()
})

test("git carrying no verb is stood aside from", () => {
  expect(refusalIn("git")).toBeNull()
  expect(refusalIn("git --no-pager")).toBeNull()
  expect(refusalIn("git -C /elsewhere")).toBeNull()
})

test("a call standing behind a read on the same line is still refused", () => {
  expect(refusalIn("git status && git reset --hard")).not.toBeNull()
  expect(refusalIn("cd /elsewhere; git clean -fd")).not.toBeNull()
})

test("a call split over a continuation is refused", () => {
  expect(refusalIn("git \\\nreset --hard")).not.toBeNull()
})

test("the first refusal on a line is the one given", () => {
  expect(refusalIn("git clean -fd && git stash")).toContain("deletes untracked files")
})

test("refusalFor judges one call, and reads no other word on the line", () => {
  expect(refusalFor({ verb: "stash", rest: [] })).not.toBeNull()
  expect(refusalFor({ verb: "status", rest: [] })).toBeNull()
})

test("an empty command is stood aside from", () => {
  expect(refusalIn("")).toBeNull()
})

test("the scope says what it does not reach, and refuses to be extended", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("is NOT a finding that it is safe")
  expect(said).toContain("a longer list is a longer search prompt")
  expect(said).toContain("git worktree remove --force")
  expect(said).toContain("git checkout-index")
})

test("the scope names the overlap with the other hook rather than hiding it", () => {
  expect(SCOPE.join("\n")).toContain("block-git-writes")
})

test("the scope names every verb the hook refuses", () => {
  const said = SCOPE.join("\n")
  for (const verb of VERBS) expect(said).toContain(verb)
})

test("the hook refuses on stdin with exit 2 and a blocking decision", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("git checkout main")) })
  expect(ran.exitCode).toBe(2)
  const said: unknown = JSON.parse(ran.stdout.toString())
  expect(said).toMatchObject({ decision: "block" })
  expect((said as { reason: string }).reason).toContain("git checkout")
})

test("the hook stands aside on stdin for a call it does not name", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("git status")) })
  expect(ran.exitCode).toBe(0)
  expect(ran.stdout.toString()).toBe("")
})

test("a payload that will not parse lets the call through rather than refusing it", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from("{") })
  expect(ran.exitCode).toBe(5)
  expect(ran.stderr.toString()).toContain("the call was not refused")
})

test("the hook prints its scope when it is asked", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(ran.exitCode).toBe(0)
  for (const verb of VERBS) expect(ran.stdout.toString()).toContain(verb)
})
