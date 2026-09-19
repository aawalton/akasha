import { sidecarsIn } from "akasha/page/index/modules/beside-declaring/beside-declaring.module.code.ts"
import { GROUPING } from "akasha/page/index/modules/beside-declaring/beside-declaring.module.test-fixtures.ts"
import type {
  ExtensionsBy,
  FilePropertiesBy,
  FoldersBy,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  claimantOf,
  claimsOf,
  type IsThere,
  type Paging,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"

const GROUP_PAGE = "/repo/deep/a.check-code.ts"

const GROUP_KEYS = { "audit.code": null, "audit.test": null, "audit.logs": null }

export const GROUP_MEMBERS = [
  "deep/a.check-code.audit.code.ts",
  "deep/a.check-code.audit.test.ts",
  "deep/a.check-code.audit.logs.uncommitted.jsonl",
]

export const GROUP_OWN = "deep/a.check-code.ts"

export const ONE_MEMBER = "deep/a.check-code.audit.test.ts"

export function groupClaiming(there: IsThere = () => false): readonly string[] {
  const value = { id: "1", pageTypeSlug: "check-code", slug: "a" }
  const filed: FilePropertiesBy = new Map([["check-code", new Map(Object.entries(GROUP_KEYS))]])
  return claimsOf(value, GROUP_PAGE, "/repo", filed, sidecarsIn(GROUPING), new Map(), there)
}

export const ADDON = "deep/a.eso-addon.ts"

const NO_KINDS: ReadonlySet<string> = new Set()

const NO_FILED: FilePropertiesBy = new Map()

const NO_FOLDERED: FoldersBy = new Map()

const FOLDERED: FoldersBy = new Map([["eso-addon", new Map([["icons", "Icons"]])]])

const NAMED: FilePropertiesBy = new Map([["eso-addon", new Map([["bindings", "Bindings.xml"]])]])

const paging: Paging = (folder, types) =>
  folder === "deep" && types.has("eso-addon") ? ADDON : null

export function claimantBelow(path: string): string | null {
  return claimantOf(paging, path, NO_KINDS, NO_FILED, FOLDERED)
}

export function claimantNamed(path: string): string | null {
  return claimantOf(paging, path, NO_KINDS, NAMED, NO_FOLDERED)
}

const ENDED: ExtensionsBy = new Map([["eso-addon", new Map([["addon-dds-file", "dds"]])]])

export function claimantClosing(path: string): string | null {
  return claimantOf(paging, path, NO_KINDS, NO_FILED, FOLDERED, ENDED)
}
