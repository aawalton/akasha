import { listedFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { declaring, founded, typed } from "../../../modules/scratch/check-scratch.module.code.ts"

const PACKAGE = "workspace-package"

const FORMAT = "name-format"

const KEBAB = "lower-kebab-case"

export const HOME = "alan/held"

export const PAGE_AT = `${HOME}/held.${PACKAGE}.ts`

export const MANIFEST_AT = `${HOME}/package.json`

export const NAMED_AT = `${HOME}/one/one.module.code.ts`

export const HIDDEN_AT = `${HOME}/two/two.module.code.ts`

export const OUTSIDE_AT = "alan/other/other.module.code.ts"

export const HIDDEN_REACH = 'import { two } from "../held/two/two.module.code.ts"\n'

export const NAMED_REACH = 'import { one } from "../held/one/one.module.code.ts"\n'

export const scratch = scratchWorld()

const HELD_ID = "01a058be-804e-72e0-934d-000000000001"

const FORMAT_ID = "01a058be-804e-72e0-934d-000000000002"

const FORMAT_AT = `akasha/f/${KEBAB}.${FORMAT}.ts`

const FORMAT_CODE_AT = `akasha/f/${KEBAB}.${FORMAT}.code.ts`

const MATCHING = `export function lowerKebabCase(one: string) {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(one)
}
`

const MANIFEST = JSON.stringify({
  name: "@akasha/held",
  exports: { ".": "./one/one.module.code.ts" },
})

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-package-reached-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, PACKAGE, "page")
  declaring(root, "manifest", { pageTypeSlug: "file-property", fileName: "package.json" })
  listedFiled(root, PACKAGE, "held", [{ path: PAGE_AT, id: HELD_ID }])
  valueAlsoFiled(root, PACKAGE, [
    { path: PAGE_AT, value: { id: HELD_ID, pageTypeSlug: PACKAGE, slug: "held" } },
  ])
  listedFiled(root, FORMAT, KEBAB, [{ path: FORMAT_AT, id: FORMAT_ID }])
  writing(root, FORMAT_CODE_AT, MATCHING)
  writing(root, MANIFEST_AT, MANIFEST)
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-package-reached-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
