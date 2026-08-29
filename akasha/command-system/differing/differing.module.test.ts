import { afterAll, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { readdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { bytesOf as bodyOf } from "../../testing-system/bodying/bodying.module.code.ts"
import { blobIdOf } from "../reading/reading.module.code.ts"
import { SCRATCH_AT, scratchWorld } from "../scratching/scratching.module.code.ts"
import { bodyRead, differenceOf } from "./differing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AT = "held.ts"

function inGit(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  })
}

function repoWith(body: string): string {
  const root = scratch.rootFor("akasha-differing-")
  writeFileSync(join(root, AT), body)
  inGit(root, ["init", "--quiet"])
  inGit(root, ["config", "user.email", "held@akasha"])
  inGit(root, ["config", "user.name", "held"])
  inGit(root, ["config", "commit.gpgsign", "false"])
  inGit(root, ["add", "--", AT])
  inGit(root, ["commit", "--quiet", "-m", AT, "--", AT])
  return root
}

test("a body that reached a commit is found again by its object id", () => {
  const root = repoWith("one\ntwo\n")
  const found = bodyRead(root, blobIdOf(bodyOf("one\ntwo\n")))
  expect(found === null ? null : new TextDecoder().decode(found)).toBe("one\ntwo\n")
})

test("a body that reached no commit is not found", () => {
  const root = repoWith("one\n")
  writeFileSync(join(root, AT), "two\n")
  expect(bodyRead(root, blobIdOf(bodyOf("two\n")))).toBeNull()
})

test("an object id git does not hold is not found", () => {
  const root = repoWith("one\n")
  expect(bodyRead(root, blobIdOf(bodyOf("nowhere\n")))).toBeNull()
})

test("what is not an object id at all is not found", () => {
  const root = repoWith("one\n")
  for (const said of ["", "HEAD", "one\n", "0123456789abcdef", "../../etc/passwd"]) {
    expect(bodyRead(root, said)).toBeNull()
  }
})

test("an object that is not a blob is not found", () => {
  const root = repoWith("one\n")
  for (const said of ["HEAD", "HEAD^{tree}"]) {
    expect(bodyRead(root, inGit(root, ["rev-parse", said]).trim())).toBeNull()
  }
})

test("no repository holds anything, so nothing is found there", () => {
  const root = scratch.rootFor("akasha-differing-bare-")
  expect(bodyRead(root, blobIdOf(bodyOf("one\n")))).toBeNull()
})

test("a difference names what was read and what stands now, and what moved between them", () => {
  const said = differenceOf(bodyOf("one\ntwo\nthree\n"), bodyOf("one\nTWO\nthree\n"))
  expect(said).toBe(
    [
      "--- as you last read it",
      "+++ as it stands now",
      "@@ -1,3 +1,3 @@",
      " one",
      "-two",
      "+TWO",
      " three",
    ].join("\n")
  )
})

test("a difference carries one line either side of what moved and no more", () => {
  const was = `${Array.from({ length: 40 }, (_, one) => `line ${one}`).join("\n")}\n`
  const said = differenceOf(bodyOf(was), bodyOf(was.replace("line 20\n", "line twenty\n"))) ?? ""
  const lines = said.split("\n")
  expect(lines[2]).toStartWith("@@ -20,3 +20,3 @@")
  expect(lines.slice(3)).toEqual([" line 19", "-line 20", "+line twenty", " line 21"])
})

test("a body with no line at its end says so", () => {
  const said = differenceOf(bodyOf("one\n"), bodyOf("one")) ?? ""
  expect(said).toContain("\\ No newline at end of file")
})

test("two bodies that are the same are no difference", () => {
  expect(differenceOf(bodyOf("one\n"), bodyOf("one\n"))).toBeNull()
})

test("a body that is not text is no difference", () => {
  expect(differenceOf(new Uint8Array([0xff, 0xfe, 0x00, 0x41]), bodyOf("one\n"))).toBeNull()
})

test("the files a difference was taken over are gone when it is answered", () => {
  const before = readdirSync(SCRATCH_AT).filter((one) => one.startsWith("akasha-differing-")).length
  differenceOf(bodyOf("one\n"), bodyOf("two\n"))
  const after = readdirSync(SCRATCH_AT).filter((one) => one.startsWith("akasha-differing-")).length
  expect(after).toBe(before)
})
