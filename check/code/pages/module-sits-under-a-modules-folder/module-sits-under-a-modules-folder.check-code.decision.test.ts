import { expect, test } from "bun:test"
import {
  moduleNamed,
  namesParts,
  reasonsAt,
  underModules,
} from "akasha/check/code/pages/module-sits-under-a-modules-folder/module-sits-under-a-modules-folder.check-code.decision.code.ts"

test("a module page sitting straight under its parent is refused, and the reason names its folder", () => {
  const said = reasonsAt("akasha/one/answering/answering.module.ts")

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`akasha/one/answering`")
})

test("a module page under a `modules` folder is let through", () => {
  expect(reasonsAt("akasha/one/modules/answering/answering.module.ts")).toEqual([])
})

test("a module page under a `.server` folder is let through", () => {
  expect(reasonsAt("akasha/one/.server/answering/answering.module.ts")).toEqual([])
})

test("a module page under a folder beneath `modules` is let through", () => {
  expect(reasonsAt("akasha/one/modules/answering/deep/answering.module.ts")).toEqual([])
})

test("a file beside a module page is no module page", () => {
  expect(moduleNamed("akasha/one/answering/answering.module.code.ts")).toBe(false)
  expect(reasonsAt("akasha/one/answering/answering.module.code.ts")).toEqual([])
})

test("a page of another type is let through", () => {
  expect(moduleNamed("akasha/one/answering/answering.domain.ts")).toBe(false)
  expect(reasonsAt("akasha/one/answering/answering.domain.ts")).toEqual([])
})

test("a folder named `module` is no `modules` folder", () => {
  expect(underModules("akasha/one/module/answering/answering.module.ts")).toBe(false)
})

const PARTED = `export const answering = {
  type: "module",
  slug: "answering",
  parts: ["module/asking"],
  code: "ts",
} as const`

const BARE = `export const answering = {
  type: "module",
  slug: "answering",
  code: "ts",
} as const`

test("a module naming the parts it is made of heads its own folder", () => {
  expect(namesParts(PARTED)).toBe(true)
  expect(reasonsAt("akasha/one/answering/answering.module.ts", true)).toEqual([])
})

test("a module naming no parts is refused where it sits under no `modules` folder", () => {
  expect(namesParts(BARE)).toBe(false)
  expect(reasonsAt("akasha/one/answering/answering.module.ts", false)).toHaveLength(1)
})

test("a body that reads as no page names no parts", () => {
  expect(namesParts("what is this")).toBe(false)
})
