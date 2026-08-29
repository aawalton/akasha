import { expect, test } from "bun:test"
import { rootOf } from "./rooting.module.code.ts"

test("the folder holding akasha is the root, however deep the path runs", () => {
  expect(rootOf("/one/akasha/command-system/cli.module.code.ts")).toBe("/one")
  expect(rootOf("/one/akasha/command-system/cli/cli.module.code.ts")).toBe("/one")
  expect(rootOf("/one/akasha")).toBe("/one")
})

test("the last akasha marks the folder, the repository being named akasha too", () => {
  expect(rootOf("/one/akasha/akasha/command-system/cli.module.code.ts")).toBe("/one/akasha")
})

test("a path standing outside any akasha folder answers nothing", () => {
  expect(rootOf("/one/two/three.ts")).toBeNull()
  expect(rootOf("/")).toBeNull()
})
