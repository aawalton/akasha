import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Phase } from "../../checks-system/checking/checking.module.code.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"

export const REFUSES_CODE = `export function refuses(leaving) {
  return leaving.changed.map((path) => ({ path, reason: "refused for the test" }))
}
`

export const ADMITS_CODE = `export function admits() {
  return []
}
`

export function pageFor(
  slug: string,
  id: string,
  definition: string,
  phase: Phase = "patch"
): string {
  return `export const ${exportedAs(slug)} = {
  id: "${id}",
  pageTypeSlug: "check",
  slug: "${slug}",
  definition: "${definition}",
  code: "ts",
  needs: "path",
  runsOnPatch: ${phase === "patch"},
  runsOnWorktree: ${phase === "worktree"},
  runsOnDeploy: ${phase === "deploy"},
  runsOnAudit: ${phase === "audit"},
}
`
}

export function minting(
  root: string,
  slug: string,
  id: string,
  definition: string,
  code: string,
  phase: Phase = "patch"
): undefined {
  const at = `akasha/${slug}.check.ts`
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, at), pageFor(slug, id, definition, phase))
  writeFileSync(join(root, `akasha/${slug}.check.code.ts`), code)
  const dir = join(root, ".git/data/index/identity/check/slug")
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${slug}.jsonl`), `${JSON.stringify({ path: at, id })}\n`)
}

export const MINTED = "a check minted for a test"

const REFUSES_ID = "01a04bed-1450-7000-8000-00000000bbbb"

const ADMITS_ID = "01a04bed-1450-7000-8000-00000000cccc"

export function refusing(root: string): undefined {
  minting(root, "refuses", REFUSES_ID, "a check refusing everything", REFUSES_CODE)
}

export function admitting(root: string): undefined {
  minting(root, "admits", ADMITS_ID, "a check admitting everything", ADMITS_CODE)
}
