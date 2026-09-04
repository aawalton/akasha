import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { bytesOf as bytes } from "@akasha/testing-system/bodying"
import { put } from "@akasha/testing-system/putting"
import { MECHANICAL } from "../../command-system/asking/asking.module.code.ts"
import { repoAt } from "../../command-system/asking/asking.module.test-fixtures.ts"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { baseOf as headOf } from "../../command-system/landing/landing.module.code.ts"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { replace, replacing } from "./replace.command.code.ts"
import { replace as replaceCommand } from "./replace.command.ts"

const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoWith(named: Readonly<Record<string, string>>): string {
  return repoAt(scratch.rootFor("akasha-replace-"), named)
}

function givenIn(root: string): Given {
  return {
    root,
    calledAs: "akasha replace",
    from: root,
    writer: null,
    agentId: AGENT,
    changeKind: MECHANICAL,
  }
}

function stating(root: string, name: string, was: string, now: string): readonly string[] {
  return ["--old-file", put(root, `${name}.old`, was), "--new-file", put(root, `${name}.new`, now)]
}

function bodyOf(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8")
}

test("every occurrence in one file is replaced", () => {
  const root = repoWith({ "akasha/one.ts": '"@here/a"\n"@here/b"\n"@here/c"\n' })
  const said = replace(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "@here", "@there")],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(bodyOf(root, "akasha/one.ts")).toBe('"@there/a"\n"@there/b"\n"@there/c"\n')
})

test("several files named by one call are replaced in one commit", () => {
  const root = repoWith({
    "akasha/one.ts": '"@here/a"\n"@here/b"\n',
    "akasha/two.ts": '"@here/c"\n',
  })
  const said = replace(
    [
      "--file-path",
      "akasha/one.ts",
      "--file-path",
      "akasha/two.ts",
      ...stating(root, "a", "@here", "@there"),
      "--message",
      "held",
    ],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(bodyOf(root, "akasha/one.ts")).toBe('"@there/a"\n"@there/b"\n')
  expect(bodyOf(root, "akasha/two.ts")).toBe('"@there/c"\n')
  expect(said.report.join("\n")).toContain("committed as")
})

test("a file named that holds the passage nowhere refuses the whole call", () => {
  const root = repoWith({ "akasha/one.ts": '"@here/a"\n', "akasha/two.ts": "beta\n" })
  const was = headOf(root)
  const said = replace(
    [
      "--file-path",
      "akasha/one.ts",
      "--file-path",
      "akasha/two.ts",
      ...stating(root, "a", "@here", "@there"),
    ],
    givenIn(root)
  )
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("akasha/two.ts")
  expect(said.refusals[0]).toContain("holds the passage nowhere")
  expect(bodyOf(root, "akasha/one.ts")).toBe('"@here/a"\n')
  expect(headOf(root)).toBe(was)
})

test("`--dry-run` reports what each file holds and what they hold together, and changes nothing", () => {
  const root = repoWith({
    "akasha/one.ts": '"@here/a"\n"@here/b"\n',
    "akasha/two.ts": "beta\n",
  })
  const was = headOf(root)
  const said = replace(
    [
      "--file-path",
      "akasha/one.ts",
      "--file-path",
      "akasha/two.ts",
      "--dry-run",
      ...stating(root, "a", "@here", "@there"),
    ],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("akasha/one.ts — 2 occurrences")
  expect(said.report[1]).toBe("akasha/two.ts — 0 occurrences")
  expect(said.report[2]).toContain("2 occurrences in 2 files")
  expect(bodyOf(root, "akasha/one.ts")).toBe('"@here/a"\n"@here/b"\n')
  expect(headOf(root)).toBe(was)
})

test("a call naming no --file-path is refused", () => {
  const root = repoWith({ "akasha/one.ts": '"@here/a"\n' })
  const said = replace(stating(root, "a", "@here", "@there"), givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names no --file-path")
  expect(bodyOf(root, "akasha/one.ts")).toBe('"@here/a"\n')
})

test("a passage piped in between the markers states the replacement", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\nbeta\nalpha\n" })
  const piped = () => ({ bytes: bytes("<<<<<<< old\nalpha\n=======\ndelta\n>>>>>>> new\n") })
  const said = replacing(["--file-path", "akasha/one.ts"], givenIn(root), piped)
  expect(said.refusals).toEqual([])
  expect(bodyOf(root, "akasha/one.ts")).toBe("delta\nbeta\ndelta\n")
})

test("a replacement carrying dollar patterns lands as the bytes it is", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\nalpha\n" })
  const said = replace(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "alpha", "$& $' $` $1")],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(bodyOf(root, "akasha/one.ts")).toBe("$& $' $` $1\n$& $' $` $1\n")
})

test("a passage is matched as bytes rather than as a pattern", () => {
  const root = repoWith({ "akasha/one.ts": "a.c\nabc\n" })
  const said = replace(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "a.c", "held")],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(bodyOf(root, "akasha/one.ts")).toBe("held\nabc\n")
})

test("one path named more than once by a call is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = replace(
    [
      "--file-path",
      "akasha/one.ts",
      "--file-path",
      "akasha/one.ts",
      ...stating(root, "a", "alpha", "delta"),
    ],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("named more than once")
})

test("a path that is not there is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = replace(
    ["--file-path", "akasha/nowhere.ts", ...stating(root, "a", "alpha", "delta")],
    givenIn(root)
  )
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("is not there")
})

test("an empty passage names no place and is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = replace(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "", "delta")],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names no place")
})

test("an old file closed by no new file is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = replace(
    ["--file-path", "akasha/one.ts", "--old-file", put(root, "a.old", "alpha")],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("closed by no --new-file")
})

test("every flag this command's page shows is a flag it takes", () => {
  const given = givenIn("/nowhere")
  for (const one of replaceCommand.taking) {
    const said = replace([one.said.split(" ")[0] ?? ""], given)
    expect(said.refusals.join(" ")).not.toContain("this takes")
  }
})
