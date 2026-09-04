import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import type { Given } from "@akasha/command-system/calling"
import {
  composeNotices,
  NOTICES,
  notices,
  noticesUnder,
  OUT,
  pathOf,
  readIn,
  render,
  saidOf,
} from "./compose-notices.command.code.ts"

const ROOT = resolve(import.meta.dir, "../..")

function givenIn(root: string): Given {
  return { root, calledAs: "akasha compose-notices", from: root, writer: null, agentId: null }
}

function scratch(): string {
  return mkdtempSync("/var/tmp/compose-notices-test-")
}

test("the lines of a paragraph are joined with a space", () => {
  expect(render("one\ntwo\nthree\n")).toBe("one two three")
})

test("a blank line between two paragraphs survives as one", () => {
  expect(render("one\ntwo\n\nthree\nfour\n")).toBe("one two\n\nthree four")
})

test("a run of blank lines between two paragraphs is still one blank line", () => {
  expect(render("one\n \ntwo\n\t\nthree")).toBe("one\n\ntwo\n\nthree")
})

test("a page holding nothing renders as an empty text", () => {
  expect(render("")).toBe("")
  expect(render("\n\n  \n")).toBe("")
})

test("a notice is keyed by its file name with the tail taken off", () => {
  const folder = scratch()
  try {
    writeFileSync(join(folder, "alpha.notice.text.md"), "one\ntwo\n")
    writeFileSync(join(folder, "beta.notice.text.md"), "")
    writeFileSync(join(folder, "README.md"), "not a notice\n")

    expect(noticesUnder(folder)).toEqual({ alpha: "one two", beta: "" })
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
})

test("a folder that is not there is refused rather than answered as no notice", () => {
  const said = notices("/nowhere-at-all")

  expect("refused" in said && said.refused).toContain("is not there")
})

test("a folder holding no notice page is refused the same way", () => {
  const folder = scratch()
  try {
    mkdirSync(join(folder, NOTICES), { recursive: true })
    const said = notices(folder)

    expect("refused" in said && said.refused).toContain("holds no notice page")
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
})

test("a call naming nothing writes nowhere and asks for the notices", () => {
  expect(readIn([])).toEqual({ out: null })
})

test("`--out` carries the path said after it", () => {
  expect(readIn([OUT, "/var/tmp/one.json"])).toEqual({ out: "/var/tmp/one.json" })
})

test("`--out` naming no value is refused rather than writing to nothing", () => {
  const said = readIn([OUT])

  expect("refused" in said && said.refused[0]).toContain("takes a value")
})

test("a word this does not take is named in its own refusal", () => {
  const said = readIn(["--json", "notices"])

  expect("refused" in said && said.refused.length).toBe(2)
  expect("refused" in said && said.refused[0]).toContain("`--json`")
  expect("refused" in said && said.refused[1]).toContain("`notices`")
})

test("a word this does not take refuses as a fault in the call", () => {
  const said = composeNotices(["--help-me"], givenIn(ROOT))

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
})

test("a relative out path is read against the repository root, not the calling folder", () => {
  expect(pathOf("one.json", "/repo")).toBe("/repo/one.json")
  expect(pathOf("/var/tmp/one.json", "/repo")).toBe("/var/tmp/one.json")
})

test("what is said is indented two spaces", () => {
  expect(saidOf({ one: "a" })).toBe('{\n  "one": "a"\n}')
})

test("the happy answer parses as the JSON the editor's revive reads, out of the real checkout", () => {
  const said = composeNotices([], givenIn(ROOT))

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.length).toBe(1)
  const line = said.report[0] ?? ""
  const held = JSON.parse(line) as Record<string, unknown>

  expect(typeof held["editor-revive"]).toBe("string")
  expect(String(held["editor-revive"]).length).toBeGreaterThan(0)
  for (const key of ["restart-immediate", "restart-deferred", "restart-recovery-clause"]) {
    expect(typeof held[key]).toBe("string")
  }
  expect(line.startsWith('{\n  "')).toBe(true)
})

test("named an out path it writes there and says nothing", () => {
  const folder = scratch()
  const at = join(folder, "notices.json")
  try {
    const said = composeNotices([OUT, at], givenIn(ROOT))

    expect(said.code).toBe(0)
    expect(said.report).toEqual([])
    expect(said.refusals).toEqual([])
    const written = readFileSync(at, "utf8")

    expect(written.endsWith("\n")).toBe(true)
    expect(JSON.parse(written)).toEqual(
      JSON.parse(composeNotices([], givenIn(ROOT)).report[0] ?? "null")
    )
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
})
