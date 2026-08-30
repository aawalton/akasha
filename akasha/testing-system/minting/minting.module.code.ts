import { createHash } from "node:crypto"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Phase } from "../../checks-system/checking/checking.module.code.ts"
import { standingFiled } from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"

export const REFUSES_CODE = `export function refuses(change) {
  return change.changed.map((path) => ({ path, reason: "refused for the test" }))
}
`

export const ADMITS_CODE = `export function admits() {
  return []
}
`

const CHECK = "check"

const MINTED_FROM = "sha256"

const VERSION_7 = "7"

const VARIANT_8 = "8"

export function mintedId(slug: string): string {
  const said = createHash(MINTED_FROM).update(slug).digest("hex")
  const time = `${said.slice(0, 8)}-${said.slice(8, 12)}`
  const version = `${VERSION_7}${said.slice(13, 16)}`
  const variant = `${VARIANT_8}${said.slice(17, 20)}`
  return `${time}-${version}-${variant}-${said.slice(20, 32)}`
}

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
  standingFiled(root, CHECK, slug, [{ path: at, id }])
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
