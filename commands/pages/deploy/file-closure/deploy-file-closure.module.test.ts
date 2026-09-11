import { expect, test } from "bun:test"
import {
  besideThe,
  closureOver,
  codeBodies,
  underFolder,
} from "akasha/commands/pages/deploy/file-closure/deploy-file-closure.module.code.ts"

const PAGE = "apps/one/one.web-app.ts"

const TRACKED = [
  PAGE,
  "apps/one/main.ts",
  "apps/one/logo.png",
  "apps/two/two.web-app.ts",
  "shared/helper.ts",
  "shared/apart.ts",
  "shared/gone.ts",
]

const BODIES: Readonly<Record<string, string>> = {
  "apps/one/main.ts": 'import { help } from "akasha/shared/helper.ts"\nexport const one = help\n',
  "shared/helper.ts": 'import { far } from "akasha/shared/gone.ts"\nexport const help = far\n',
  "shared/gone.ts": "export const far = 1\n",
  "shared/apart.ts": "export const apart = 2\n",
  "apps/two/two.web-app.ts": "export const two = 3\n",
}

function bodyAt(path: string): string | null {
  return BODIES[path] ?? null
}

const SEEDS = besideThe(TRACKED, PAGE)

test("the files beside the page seed what a deploy is built from", () => {
  expect(SEEDS).toEqual([PAGE, "apps/one/main.ts", "apps/one/logo.png"])
})

test("a folder handed in answers the tracked files under that folder", () => {
  expect(underFolder(TRACKED, "shared")).toEqual([
    "shared/helper.ts",
    "shared/apart.ts",
    "shared/gone.ts",
  ])
})

test("a file beside the page that is no code is one the deploy is built from", () => {
  expect(closureOver(TRACKED, SEEDS, bodyAt).has("apps/one/logo.png")).toBe(true)
})

test("a file the code beside the page imports is one the deploy is built from", () => {
  expect(closureOver(TRACKED, SEEDS, bodyAt).has("shared/helper.ts")).toBe(true)
})

test("a file reached through another file reached is reached too", () => {
  expect(closureOver(TRACKED, SEEDS, bodyAt).has("shared/gone.ts")).toBe(true)
})

test("a file nothing beside the page reaches is no file the deploy is built from", () => {
  const found = closureOver(TRACKED, SEEDS, bodyAt)
  expect(found.has("shared/apart.ts")).toBe(false)
  expect(found.has("apps/two/two.web-app.ts")).toBe(false)
})

test("a path git does not track is reached by nothing", () => {
  const found = closureOver([PAGE, "apps/one/main.ts"], SEEDS, bodyAt)
  expect(found.has("shared/helper.ts")).toBe(false)
})

test("a body that is no TypeScript is read for no import", () => {
  const reading = codeBodies(() => "anything")
  expect(reading("apps/one/logo.png")).toBe(null)
  expect(reading("apps/one/main.ts")).toBe("anything")
})
