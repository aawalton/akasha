import { expect, test } from "bun:test"
import { join } from "node:path"
import {
  appNamesIn,
  namingApps,
} from "akasha/infrastructure/services/web-apps/dev-server-stating/dev-server-stating.module.code.ts"

const root = join(import.meta.dir, "..", "..", "..", "..")

const APP = "--app"

test("every web app page is an app a command naming one server takes", () => {
  const named = appNamesIn(root)
  for (const one of [
    "alanwalton-atlas-web",
    "alanwalton-web",
    "archive-of-worlds-web",
    "audhdalan-web",
    "smilingjenny-web",
    "temper-web",
  ]) {
    expect(named).toContain(one)
  }
})

test("a refusal naming the app flag is answered with the apps there are", () => {
  const said = namingApps([`\`akasha\` takes \`${APP}\`, and nothing said it`], root, APP)

  expect(said.join(" ")).toContain("smilingjenny-web")
})

test("a refusal naming no app flag is answered as it was", () => {
  const refusals = ["`--seq` takes a value, and none follows it"]

  expect(namingApps(refusals, root, APP)).toEqual(refusals)
})
