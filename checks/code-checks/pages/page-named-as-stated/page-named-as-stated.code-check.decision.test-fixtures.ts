import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { noPathsFiled } from "@akasha/indexes/testing"
import { exportedAs } from "@akasha/pages/page-export-name"
import { ran } from "@akasha/utils/run/running"
import { bodiesIn, bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { declaring } from "../../../modules/scratch/check-scratch.module.code.ts"

export const ROOT = "/repo"

export const HELD: ReadonlySet<string> = new Set(["code", "test"])

export const PROPERTY = "akasha/note.file-property.ts"

export const BESIDE = "akasha/ledger.module.note.ts"

export const LEDGER_AT = "akasha/ledger.module.ts"

export const bodied = bodiesIn(ROOT)

export const scratch = scratchWorld()

export function page(slug: string, pageTypeSlug: string, named: string = exportedAs(slug)): string {
  return [
    `export const ${named} = {`,
    '  id: "01a04b5e-39e5-7fa4-be61-f3fa8d7d1736",',
    `  pageTypeSlug: "${pageTypeSlug}",`,
    `  slug: "${slug}",`,
    '  definition: "what is held",',
    "} as const satisfies Page",
    "",
  ].join("\n")
}

export function rooted(fileProperties: readonly string[]): string {
  const root = scratch.rootFor("akasha-page-named-")
  noPathsFiled(root)
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "page" })
  declaring(root, "slug", { pageTypeSlug: "text-property", unique: "page-type" })
  for (const one of fileProperties) {
    declaring(root, one, { pageTypeSlug: "file-property", unique: null })
  }
  return root
}

export function property(slug: string): Uint8Array {
  return bytesOf(
    [
      `export const ${slug} = {`,
      '  id: "01a04b5e-39e5-7fa4-be61-f3fa8d7d1737",',
      '  pageTypeSlug: "file-property",',
      `  slug: "${slug}",`,
      `  propertySlug: "${slug}",`,
      "} as const satisfies Page",
      "",
    ].join("\n")
  )
}

export function tracked(
  fileProperties: readonly string[],
  files: Readonly<Record<string, string>>
): string {
  const root = rooted(fileProperties)
  for (const [path, said] of Object.entries(files)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, said)
  }
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
