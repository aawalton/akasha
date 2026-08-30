import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { rootOf } from "../../command-system/rooting/rooting.module.code.ts"
import { dataAt } from "../../file-system/data-place/data-place.module.code.ts"
import { standingFiled } from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"

const HERE = rootOf(import.meta.path)

const WARRANTS_IN = "akasha/context-system/context-warrant"

const CONTEXT_WARRANT = "context-warrant"

export const SEEDED_AT = dataAt("warrant")

const MINTED = "a warrant seeded for a test"

export const WARRANTS: readonly string[] = ["file-itself", "file-page-type"]

function realAt(slug: string): string {
  return join(HERE, WARRANTS_IN, slug, `${slug}.context-warrant.code.ts`)
}

function pageFor(slug: string, id: string): string {
  return [
    `export const ${exportedAs(slug)} = {`,
    `  id: "${id}",`,
    `  pageTypeSlug: "context-warrant",`,
    `  slug: "${slug}",`,
    `  definition: "${MINTED}",`,
    `  code: "ts",`,
    `  test: "ts",`,
    `  runsOnRead: true,`,
    `  runsOnWrite: true,`,
    `  transitive: false,`,
    `}`,
    "",
  ].join("\n")
}

function codeFor(slug: string): string {
  const named = exportedAs(slug)
  return `export { ${named} } from ${JSON.stringify(realAt(slug))}\n`
}

export function warrantsStanding(root: string, slugs: readonly string[] = WARRANTS): undefined {
  mkdirSync(join(root, SEEDED_AT), { recursive: true })
  let minted = 0
  for (const slug of slugs) {
    minted = minted + 1
    const id = `01a04f58-0000-7000-8000-${String(minted).padStart(12, "0")}`
    const path = join(SEEDED_AT, `${slug}.context-warrant.ts`)
    writeFileSync(join(root, path), pageFor(slug, id))
    writeFileSync(join(root, `${path.slice(0, -".ts".length)}.code.ts`), codeFor(slug))
    standingFiled(root, CONTEXT_WARRANT, slug, [{ path, id }])
  }
}
