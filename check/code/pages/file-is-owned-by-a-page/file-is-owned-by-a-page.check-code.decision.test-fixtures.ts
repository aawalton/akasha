import { join } from "node:path"
import { domain } from "akasha/domain/domain.page-type.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  aProperty,
  aType,
  bodyOf,
  idOf,
  indexedRepo,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const CARRIED = "holding"

const FOLDERED = "carried-folder"

const ENDED = "carried-ending"

const CARRIED_ID = "01a0a5b0-0000-7000-8000-000000000001"

const FOLDER_KIND_ID = "01a0a5b0-0000-7000-8000-000000000002"

const FOLDERED_ID = "01a0a5b0-0000-7000-8000-000000000003"

const ENDING_KIND_ID = "01a0a5b0-0000-7000-8000-000000000004"

const ENDED_ID = "01a0a5b0-0000-7000-8000-000000000005"

const HELD = "ca.crt"

const UNDER = "art"

const ENDING = "dds"

const DECLARES = ["code", "test", "note", "part-slugs", CARRIED, FOLDERED, ENDED]

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pageProperty.slug}` as const

export const PAGE_AT = "akasha/one/held.module.ts"

export const CODE_AT = "akasha/one/held.module.code.ts"

export const NAMED_AT = `akasha/one/${HELD}`

export const UNDER_AT = `akasha/one/${UNDER}/held.png`

export const ENDED_AT = `akasha/one/held.${ENDING}`

export const AWAY_AT = `akasha/three/${HELD}`

export const AWAY_ENDED_AT = `akasha/three/held.${ENDING}`

export const STRAY_AT = "akasha/loose.txt"

export const NOWHERE_AT = "akasha/one/gone.module.code.ts"

export const FILED_AT = join(indexNamed(), "page-type", "module", "slug", "held.jsonl")

const VOCABULARY: Readonly<Record<string, string>> = {
  "akasha/module.page-type.ts": bodyOf(aType(idOf("6"), "module", [DOMAIN_AT], DECLARES)[1]),
  [`akasha/${CARRIED}.file-property.ts`]: bodyOf(
    aProperty(CARRIED_ID, CARRIED, "file-property", { fileName: HELD })[1]
  ),
  "akasha/named-folder-property.page-type.ts": bodyOf(
    aType(FOLDER_KIND_ID, "named-folder-property", [PAGE_PROPERTY_AT])[1]
  ),
  [`akasha/${FOLDERED}.named-folder-property.ts`]: bodyOf(
    aProperty(FOLDERED_ID, FOLDERED, "named-folder-property", { folderName: UNDER })[1]
  ),
  "akasha/named-extension-property.page-type.ts": bodyOf(
    aType(ENDING_KIND_ID, "named-extension-property", [PAGE_PROPERTY_AT])[1]
  ),
  [`akasha/${ENDED}.named-extension-property.ts`]: bodyOf(
    aProperty(ENDED_ID, ENDED, "named-extension-property", { extensionName: ENDING })[1]
  ),
  [NAMED_AT]: "one\n",
  [UNDER_AT]: "under\n",
  [ENDED_AT]: "ending\n",
}

export function whole(): string {
  return indexedRepo(VOCABULARY)
}

export function strayed(): string {
  return indexedRepo({
    ...VOCABULARY,
    [AWAY_AT]: "away\n",
    [AWAY_ENDED_AT]: "away\n",
    [STRAY_AT]: "nothing\n",
  })
}
