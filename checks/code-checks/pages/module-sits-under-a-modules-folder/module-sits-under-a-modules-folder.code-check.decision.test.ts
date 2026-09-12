import { expect, test } from "bun:test"
import {
  moduleNamed,
  reasonsAt,
  underModules,
} from "akasha/checks/code-checks/pages/module-sits-under-a-modules-folder/module-sits-under-a-modules-folder.code-check.decision.code.ts"

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
