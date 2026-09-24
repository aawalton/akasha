import { expect, test } from "bun:test"
import {
  emitPackageJsonCopies,
  emitWorkspaceInstall,
} from "akasha/infrastructure/container-image/dockerfile/modules/builder/dockerfile-builder.module.code.ts"

test("the image installs against the root manifest the checkout carries", () => {
  expect(emitPackageJsonCopies({}, false)).toContain("COPY package.json ./")
})

test("a manifest is copied once", () => {
  const lines = emitPackageJsonCopies({}, true)
  expect(lines.filter((one) => one === "COPY package.json ./")).toHaveLength(1)
})

test("the install writes no manifest of its own over the one copied in", () => {
  expect(emitWorkspaceInstall({}).join("\n")).not.toContain("workspaces")
})
