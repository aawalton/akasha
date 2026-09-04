import { expect, test } from "bun:test"
import {
  membersExported,
  membersReached,
  unnamedIn,
  unnamedSaidAs,
} from "./panel-reading.module.code.ts"

test("a member the bundle reaches is found under any namespace name", () => {
  const bundle = "vscode.window.createTreeView(); vscode2.commands.registerCommand()"
  expect(membersReached(bundle)).toEqual(["commands", "window"])
})

test("a member named inside a quote is no reach", () => {
  expect(membersReached(`run("vscode.open")`)).toEqual([])
  expect(membersReached(`run('vscode.open')`)).toEqual([])
  expect(membersReached("run(`vscode.open`)")).toEqual([])
})

test("the same member reached twice is one member", () => {
  expect(membersReached("vscode.window; vscode.window")).toEqual(["window"])
})

test("a bundle reaching nothing reaches nothing", () => {
  expect(membersReached("const held = 1")).toEqual([])
})

test("a stub exports what it declares and what it names in a list", () => {
  const stub = [
    "export const window = {}",
    "export class TreeItem {}",
    "export function make() {}",
    "export { one, two as three }",
  ].join("\n")
  expect([...membersExported(stub)].sort()).toEqual([
    "TreeItem",
    "make",
    "one",
    "two as three",
    "window",
  ])
})

test("an export list holding nothing names nothing", () => {
  expect([...membersExported("export {}")].sort()).toEqual([])
})

test("a member the stub does not export is unnamed", () => {
  const bundle = "vscode.window; vscode.workspace"
  expect(unnamedIn(bundle, "export const window = {}")).toEqual(["workspace"])
})

test("a bundle reaching only what the stub exports leaves nothing unnamed", () => {
  expect(unnamedIn("vscode.window", "export const window = {}")).toEqual([])
})

test("an unnamed member is said with every name spelled out and what to do", () => {
  const said = unnamedSaidAs(["workspace", "env"], "a/stub.mjs")
  expect(said).toContain("vscode.workspace, vscode.env")
  expect(said).toContain("a/stub.mjs does not export")
  expect(said).toContain("Add them to the stub.")
})
