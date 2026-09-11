import { expect, test } from "bun:test"
import {
  emitPackageJsonCopies,
  emitWorkspaceInstall,
} from "akasha/infrastructure/container-image/dockerfiles/dockerfile-builder/dockerfile-builder.module.code.ts"

const APP = "alan/web"
const MEMBERS = ["alan/web", "temper/web"]

test("the image installs against the root manifest the checkout carries", () => {
  expect(emitPackageJsonCopies(MEMBERS, APP, {})).toContain("COPY package.json ./")
})

test("every workspace member's manifest is copied before the install runs", () => {
  const lines = emitPackageJsonCopies(MEMBERS, APP, {})
  expect(lines).toContain("COPY temper/web/package.json ./temper/web/package.json")
  expect(lines).toContain("COPY alan/web/package.json ./alan/web/package.json")
})

test("a manifest is copied once", () => {
  const lines = emitPackageJsonCopies(MEMBERS, APP, {})
  const own = lines.filter((one) => one === `COPY ${APP}/package.json ./${APP}/package.json`)
  expect(own.length).toBe(1)
})

test("the install writes no manifest of its own over the one copied in", () => {
  expect(emitWorkspaceInstall({}).join("\n")).not.toContain("workspaces")
})
