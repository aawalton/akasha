import { expect, test } from "bun:test"
import { filedInPageType } from "akasha/pages/address-kinds/in-page-type/in-page-type.page-address-kind.code.ts"

test("an address of this kind is filed under the page type it names", () => {
  expect(filedInPageType({ pageTypeSlug: "role", propertySlug: "slug", value: "definer" })).toEqual(
    {
      uniqueKind: "page-type",
      scope: "role",
      propertySlug: "slug",
      said: "definer",
    }
  )
})
