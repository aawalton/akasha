import type { Filed } from "@akasha/indexes/identity"
import {
  filedInPage,
  type InPage,
  isInPage,
} from "../address-kinds/in-page/in-page.page-address-kind.code.ts"
import {
  filedInPageProperty,
  type InPageProperty,
  isInPageProperty,
} from "../address-kinds/in-page-property/in-page-property.page-address-kind.code.ts"
import {
  filedInPageType,
  type InPageType,
} from "../address-kinds/in-page-type/in-page-type.page-address-kind.code.ts"
import { lowerUuid } from "../name-formats/pages/lower-uuid/lower-uuid.name-format.code.ts"

export type PageAddress = InPage | InPageType | InPageProperty

export function filedFor(address: PageAddress): Filed {
  if (isInPage(address)) return filedInPage(address)
  if (isInPageProperty(address)) return filedInPageProperty(address)
  return filedInPageType(address)
}

const SLUG = "slug"

export type Address =
  | { readonly kind: "id"; readonly id: string }
  | {
      readonly kind: "scoped"
      readonly pageTypeSlug: string
      readonly scope: string
      readonly slug: string
    }
  | { readonly kind: "qualified"; readonly pageTypeSlug: string; readonly slug: string }
  | { readonly kind: "bare"; readonly slug: string }

export function addressIn(named: string): Address {
  if (lowerUuid(named)) return { kind: "id", id: named }
  const first = named.indexOf("/")
  if (first === -1) return { kind: "bare", slug: named }
  const rest = named.slice(first + 1)
  const second = rest.indexOf("/")
  if (second === -1) {
    return { kind: "qualified", pageTypeSlug: named.slice(0, first), slug: rest }
  }
  return {
    kind: "scoped",
    pageTypeSlug: named.slice(0, first),
    scope: rest.slice(0, second),
    slug: rest.slice(second + 1),
  }
}

export function namedAs(pageTypeSlug: string, slug: string, scope: string | null): string {
  if (scope === null) return `${pageTypeSlug}/${slug}`
  return `${pageTypeSlug}/${scope}/${slug}`
}

export function slugIn(named: string): string | null {
  const address = addressIn(named)
  return address.kind === "id" ? null : address.slug
}

export function addressedIn(named: string): PageAddress | { readonly refused: string } {
  const address = addressIn(named)
  if (address.kind === "id") return { id: address.id }
  if (address.kind === "qualified") {
    return { pageTypeSlug: address.pageTypeSlug, propertySlug: SLUG, value: address.slug }
  }
  if (address.kind === "bare") {
    return {
      refused: `\`${named}\` names no page type, so which page it reaches is read off whoever asked`,
    }
  }
  return {
    refused: `\`${named}\` names its parent by a slug, and a slug names pages of more than one type`,
  }
}
