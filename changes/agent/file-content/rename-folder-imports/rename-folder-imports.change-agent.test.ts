import { expect, test } from "bun:test"
import {
  renameFolderImports,
  runChange,
} from "akasha/changes/agent/file-content/rename-folder-imports/rename-folder-imports.change-agent.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  bodyOf,
  worldOf,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const AT = "temper/held"

const ONE = "temper/held/one/one.module.code.ts"

const TWO = "temper/held/two/two.module.code.ts"

const TWO_BODY = "export const two = 2\n"

function worldHolding(held: Readonly<Record<string, string>>): World {
  return { ...worldOf(held), under: () => Object.keys(held) }
}

function leftOf(held: Readonly<Record<string, string>>): string {
  const said = renameFolderImports(worldHolding(held), { at: AT })
  return bodyOf(said, (path) => held[path] ?? null)
}

test("a relative path is spelled as the root package name joined to the path from the root", () => {
  const left = leftOf({
    [ONE]: `import { two } from "../two/two.module.code.ts"\n`,
    [TWO]: TWO_BODY,
  })

  expect(left).toContain(`"akasha/temper/held/two/two.module.code.ts"`)
  expect(left).not.toContain("../two")
})

test("a specifier naming a package is left as it is", () => {
  const left = leftOf({
    [ONE]: `import { join } from "node:path"\nimport { two } from "./../two/two.module.code.ts"\n`,
    [TWO]: TWO_BODY,
  })

  expect(left).toContain(`"node:path"`)
})

test("a relative path landing on no body the world holds is left as it is", () => {
  const said = renameFolderImports(
    worldHolding({ [ONE]: `import { gone } from "../gone/gone.module.code.ts"\n` }),
    { at: AT }
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names a file by a relative path/)
})

test("a folder holding no TypeScript is refused", () => {
  const said = renameFolderImports(worldHolding({ "temper/held/one/one.json": "{}\n" }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no TypeScript/)
})

test("a string naming no module is left as it is", () => {
  const left = leftOf({
    [ONE]: `const said = "../two/two.module.code.ts"\nimport { two } from "../two/two.module.code.ts"\nexport const held = [said, two]\n`,
    [TWO]: TWO_BODY,
  })

  expect(left).toContain(`const said = "../two/two.module.code.ts"`)
  expect(left).toContain(`from "akasha/temper/held/two/two.module.code.ts"`)
})

test("an argument this change was handed no value for is refused by the key", () => {
  const said = runChange(worldHolding({ [ONE]: TWO_BODY }), {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at` names what this change is handed/)
})
