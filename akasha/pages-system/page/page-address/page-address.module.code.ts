export type Address =
  | { readonly kind: "id"; readonly id: string }
  | { readonly kind: "qualified"; readonly pageTypeSlug: string; readonly slug: string }
  | { readonly kind: "bare"; readonly slug: string }

const AN_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

export function addressIn(named: string): Address {
  if (AN_ID.test(named)) return { kind: "id", id: named }
  const cut = named.indexOf("/")
  if (cut === -1) return { kind: "bare", slug: named }
  return {
    kind: "qualified",
    pageTypeSlug: named.slice(0, cut),
    slug: named.slice(cut + 1),
  }
}
