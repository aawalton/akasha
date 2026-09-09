import { scratchWorld } from "@akasha/command-system/scratching"
import {
  idFiled,
  listedFiled,
  relationFiled,
  schemaFiled,
  valueAlsoFiled,
} from "@akasha/indexes/testing"
import type { Value } from "@akasha/pages/page-value"

export const scratch = scratchWorld()

export const CERTIFICATE = "ca.crt"

export const ELSEWHERE = "node_modules/one/ca.crt"

export const WALLPAPER = "far/away/one.certificate-authority.wallpaper.png"

export const FOREIGN = "far/away/one.persona.wallpaper.png"

const PROPERTY_AT = "akasha/authority-certificate.file-property.ts"

const PROPERTY_ID = "01a087f0-0000-7000-8000-00000000000a"

const TYPE_AT = "akasha/certificate-authority.page-type.ts"

const TYPE_ID = "01a087f0-0000-7000-8000-00000000000b"

const OWNER_AT = "one.certificate-authority.ts"

const OWNER_ID = "01a087f0-0000-7000-8000-00000000000c"

const FILE_PROPERTY = "file-property"

const PAGE_TYPE = "page-type"

const AUTHORITY = "certificate-authority"

const SLUG = "authority-certificate"

const STEM = "01a087f0-0000-7000-8000-0000000000"

const CARRIED: readonly Value[] = [
  { pageTypeSlug: FILE_PROPERTY, slug: "wallpaper", propertySlug: "wallpaper", holdsBytes: true },
  { pageTypeSlug: FILE_PROPERTY, slug: "notes", propertySlug: "notes" },
]

function alsoSeeded(root: string): undefined {
  let held = 20
  const filing = (kind: string, slug: string, path: string, value: Value): string => {
    const id = `${STEM}${held}`
    held += 1
    listedFiled(root, kind, slug, [{ path, id }])
    idFiled(root, id, [{ path, id }])
    valueAlsoFiled(root, kind, [{ path, value: { id, ...value } }])
    return id
  }
  filing(PAGE_TYPE, FILE_PROPERTY, `akasha/${FILE_PROPERTY}.page-type.ts`, {
    pageTypeSlug: PAGE_TYPE,
    slug: FILE_PROPERTY,
    extends: ["page-type/page-property"],
  })
  for (const value of CARRIED) {
    const slug = String(value["slug"])
    const id = filing(FILE_PROPERTY, slug, `akasha/${slug}.${FILE_PROPERTY}.ts`, value)
    schemaFiled(root, FILE_PROPERTY, slug, [
      {
        pageTypeSlug: FILE_PROPERTY,
        targetPageTypeSlug: null,
        unique: null,
        slug,
        propertySlug: slug,
      },
    ])
    relationFiled(root, id, "page-property", TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  }
}

export function seeded(value: Value): string {
  const root = scratch.rootFor("akasha-no-raw-nul-bytes-")
  listedFiled(root, FILE_PROPERTY, SLUG, [{ path: PROPERTY_AT, id: PROPERTY_ID }])
  idFiled(root, PROPERTY_ID, [{ path: PROPERTY_AT, id: PROPERTY_ID }])
  relationFiled(root, PROPERTY_ID, "page-property", TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  schemaFiled(root, FILE_PROPERTY, SLUG, [
    {
      pageTypeSlug: FILE_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: SLUG,
      propertySlug: SLUG,
      fileName: CERTIFICATE,
    },
  ])
  valueAlsoFiled(root, FILE_PROPERTY, [
    {
      path: PROPERTY_AT,
      value: { id: PROPERTY_ID, pageTypeSlug: FILE_PROPERTY, slug: SLUG, ...value },
    },
  ])
  listedFiled(root, PAGE_TYPE, AUTHORITY, [{ path: TYPE_AT, id: TYPE_ID }])
  valueAlsoFiled(root, PAGE_TYPE, [
    { path: TYPE_AT, value: { id: TYPE_ID, pageTypeSlug: PAGE_TYPE, slug: AUTHORITY } },
  ])
  idFiled(root, TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  listedFiled(root, AUTHORITY, "one", [{ path: OWNER_AT, id: OWNER_ID }])
  valueAlsoFiled(root, AUTHORITY, [
    { path: OWNER_AT, value: { id: OWNER_ID, pageTypeSlug: AUTHORITY, slug: "one" } },
  ])
  alsoSeeded(root)
  return root
}

export function letThrough(): string {
  return seeded({ fileName: CERTIFICATE, holdsBytes: true })
}
