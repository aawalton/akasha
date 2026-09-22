import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  notices,
  render,
} from "akasha/agent/message/notice/modules/compose-notices/compose-notices.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { ROOT_NAMED } from "akasha/command/modules/rooting/rooting.module.code.ts"

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

test("the notice the editor revives a seat with is composed out of the real checkout", () => {
  const held = notices()["editor-revive"] ?? ""

  expect(held.length).toBeGreaterThan(0)
})

test("a checkout the index files no notice for is answered nothing rather than refused", () => {
  const folder = scratch()
  try {
    expect(underRoot(folder, notices)).toEqual({})
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
})
