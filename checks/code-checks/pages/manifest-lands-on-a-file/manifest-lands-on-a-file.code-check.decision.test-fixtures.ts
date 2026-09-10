import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { valueAlsoFiled } from "@akasha/indexes/testing"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { declaring, founded, typed } from "../../../modules/scratch/check-scratch.module.code.ts"

export const PACKAGE = "workspace-package"

export const FOLDER = "akasha/held"

export const MANIFEST_AT = `${FOLDER}/package.json`

export const PAGE_AT = `${FOLDER}/held.workspace-package.ts`

export const AT = `${FOLDER}/one/one.module.code.ts`

export const OTHER = `${FOLDER}/two/two.module.code.ts`

export const EXPORTS = { "./one": "./one/one.module.code.ts" }

export const HELD = "export const held = 1\n"

const ID = "01a05d75-0000-7000-8000-00000000000a"

const MANIFEST_KEY = "manifest"

const FILE_PROPERTY = "file-property"

export const scratch = scratchWorld()

export function manifest(value: Readonly<Record<string, unknown>>): string {
  return JSON.stringify({ name: "@akasha/held", ...value })
}

export function rooted(prefix: string = "akasha-manifest-"): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, PACKAGE, "page")
  declaring(root, MANIFEST_KEY, { pageTypeSlug: FILE_PROPERTY, fileName: "package.json" })
  valueAlsoFiled(root, PACKAGE, [
    { path: PAGE_AT, value: { id: ID, pageTypeSlug: PACKAGE, slug: "held" } },
  ])
  return root
}

export function wrote(root: string, files: Readonly<Record<string, string>>): string {
  for (const [path, body] of Object.entries(files)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}
