import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

export const REFUSES_CODE = `export function refuses(leaving) {
  return leaving.changed.map((path) => ({ path, reason: "refused for the test" }))
}
`

export const ADMITS_CODE = `export function admits() {
  return []
}
`

export function pageFor(slug: string, id: string, definition: string): string {
  return `export const ${slug} = {
  id: "${id}",
  pageTypeSlug: "check",
  slug: "${slug}",
  definition: "${definition}",
  code: "ts",
  needs: "path",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
}
`
}

export function minting(
  root: string,
  slug: string,
  id: string,
  definition: string,
  code: string
): void {
  const at = `akasha/${slug}.check.ts`
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, at), pageFor(slug, id, definition))
  writeFileSync(join(root, `akasha/${slug}.check.code.ts`), code)
  const dir = join(root, ".git/data/index/identity/check/slug")
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${slug}.jsonl`), `${JSON.stringify({ path: at, id })}\n`)
}

const REFUSES_ID = "01a04bed-1450-7000-8000-00000000bbbb"

const ADMITS_ID = "01a04bed-1450-7000-8000-00000000cccc"

export function refusing(root: string): void {
  minting(root, "refuses", REFUSES_ID, "a check refusing everything", REFUSES_CODE)
}

export function admitting(root: string): void {
  minting(root, "admits", ADMITS_ID, "a check admitting everything", ADMITS_CODE)
}
