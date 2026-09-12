import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join, resolve } from "node:path"
import {
  notices,
  render,
} from "akasha/agents/messaging/notices/compose-notices/compose-notices.module.code.ts"
import { output } from "akasha/commands/arguments/pages/output.argument.ts"
import {
  INPUT,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { ROOT_NAMED } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  pathOf,
  saidOf,
  seatComposeNotices,
} from "akasha/commands/pages/seat/compose-notices/seat-compose-notices.command.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

const ROOT = resolve(import.meta.dir, "../../..")

function givenIn(root: string): Given {
  return { root, calledAs: "akasha seat compose-notices", from: root, writer: null, agentId: null }
}

function scratch(): string {
  const at = mkdtempSync("/var/tmp/compose-notices-test-")
  mkdirSync(join(at, ".git"), { recursive: true })
  return at
}

function underRoot<T>(root: string, run: () => T): T {
  notices()
  const held = optionalEnv(ROOT_NAMED)
  process.env[ROOT_NAMED] = root
  try {
    return run()
  } finally {
    if (held === undefined) delete process.env[ROOT_NAMED]
    else process.env[ROOT_NAMED] = held
  }
}

function saidBy(run: () => unknown): string {
  try {
    run()
  } catch (thrown) {
    return thrown instanceof Error ? thrown.message : String(thrown)
  }
  return ""
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

test("a notice is keyed by its slug", () => {
  expect(Object.keys(notices())).toContain("editor-revive")
})

test("a checkout the index answers nothing for is refused rather than answered as no notice", () => {
  const folder = scratch()
  try {
    const said = underRoot(folder, () => saidBy(notices))

    expect(said).toContain("is not there")
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
})

test("what the module refuses to compose is what the command refuses with", () => {
  const folder = scratch()
  try {
    const said = underRoot(folder, () => seatComposeNotices([], givenIn(ROOT)))

    expect(said.code).toBe(OPERATIONAL)
    expect(said.report).toEqual([])
    expect(said.refusals[0]).toContain("is not there")
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
})

test("a word this does not take refuses as a fault in the call", () => {
  const said = seatComposeNotices(["--help-me"], givenIn(ROOT))

  expect(said.code).toBe(INPUT)
  expect(said.report).toEqual([])
})

test("a relative output path is read against the repository root, not the calling folder", () => {
  expect(pathOf("one.json", "/repo")).toBe("/repo/one.json")
  expect(pathOf("/var/tmp/one.json", "/repo")).toBe("/var/tmp/one.json")
})

test("what is said is indented two spaces", () => {
  expect(saidOf({ one: "a" })).toBe('{\n  "one": "a"\n}')
})

test("the happy answer parses as the JSON the editor's revive reads, out of the real checkout", () => {
  const said = seatComposeNotices([], givenIn(ROOT))

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

test("named an output path it writes there and says nothing", () => {
  const folder = scratch()
  const at = join(folder, "notices.json")
  try {
    const said = seatComposeNotices([output.said, at], givenIn(ROOT))

    expect(said.code).toBe(0)
    expect(said.report).toEqual([])
    expect(said.refusals).toEqual([])
    const written = readFileSync(at, "utf8")

    expect(written.endsWith("\n")).toBe(true)
    expect(JSON.parse(written)).toEqual(
      JSON.parse(seatComposeNotices([], givenIn(ROOT)).report[0] ?? "null")
    )
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
})
