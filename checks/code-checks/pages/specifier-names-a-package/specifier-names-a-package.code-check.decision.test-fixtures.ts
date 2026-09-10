import { listedFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { declaring, founded, typed } from "../../../modules/scratch/check-scratch.module.code.ts"

const PACKAGE = "workspace-package"

const HOME = "alan/held"

const PAGE_AT = `${HOME}/held.${PACKAGE}.ts`

const MANIFEST_AT = `${HOME}/package.json`

const HELD_ID = "01a0882d-745e-7001-8000-000000000001"

const MANIFEST = JSON.stringify({
  name: "@akasha/held",
  exports: { ".": "./one/one.module.code.ts" },
})

export const AT = "alan/other/other.module.code.ts"

export const GONE = 'import { one } from "@akasha/gone"\n'

export const STATED = 'import { one } from "@akasha/held"\n'

export const scratch = scratchWorld()

export function rooted(files: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-specifier-names-")
  founded(root)
  typed(root, PACKAGE, "page")
  declaring(root, "manifest", { pageTypeSlug: "file-property", fileName: "package.json" })
  listedFiled(root, PACKAGE, "held", [{ path: PAGE_AT, id: HELD_ID }])
  valueAlsoFiled(root, PACKAGE, [
    { path: PAGE_AT, value: { id: HELD_ID, pageTypeSlug: PACKAGE, slug: "held" } },
  ])
  writing(root, MANIFEST_AT, MANIFEST)
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
