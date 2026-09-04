import { expect, test } from "bun:test"
import { rootOf } from "./rooting.module.code.ts"

test("the akasha folder is itself the root, however deep the path runs", () => {
  expect(rootOf("/one/akasha/command-system/cli.module.code.ts")).toBe("/one/akasha")
  expect(rootOf("/one/akasha/command-system/cli/cli.module.code.ts")).toBe("/one/akasha")
  expect(rootOf("/one/akasha")).toBe("/one/akasha")
})

test("the last akasha marks the folder, a checkout being able to stand inside another", () => {
  expect(rootOf("/one/akasha/akasha/command-system/cli.module.code.ts")).toBe("/one/akasha/akasha")
})

test("a path standing outside any akasha folder is refused rather than answered", () => {
  expect(() => rootOf("/one/two/three.ts")).toThrow("stands under no akasha folder")
  expect(() => rootOf("/")).toThrow("stands under no akasha folder")
})
