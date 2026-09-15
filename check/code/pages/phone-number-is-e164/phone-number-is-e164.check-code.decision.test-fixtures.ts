import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  declaring,
  edging,
  filing,
  founded,
  pathFor,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

export const HELD = "01a058ff-c2b0-7001-8000-000000000001"

export const MOBILE = "01a058ff-c2b0-7002-8000-000000000002"

export const AT = pathFor("person", "held")

export const MOBILE_AT = "akasha/mobile-number-property.page-type.ts"

export const KEYED = new Map([["phone", "phone"]])

export const scratch = scratchWorld()

function namedByPerson(root: string, kind: string, slug: string): undefined {
  filing(root, kind, slug, `id-${slug}`)
  edging(root, `id-${slug}`, "page-property", "id-person", pathFor("page-type", "person"))
}

export function rooted(): string {
  const root = scratch.rootFor("akasha-e164-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-type", "domain")
  typed(root, "page-property", "domain")
  typed(root, "text-property", "page-property")
  typed(root, "phone-number-property", "page-property")
  typed(root, "person", "domain", ["phone", "note", "mobile"])
  declaring(root, "phone", { pageTypeSlug: "phone-number-property" })
  declaring(root, "note", { pageTypeSlug: "text-property" })
  declaring(root, "mobile", { pageTypeSlug: "mobile-number-property" })
  namedByPerson(root, "phone-number-property", "phone")
  namedByPerson(root, "text-property", "note")
  namedByPerson(root, "mobile-number-property", "mobile")
  return root
}

export function personText(stated: string): string {
  return (
    `export const held = { id: ${JSON.stringify(HELD)}, pageTypeSlug: "person", ` +
    `slug: "held", ${stated} }\n`
  )
}

export function person(stated: string): Uint8Array {
  return bytesOf(personText(stated))
}
