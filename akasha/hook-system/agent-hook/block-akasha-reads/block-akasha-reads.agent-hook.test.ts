import { afterAll, expect, test } from "bun:test"
import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching.module.code.ts"
import { refusalIn, rootOf, SCOPE } from "./block-akasha-reads.agent-hook.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function worldAt(): string {
  const root = realpathSync(scratch.rootFor("akasha-reads-hook-"))
  mkdirSync(join(root, "akasha", "one"), { recursive: true })
  writeFileSync(join(root, "akasha", "one", "held.ts"), "one\n")
  mkdirSync(join(root, "outside"), { recursive: true })
  writeFileSync(join(root, "outside", "held.ts"), "one\n")
  return root
}

test("a Read inside akasha is refused and names the akasha read", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "akasha", "one", "held.ts"), root, root)
  expect(said).not.toBeNull()
  expect(said).toContain("akasha read --file-path akasha/one/held.ts")
  expect(said).toContain("inside the akasha folder")
})

test("a refusal says the output must reach the agent", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "akasha", "one", "held.ts"), root, root)
  expect(said).toContain("LET THE OUTPUT REACH YOU")
  expect(said).toContain("/dev/null")
})

test("a refusal says a body already held comes back as one line", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "akasha", "one", "held.ts"), root, root)
  expect(said).toContain("already hold")
  expect(said).toContain("--full")
})

test("a path is resolved against the directory the call was made in", () => {
  const root = worldAt()
  const said = refusalIn("one/held.ts", join(root, "akasha"), root)
  expect(said).toContain("akasha read --file-path akasha/one/held.ts")
})

test("a path spelled through a parent still lands inside", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "outside", "..", "akasha", "one", "held.ts"), root, root)
  expect(said).not.toBeNull()
})

test("a Read outside akasha stands", () => {
  const root = worldAt()
  expect(refusalIn(join(root, "outside", "held.ts"), root, root)).toBeNull()
})

test("the index is no page, so a Read of .git/data stands", () => {
  const root = worldAt()
  mkdirSync(join(root, ".git", "data"), { recursive: true })
  writeFileSync(join(root, ".git", "data", "one.jsonl"), "{}\n")
  expect(refusalIn(join(root, ".git", "data", "one.jsonl"), root, root)).toBeNull()
})

test("a link inside akasha pointing out of it stands", () => {
  const root = worldAt()
  symlinkSync(join(root, "outside", "held.ts"), join(root, "akasha", "pointer.ts"))
  expect(refusalIn(join(root, "akasha", "pointer.ts"), root, root)).toBeNull()
})

test("a link outside akasha pointing into it is refused", () => {
  const root = worldAt()
  symlinkSync(join(root, "akasha", "one", "held.ts"), join(root, "outside", "pointer.ts"))
  expect(refusalIn(join(root, "outside", "pointer.ts"), root, root)).not.toBeNull()
})

test("a call naming no path stands", () => {
  const root = worldAt()
  expect(refusalIn("", root, root)).toBeNull()
  expect(refusalIn("   ", root, root)).toBeNull()
})

test("another checkout of the repository is not guarded from here", () => {
  const one = worldAt()
  const other = worldAt()
  expect(refusalIn(join(other, "akasha", "one", "held.ts"), other, one)).toBeNull()
})

test("a file that is not there yet is judged by where it would land", () => {
  const root = worldAt()
  expect(refusalIn(join(root, "akasha", "one", "unborn.ts"), root, root)).not.toBeNull()
})

test("what this does not reach is printed, and names Grep and Glob", () => {
  expect(SCOPE.join("\n")).toContain("NOT REACHED")
  expect(SCOPE.join("\n")).toContain("Grep and Glob")
  expect(SCOPE.join("\n")).toContain(".git/data")
})

test("the repository is taken from where the hook's own file stands", () => {
  expect(rootOf("/one/akasha/hook-system/agent-hook/block/one.ts")).toBe("/one")
})
