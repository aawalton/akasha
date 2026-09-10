import type { Change } from "akasha/pages/change/change.module.code.ts"
import {
  listedFiled,
  nothingFiled,
  schemaFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./extension-host-reaches-no-bun-code.code-check.decision.code.ts"

export const ROOT = "/nowhere"

export const MANIFEST = "editor-extension/ops-extension/package.json"

const PACKAGE = "workspace-package"

const EXTENSION = "ops-extension"

const PACKAGE_AT = "editor-extension/ops-extension/ops-extension.workspace-package.ts"

const PACKAGE_ID = "01a08b0d-0001-7000-8000-000000000001"

const FILE_PROPERTY = "file-property"

const MANIFEST_PROPERTY = "manifest"

const PACKAGE_JSON = "package.json"

export const scratch = scratchWorld()

function packageFiled(root: string): string {
  nothingFiled(root)
  listedFiled(root, PACKAGE, EXTENSION, [{ path: PACKAGE_AT, id: PACKAGE_ID }])
  schemaFiled(root, FILE_PROPERTY, MANIFEST_PROPERTY, [
    {
      pageTypeSlug: FILE_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: MANIFEST_PROPERTY,
      propertySlug: MANIFEST_PROPERTY,
      fileName: PACKAGE_JSON,
    },
  ])
  return root
}

export function rooted(): string {
  return packageFiled(scratch.rootFor("akasha-host-bun-"))
}

export function tracked(bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-host-bun-audit-")
  for (const [path, body] of Object.entries(bodies)) writing(root, path, body)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return packageFiled(root)
}

export const ENTRY = "editor-extension/ops-extension/extension-entry/extension-entry.module.code.ts"

export const NEXT = "editor-extension/ops-extension/extension-entry/next.module.code.ts"

export const FAR = "utils/far/far.module.code.ts"

export const PACKAGED = "seat-system/package.json"

export const NOTICED = "seat-system/compose-notices/compose-notices.module.code.ts"

export const MANIFEST_BODY = `${JSON.stringify({
  name: "ops",
  main: "./extension-entry/extension-entry.module.code.ts",
})}\n`

export const PACKAGED_BODY = `${JSON.stringify({
  name: "@akasha/seat-system",
  exports: { "./compose-notices": "./compose-notices/compose-notices.module.code.ts" },
})}\n`

const encoder = new TextEncoder()

export function bodied(root: string, bodies: Readonly<Record<string, string>>): Change {
  const at = (path: string): Uint8Array | null => {
    const said = bodies[path]
    return said === undefined ? null : encoder.encode(said)
  }
  return { root, changed: Object.keys(bodies).toSorted(), after: at, before: at }
}

export function change(bodies: Readonly<Record<string, string>>): Change {
  return bodied(ROOT, bodies)
}

export function withManifest(
  bodies: Readonly<Record<string, string>>
): Readonly<Record<string, string>> {
  return { [MANIFEST]: MANIFEST_BODY, ...bodies }
}

export function hosted(bodies: Readonly<Record<string, string>>): Change {
  return change(withManifest(bodies))
}

export function refused(bodies: Readonly<Record<string, string>>): readonly Judged[] {
  const held = hosted(bodies)
  return refusalsOver(held, held.changed, MANIFEST)
}

export function pathsRefused(bodies: Readonly<Record<string, string>>): readonly string[] {
  return refused(bodies).map((one) => one.path)
}
