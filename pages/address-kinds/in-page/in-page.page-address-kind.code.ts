import type { Filed } from "akasha/pages/indexes/identity/index-identity.index.code.ts"
import type { Id } from "../../properties/id.text-property.ts"

const PAGE = "page"

const ID = "id"

const NO_SCOPE = ""

export type InPage = {
  readonly id: Id
}

export function isInPage(one: object): one is InPage {
  return "id" in one
}

export function filedInPage(address: InPage): Filed {
  return { uniqueKind: PAGE, scope: NO_SCOPE, propertySlug: ID, said: address.id }
}
