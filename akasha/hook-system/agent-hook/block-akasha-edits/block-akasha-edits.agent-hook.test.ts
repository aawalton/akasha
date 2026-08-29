import { afterAll, expect, test } from "bun:test"
import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching.module.code.ts"
import { insideOf, settled } from "../../settling.module.code.ts"
import {
  askedIn,
  holdingIn,
  refusalFor,
  rootOf,
  SCOPE,
} from "./block-akasha-edits.agent-hook.code.ts"

const HERE = rootOf(import.meta.path)

const SCRIPT = join(import.meta.dir, "block-akasha-edits.agent-hook.code.ts")

const HELD = "/var/tmp/held-agent"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(): string {
  const root = realpathSync(scratch.rootFor("block-akasha-edits-"))
  mkdirSync(join(root, "akasha/hook-system"), { recursive: true })
  mkdirSync(join(root, ".git/data/index/identity"), { recursive: true })
  mkdirSync(join(root, "tools"), { recursive: true })
  mkdirSync(join(root, "akasha-other"), { recursive: true })
  writeFileSync(join(root, "akasha/held.ts"), "held\n")
  return root
}

function asking(toolName: string, filePath: string, from: string) {
  return { toolName, filePath, from }
}

function judged(root: string, filePath: string, from = root): string | null {
  return refusalFor(asking("Write", filePath, from), root, root, HELD)
}

test("every spelling of one path inside akasha is the same refusal", () => {
  const root = repo()
  const forms = [
    "akasha/held.ts",
    "./akasha/held.ts",
    join(root, "akasha/held.ts"),
    "tools/../akasha/held.ts",
    "akasha/./hook-system/../held.ts",
  ]
  for (const one of forms) {
    const said = judged(root, one)
    expect(said).not.toBeNull()
    expect(said).toContain("inside the akasha folder")
    expect(said).toContain("--file-path akasha/held.ts")
  }
})

test("a symlink pointing inside akasha is refused where it lands", () => {
  const root = repo()
  symlinkSync(join(root, "akasha/held.ts"), join(root, "tools/held.ts"))
  expect(judged(root, "tools/held.ts")).toContain("--file-path akasha/held.ts")
})

test("a symlink whose target does not exist yet is refused where it would land", () => {
  const root = repo()
  symlinkSync(join(root, "akasha/unwritten.ts"), join(root, "tools/unwritten.ts"))
  expect(judged(root, "tools/unwritten.ts")).toContain("--file-path akasha/unwritten.ts")
})

test("a symlinked directory reaching akasha is refused", () => {
  const root = repo()
  symlinkSync(join(root, "akasha"), join(root, "tools/pages"))
  expect(judged(root, "tools/pages/new.ts")).toContain("--file-path akasha/new.ts")
})

test("the repository root reached through a symlink is the same root", () => {
  const root = repo()
  const near = join(realpathSync(scratch.rootFor("block-akasha-edits-link-")), "repo")
  symlinkSync(root, near)
  const said = refusalFor(asking("Write", "akasha/held.ts", near), near, near, HELD)
  expect(said).toContain("--file-path akasha/held.ts")
})

test("a sibling folder whose name starts with the root's name is stood aside", () => {
  const root = repo()
  expect(judged(root, "akasha-other/held.ts")).toBeNull()
  expect(judged(root, join(root, "akasha-other/held.ts"))).toBeNull()
})

test("a temp file outside the guarded roots is written as usual", () => {
  const root = repo()
  expect(judged(root, "/var/tmp/block-akasha-edits-body.txt")).toBeNull()
  expect(refusalFor(asking("Edit", "/var/tmp/held.old", root), root, root, HELD)).toBeNull()
  expect(refusalFor(asking("Write", "/var/tmp/held.new", "/var/tmp"), root, root, HELD)).toBeNull()
})

test("a path under `.git/data` is refused, and names the one repair", () => {
  const root = repo()
  const said = judged(root, ".git/data/index/path/one.jsonl")
  expect(said).toContain("inside the akasha index")
  expect(said).toContain("akasha index refresh")
  expect(said).toContain("`.git/data` holds the index")
})

test("`.git` outside `.git/data` is not guarded here", () => {
  const root = repo()
  expect(judged(root, ".git/config")).toBeNull()
})

test("a relative path is resolved against the working directory the call was made in", () => {
  const root = repo()
  expect(judged(root, "held.ts", join(root, "akasha"))).toContain("--file-path akasha/held.ts")
  expect(judged(root, "held.ts", join(root, "tools"))).toBeNull()
})

test("a call stating no working directory falls back to the one given", () => {
  const root = repo()
  expect(
    refusalFor(asking("Write", "held.ts", ""), root, join(root, "akasha"), HELD)
  ).not.toBeNull()
  expect(refusalFor(asking("Write", "held.ts", ""), root, join(root, "tools"), HELD)).toBeNull()
})

test("a call carrying no path is stood aside", () => {
  const root = repo()
  for (const one of ["", "   "]) expect(judged(root, one)).toBeNull()
})

test("a tool this hook does not name is stood aside", () => {
  const root = repo()
  expect(refusalFor(asking("Read", "akasha/held.ts", root), root, root, HELD)).toBeNull()
  expect(refusalFor(asking("Bash", "akasha/held.ts", root), root, root, HELD)).toBeNull()
})

test("the body a write is staged in stands under the agent's own folder", () => {
  expect(holdingIn("01a0-seat")).toBe("/var/tmp/01a0-seat")
  expect(holdingIn("  01a0-seat  ")).toBe("/var/tmp/01a0-seat")
})

test("an agent that states no name is held apart from one that does", () => {
  expect(holdingIn("")).toBe("/var/tmp/unnamed")
  expect(holdingIn("   ")).toBe("/var/tmp/unnamed")
})

test("Write names the write command with its flags filled in", () => {
  const root = repo()
  const said = judged(root, "akasha/held.ts") ?? ""
  expect(said).toContain(
    `akasha write --file-path akasha/held.ts --content-file ${HELD}/block-akasha-edits-held.ts` +
      ' --message "<what this change is for>"'
  )
  expect(said).toContain(`Put the whole new body in ${HELD}/block-akasha-edits-held.ts`)
})

test("Edit names the edit command with both files filled in", () => {
  const root = repo()
  const said = refusalFor(asking("Edit", "akasha/held.ts", root), root, root, HELD) ?? ""
  expect(said).toContain(
    `akasha edit --file-path akasha/held.ts --old-file ${HELD}/block-akasha-edits-held.ts.old` +
      ` --new-file ${HELD}/block-akasha-edits-held.ts.new --message "<what this change is for>"`
  )
})

test("the refusal names the akasha commands rather than a word for them", () => {
  const root = repo()
  const said = judged(root, "akasha/held.ts") ?? ""
  expect(said).toContain("The akasha commands write that folder")
  expect(said).not.toContain("the door")
})

test("the refusal bounds itself by naming both guarded roots", () => {
  const root = repo()
  const said = judged(root, "akasha/held.ts") ?? ""
  expect(said).toContain("only `akasha/` and `.git/data` are refused here.")
})

test("NotebookEdit is refused plainly, and names no command", () => {
  const root = repo()
  const said = refusalFor(asking("NotebookEdit", "akasha/one.ipynb", root), root, root, HELD) ?? ""
  expect(said).toContain("There is no akasha command for a notebook")
  expect(said).not.toContain("akasha write")
  expect(said).not.toContain("akasha edit")
})

test("a NotebookEdit path arrives as `notebook_path`", () => {
  const payload = JSON.stringify({
    tool_name: "NotebookEdit",
    tool_input: { notebook_path: "/one/two.ipynb" },
    cwd: "/one",
  })
  expect(askedIn(payload)?.filePath).toBe("/one/two.ipynb")
})

test("a payload states the tool, the path and the working directory", () => {
  const payload = JSON.stringify({
    tool_name: "Write",
    tool_input: { file_path: "akasha/held.ts", content: "held" },
    cwd: "/one",
  })
  expect(askedIn(payload)).toEqual({ toolName: "Write", filePath: "akasha/held.ts", from: "/one" })
})

test("a payload that will not read is answered by null, never by standing aside", () => {
  for (const one of ["{", "[]", "null", '"held"']) expect(askedIn(one)).toBeNull()
})

test("a payload missing its tool input reads as a call carrying no path", () => {
  expect(askedIn('{"tool_name":"Write"}')).toEqual({ toolName: "Write", filePath: "", from: "" })
})

test("what is inside a root is decided at the separator", () => {
  expect(insideOf("/a/b", "/a/b")).toBe(true)
  expect(insideOf("/a/b", "/a/b/c")).toBe(true)
  expect(insideOf("/a/b", "/a/bc")).toBe(false)
  expect(insideOf("/a/b", "/a")).toBe(false)
  expect(insideOf("/a/b", "/a/b/..held")).toBe(true)
})

test("a path no part of which exists is settled without inventing one", () => {
  const root = repo()
  expect(settled(join(root, "akasha/no/such/one.ts"))).toBe(join(root, "akasha/no/such/one.ts"))
})

test("the scope says the class is closed and names what it does not reach", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("CLOSED over the tools it judges")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("a write through `Bash`")
  expect(said).toContain("a tool this hook does not name")
})

test("the hook refuses on stdin with exit 2 and a blocking decision", () => {
  const payload = JSON.stringify({
    tool_name: "Write",
    tool_input: { file_path: "akasha/hook-system/hook-system.domain.ts" },
    cwd: HERE,
  })
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from(payload) })
  expect(ran.exitCode).toBe(2)
  const said: unknown = JSON.parse(ran.stdout.toString())
  expect(said).toMatchObject({ decision: "block" })
  expect((said as { reason: string }).reason).toContain("akasha write --file-path akasha/")
})

test("the agent the call came from names the folder the body is staged in", () => {
  const payload = JSON.stringify({
    tool_name: "Write",
    tool_input: { file_path: "akasha/hook-system/hook-system.domain.ts" },
    cwd: HERE,
  })
  const ran = Bun.spawnSync(["bun", SCRIPT], {
    stdin: Buffer.from(payload),
    env: { ...process.env, AGENT_ID: "01a0-stated" },
  })
  expect(ran.exitCode).toBe(2)
  expect(ran.stderr.toString()).toContain("/var/tmp/01a0-stated/block-akasha-edits-")
})

test("the hook stands aside on stdin for a path outside the guarded roots", () => {
  const payload = JSON.stringify({
    tool_name: "Write",
    tool_input: { file_path: "/var/tmp/block-akasha-edits-aside.txt" },
    cwd: HERE,
  })
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from(payload) })
  expect(ran.exitCode).toBe(0)
  expect(ran.stdout.toString()).toBe("")
})

test("the hook prints its scope when it is asked", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(ran.exitCode).toBe(0)
  expect(ran.stdout.toString()).toContain("NOT REACHED")
})
