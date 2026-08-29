import { expect, test } from "bun:test"
import { refusalFor, refusalIn, SCOPE } from "./block-destructive-git.agent-hook.code.ts"

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

test("a refusal over a body names the write and edit commands, with their flags filled in", () => {
  const said = refusalIn("git checkout -- akasha/one.ts") ?? ""
  expect(said).toContain(
    'bun akasha/command-system/cli.module.code.ts write --file-path <path> --content-file <body> --message "<why>"'
  )
  expect(said).toContain(
    'bun akasha/command-system/cli.module.code.ts edit --file-path <path> --old-file <was> --new-file <now> --message "<why>"'
  )
  expect(said).toContain("--message-file <file>")
})

test("a refusal over a deletion names the remove command, with its flags filled in", () => {
  expect(refusalIn("git rm akasha/one.ts")).toContain(
    'bun akasha/command-system/cli.module.code.ts remove --file-path <path> --message "<why>"'
  )
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
    'bun akasha/command-system/cli.module.code.ts write --file-path <path> --content-file <body> --message "<why>"'
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
  for (const command of ["git status", "git log --oneline -5", "git diff --stat", "git show HEAD"]) {
    expect(refusalIn(command)).toBeNull()
  }
})

test("an akasha command stands aside, whatever verb its words carry", () => {
  expect(
    refusalIn(
      'bun akasha/command-system/cli.module.code.ts write --file-path akasha/one.ts --content-file /tmp/one --message "reset the thing"'
    )
  ).toBeNull()
  expect(refusalIn("bun akasha/command-system/cli.module.code.ts remove --file-path akasha/one.ts")).toBeNull()
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
