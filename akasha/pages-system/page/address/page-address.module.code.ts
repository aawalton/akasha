import { lowerUuid } from "../../name-formats/pages/lower-uuid/lower-uuid.name-format.code.ts"

export type Address =
  | { readonly kind: "id"; readonly id: string }
  | { readonly kind: "qualified"; readonly pageTypeSlug: string; readonly slug: string }
  | { readonly kind: "bare"; readonly slug: string }

export function addressIn(named: string): Address {
  if (lowerUuid(named)) return { kind: "id", id: named }
  const cut = named.indexOf("/")
  if (cut === -1) return { kind: "bare", slug: named }
  return {
    kind: "qualified",
    pageTypeSlug: named.slice(0, cut),
    slug: named.slice(cut + 1),
  }
}

export function slugIn(named: string): string | null {
  const address = addressIn(named)
  return address.kind === "id" ? null : address.slug
}
