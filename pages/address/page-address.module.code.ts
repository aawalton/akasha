import { lowerUuid } from "../name-formats/pages/lower-uuid/lower-uuid.name-format.code.ts"

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

export function slugIn(named: string): string | null {
  const address = addressIn(named)
  return address.kind === "id" ? null : address.slug
}
