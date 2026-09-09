import { symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { put } from "@akasha/testing-system/putting"
import { ADMITS_AT, REPO_AT, repoWith } from "../asking/asking.module.test-fixtures.ts"

const MODULES = "node_modules"

const CONFIG = "biome.json"

const BIOME = JSON.stringify({
  formatter: { indentStyle: "space", indentWidth: 2, lineWidth: 100 },
  assist: { actions: { source: { organizeImports: "on" } } },
  javascript: { formatter: { quoteStyle: "double", semicolons: "asNeeded" } },
})

export const LOOSE =
  'import {b} from "./b.ts"\nimport {a} from "./a.ts"\nconst   x   =   1\nexport {a,b,x}\n'

export const TIDY =
  'import { a } from "./a.ts"\nimport { b } from "./b.ts"\n\nconst x = 1\n\nexport { a, b, x }\n'

export const BROKEN = 'import {a} from "./a.ts"\nexport const held = (\n'

export const REFORMATTED =
  "formatted akasha/two.ts as it landed — what is there is not what was handed in"

export const REFUSES_LOOSE =
  "export function refusesLoose(change) {\n" +
  "  return change.changed\n" +
  '    .filter((path) => new TextDecoder().decode(change.after(path)).includes("   "))\n' +
  '    .map((path) => ({ path, reason: "a check was handed a body nobody formatted" }))\n' +
  "}\n"

export function repoWithTheFormatter(named?: Readonly<Record<string, string>>): string {
  const root = named === undefined ? repoWith() : repoWith(named)
  symlinkSync(join(REPO_AT, MODULES), join(root, MODULES))
  writeFileSync(join(root, CONFIG), BIOME)
  put(root, ".git/info/exclude", `${ADMITS_AT}\n${MODULES}\n${CONFIG}\n`)
  return root
}
