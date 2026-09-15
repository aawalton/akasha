import { join } from "node:path"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  aProperty,
  aType,
  bodyOf,
  idOf,
  indexedRepo,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

const CARRIED = "holding"

const FOLDERED = "carried-folder"

const CARRIED_ID = "01a0a5b0-0000-7000-8000-000000000001"

const FOLDER_KIND_ID = "01a0a5b0-0000-7000-8000-000000000002"

const FOLDERED_ID = "01a0a5b0-0000-7000-8000-000000000003"

const HELD = "ca.crt"

const UNDER = "art"

const DECLARES = ["code", "test", "note", "part-slugs", CARRIED, FOLDERED]

export const PAGE_AT = "akasha/one/held.module.ts"

export const CODE_AT = "akasha/one/held.module.code.ts"

export const NAMED_AT = `akasha/one/${HELD}`

export const UNDER_AT = `akasha/one/${UNDER}/held.dds`

export const AWAY_AT = `akasha/three/${HELD}`

export const STRAY_AT = "akasha/loose.txt"

export const NOWHERE_AT = "akasha/one/gone.module.code.ts"

export const FILED_AT = join(indexNamed(), "page-type", "module", "slug", "held.jsonl")

const VOCABULARY: Readonly<Record<string, string>> = {
  "akasha/module.page-type.ts": bodyOf(
    aType(idOf("6"), "module", ["page-type/domain"], DECLARES)[1]
  ),
  [`akasha/${CARRIED}.file-property.ts`]: bodyOf(
    aProperty(CARRIED_ID, CARRIED, "file-property", { fileName: HELD })[1]
  ),
  "akasha/named-folder-property.page-type.ts": bodyOf(
    aType(FOLDER_KIND_ID, "named-folder-property", ["page-type/page-property"])[1]
  ),
  [`akasha/${FOLDERED}.named-folder-property.ts`]: bodyOf(
    aProperty(FOLDERED_ID, FOLDERED, "named-folder-property", { folderName: UNDER })[1]
  ),
  [NAMED_AT]: "one\n",
  [UNDER_AT]: "under\n",
}

export function whole(): string {
  return indexedRepo(VOCABULARY)
}

export function strayed(): string {
  return indexedRepo({ ...VOCABULARY, [AWAY_AT]: "away\n", [STRAY_AT]: "nothing\n" })
}
