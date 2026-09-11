import {
  type Indexing,
  refusalsOver,
} from "akasha/checks/code-checks/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { bodiesOver } from "akasha/checks/modules/staging/check-staging.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import {
  nothingFiled,
  pageFiled,
  relationFiled,
  schemaFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

export const ROOT = "/nowhere"

export const MANIFEST = "editor-extension/ops-extension/package.json"

export const LINKED_PAGE = "editor-extension/ops-extension/ops-extension.workspace-package.ts"

export const LINKED_TO = "~/.local/share/code-editor/extensions/ops"

const PACKAGE = "workspace-package"

const EXTENSION = "ops-extension"

const PACKAGE_ID = "01a08b0d-0001-7000-8000-000000000001"

const PACKAGE_TYPE_AT = "code-system/workspace-packages/workspace-package.page-type.ts"

const PACKAGE_TYPE_ID = "01a08b0d-0002-7000-8000-000000000002"

const DOMAIN_TYPE_AT = "domains/domain.page-type.ts"

const DOMAIN_TYPE_ID = "01a08b0d-0003-7000-8000-000000000003"

const PROPERTY_AT = "code-system/workspace-packages/properties/linked-at.text-property.ts"

const PROPERTY_ID = "01a08b0d-0004-7000-8000-000000000004"

const TEXT_PROPERTY = "text-property"

const LINKED = "linked-at"

const PAGE_PROPERTY = "page-property"

const EXTENDS_TYPE = "extends-type"

const FILE_PROPERTY = "file-property"

const MANIFEST_PROPERTY = "manifest"

const PACKAGE_JSON = "package.json"

export const scratch = scratchWorld()

function linkedFiled(root: string): undefined {
  schemaFiled(root, TEXT_PROPERTY, LINKED, [
    {
      pageTypeSlug: TEXT_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: LINKED,
      propertySlug: LINKED,
      fileName: null,
    },
  ])
  listedFiled(root, TEXT_PROPERTY, LINKED, [{ path: PROPERTY_AT, id: PROPERTY_ID }])
  relationFiled(root, PROPERTY_ID, PAGE_PROPERTY, DOMAIN_TYPE_ID, [{ path: DOMAIN_TYPE_AT }])
  pageFiled(root, DOMAIN_TYPE_ID, DOMAIN_TYPE_AT)
  relationFiled(root, DOMAIN_TYPE_ID, EXTENDS_TYPE, PACKAGE_TYPE_ID, [{ path: PACKAGE_TYPE_AT }])
  pageFiled(root, PACKAGE_TYPE_ID, PACKAGE_TYPE_AT)
  valueAlsoFiled(root, PACKAGE, [
    {
      path: LINKED_PAGE,
      value: { id: PACKAGE_ID, pageTypeSlug: PACKAGE, slug: EXTENSION, linkedAt: LINKED_TO },
    },
  ])
}

function packageFiled(root: string): string {
  nothingFiled(root)
  listedFiled(root, PACKAGE, EXTENSION, [{ path: LINKED_PAGE, id: PACKAGE_ID }])
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
  linkedFiled(root)
  return root
}

export function stating(
  said: Readonly<Record<string, string | null>>,
  named: string | null = PACKAGE_JSON
): Indexing {
  const carrying = Object.keys(said).map((path) => ({
    pageTypeSlug: PACKAGE,
    path,
    id: path,
    within: null,
  }))
  const valued = new Map<string, Value>(
    Object.entries(said).map(([path, held]) => [path, held === null ? {} : { linkedAt: held }])
  )
  return {
    carryingOf: () => ({ carrying }),
    valuesByPath: () => valued,
    fileKeysAt: () => new Map([[MANIFEST_PROPERTY, named]]),
  }
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

export function change(bodies: Readonly<Record<string, string>>): Change {
  return bodiesOver(ROOT, bodies)
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
