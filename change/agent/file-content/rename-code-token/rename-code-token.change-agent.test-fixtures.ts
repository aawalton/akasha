import { domain } from "akasha/domain/domain.page-type.ts"
import {
  bodyOf,
  indexedRepo,
  pageOf,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const DECLARING_TYPE = "akasha/type-declaration.page-type.ts"

const AMBIENT_PROPERTY = "akasha/ambient-types.file-property.ts"

const KEPT_PAGE = "akasha/ambient/kept.type-declaration.ts"

const REACHED_PAGE = "akasha/ambient/reached.type-declaration.ts"

const TABLE_PAGE = "akasha/ambient/table.type-declaration.ts"

const KEPT_AT = "../ambient/kept.type-declaration.d.ts"

const REACHED_AT = "../ambient/reached.type-declaration.d.ts"

export const KEPT_DECLARATION = "akasha/ambient/kept.type-declaration.d.ts"

export const REACHED_DECLARATION = "akasha/ambient/reached.type-declaration.d.ts"

export const TABLE_DECLARATION = "akasha/ambient/table.type-declaration.d.ts"

export const ONE_CODE = "akasha/reader-one/reader-one.module.code.ts"

export const TWO_CODE = "akasha/reader-two/reader-two.module.code.ts"

export const GLOBE_CODE = "akasha/reader-globe/reader-globe.module.code.ts"

export const WRITER_CODE = "akasha/writer/writer.module.code.ts"

export const STRAY_CODE = "akasha/stray/stray.module.code.ts"

export const AMBIENT_KEPT = "TemperKept"

export const AMBIENT_REACHED = "TemperReached"

export const AMBIENT_TABLED = "TemperTabled"

export const AMBIENT_VARIED = "TemperVaried"

export const AMBIENT_STRAYED = "TemperStrayed"

const TABLE_BODY = `declare const ${AMBIENT_TABLED}: number
declare var ${AMBIENT_VARIED}: number
declare const ${AMBIENT_STRAYED}: number
declare const _G: typeof globalThis & Record<string, unknown>
`

const WRITER_BODY = `import "../ambient/table.type-declaration.d.ts"

export function setUp(): undefined {
  _G.${AMBIENT_TABLED} = 1
  _G["${AMBIENT_TABLED}"] = 1
  globalThis.${AMBIENT_VARIED} = 1
}
`

const STRAY_BODY = `export function strayOf(one: Record<string, unknown>): unknown {
  return one["${AMBIENT_STRAYED}"]
}
`

function readerBody(at: string, named: string, reached: string): string {
  return `import "${at}"\n\nexport const ${named} = ${reached} + 1\n`
}

export function declaringRepo(): string {
  return indexedRepo({
    [DECLARING_TYPE]: bodyOf({
      id: "01a04a4a-0007-7000-8000-000000000001",
      type: `${pageType.slug}/${pageType.slug}`,
      slug: "type-declaration",
      extends: [DOMAIN_AT],
      properties: [{ pagePropertySlug: "ambient-types", required: true, many: false }],
    }),
    [AMBIENT_PROPERTY]: bodyOf({
      id: "01a04a4a-0007-7000-8000-000000000002",
      type: `${pageType.slug}/file-property`,
      slug: "ambient-types",
      propertySlug: "d",
    }),
    [KEPT_PAGE]: pageOf({
      id: "01a04a4a-0007-7000-8000-000000000003",
      type: `${pageType.slug}/type-declaration`,
      slug: "kept",
      d: "ts",
    }),
    [KEPT_DECLARATION]: `declare const ${AMBIENT_KEPT}: number\n`,
    [REACHED_PAGE]: pageOf({
      id: "01a04a4a-0007-7000-8000-000000000004",
      type: `${pageType.slug}/type-declaration`,
      slug: "reached",
      d: "ts",
    }),
    [REACHED_DECLARATION]: `export {}\n\ndeclare global {\n  const ${AMBIENT_REACHED}: number\n}\n`,
    "akasha/reader-one/reader-one.module.ts": pageOf({
      id: "01a04a4a-0007-7000-8000-000000000005",
      type: `${pageType.slug}/module`,
      slug: "reader-one",
      code: "ts",
    }),
    [ONE_CODE]: readerBody(KEPT_AT, "one", AMBIENT_KEPT),
    "akasha/reader-two/reader-two.module.ts": pageOf({
      id: "01a04a4a-0007-7000-8000-000000000006",
      type: `${pageType.slug}/module`,
      slug: "reader-two",
      code: "ts",
    }),
    [TWO_CODE]: readerBody(KEPT_AT, "two", AMBIENT_KEPT),
    "akasha/reader-globe/reader-globe.module.ts": pageOf({
      id: "01a04a4a-0007-7000-8000-000000000007",
      type: `${pageType.slug}/module`,
      slug: "reader-globe",
      code: "ts",
    }),
    [GLOBE_CODE]: readerBody(REACHED_AT, "globe", AMBIENT_REACHED),
    [TABLE_PAGE]: pageOf({
      id: "01a04a4a-0007-7000-8000-000000000008",
      type: `${pageType.slug}/type-declaration`,
      slug: "table",
      d: "ts",
    }),
    [TABLE_DECLARATION]: TABLE_BODY,
    "akasha/writer/writer.module.ts": pageOf({
      id: "01a04a4a-0007-7000-8000-000000000009",
      type: `${pageType.slug}/module`,
      slug: "writer",
      code: "ts",
    }),
    [WRITER_CODE]: WRITER_BODY,
    "akasha/stray/stray.module.ts": pageOf({
      id: "01a04a4a-0007-7000-8000-00000000000a",
      type: `${pageType.slug}/module`,
      slug: "stray",
      code: "ts",
    }),
    [STRAY_CODE]: STRAY_BODY,
  })
}
