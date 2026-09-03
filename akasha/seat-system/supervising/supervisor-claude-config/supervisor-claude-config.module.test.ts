import { expect, test } from "bun:test"
import {
  asRecord,
  CLAUDE_CONFIG_PATH,
  expandHome,
  readClaudeConfigDeclaration,
  reconcileClaudeConfig,
} from "./supervisor-claude-config.module.code.ts"

test("only a plain object reads as a record", () => {
  expect(asRecord({ a: 1 })).toEqual({ a: 1 })
  expect(asRecord([1])).toBeNull()
  expect(asRecord(null)).toBeNull()
  expect(asRecord("a")).toBeNull()
})

test("a leading home token is expanded and one elsewhere is not", () => {
  expect(expandHome("$HOME/.claude", "/home/walton")).toBe("/home/walton/.claude")
  expect(expandHome("/etc/$HOME", "/home/walton")).toBe("/etc/$HOME")
})

test("a declared key that is not projects replaces the existing one", () => {
  expect(reconcileClaudeConfig({ a: 1, b: 2 }, { b: 3 }, "/home/walton")).toEqual({ a: 1, b: 3 })
})

test("a declared project entry is merged into the existing one", () => {
  const held = reconcileClaudeConfig(
    { projects: { "/home/walton/repo": { kept: true, shared: "old" } } },
    { projects: { "$HOME/repo": { shared: "new" } } },
    "/home/walton"
  )
  expect(held.projects).toEqual({ "/home/walton/repo": { kept: true, shared: "new" } })
})

test("a project the declaration does not name is left standing", () => {
  const held = reconcileClaudeConfig(
    { projects: { "/other": { kept: true } } },
    { projects: { "$HOME/repo": { fresh: true } } },
    "/home/walton"
  )
  expect(held.projects).toEqual({ "/other": { kept: true }, "/home/walton/repo": { fresh: true } })
})

test("projects declared as something other than an object are ignored", () => {
  expect(reconcileClaudeConfig({ projects: { a: {} } }, { projects: 7 }, "/h").projects).toEqual({
    a: {},
  })
})

test("nothing readable at the path is no declaration", () => {
  expect(readClaudeConfigDeclaration("/nowhere/at/all.json")).toBeNull()
})

test("the declared settings the supervisor reconciles from are inside akasha", () => {
  expect(CLAUDE_CONFIG_PATH).toContain("/akasha/seat-system/agent-settings/")
  expect(readClaudeConfigDeclaration()).not.toBeNull()
})
