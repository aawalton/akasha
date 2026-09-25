import { module } from "akasha/code/module/module.page-type.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { buildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.ts"
import {
  aProperty,
  aType,
  bodyOf,
  idOf,
  indexedRepo,
  pageOf,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const BUILT = "route-types"

const FOLDER_NAME = ".react-router"

const KIND_ID = "01a0b1f0-0000-7000-8000-000000000001"

const BUILT_ID = "01a0b1f0-0000-7000-8000-000000000002"

const PAGE_ID = "01a0b1f0-0000-7000-8000-000000000003"

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pageProperty.slug}` as const

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

export const KEY = "routeTypes"

export const IGNORES_AT = ".gitignore"

export const PAGE_AT = "akasha/web/web.module.ts"

export const BUILT_AT = `akasha/web/${FOLDER_NAME}`

export const IGNORING = `${FOLDER_NAME}/\n`

export const NOT_IGNORING = "dist/\n"

const VOCABULARY: Readonly<Record<string, string>> = {
  "akasha/module.page-type.ts": bodyOf(
    aType(idOf("6"), module.slug, [DOMAIN_AT], ["code", "test", BUILT])[1]
  ),
  "akasha/build-folder-property.page-type.ts": bodyOf(
    aType(KIND_ID, buildFolderProperty.slug, [PAGE_PROPERTY_AT])[1]
  ),
  [`akasha/${BUILT}.build-folder-property.ts`]: bodyOf(
    aProperty(BUILT_ID, BUILT, buildFolderProperty.slug, { folderName: FOLDER_NAME })[1]
  ),
  [PAGE_AT]: pageOf({
    id: PAGE_ID,
    type: MODULE_AT,
    slug: "web",
    definition: "a page naming a build folder",
    [KEY]: true,
  }),
}

export function built(named: Readonly<Record<string, string>> = {}): string {
  return indexedRepo({ ...VOCABULARY, ...named })
}
