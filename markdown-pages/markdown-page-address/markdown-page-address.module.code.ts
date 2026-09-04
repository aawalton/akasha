import { checkScalar } from "../markdown-document-value/markdown-document-value.module.code.ts"

export const RELATION_ADDRESS = "relation-address"

export const ADDRESS_SEPARATOR = "/"

export const ADDRESS_SAYS = `the page type and slug of the page it points at, written \`<page-type>${ADDRESS_SEPARATOR}<slug>\``

export interface Address {
  readonly type: string
  readonly slug: string
}

export function addressParts(text: string): Address | null {
  const at = text.indexOf(ADDRESS_SEPARATOR)
  if (at < 1 || at === text.length - 1) return null
  const type = text.slice(0, at)
  const slug = text.slice(at + 1)
  if (checkScalar(type, { type: "slug" }) !== null) return null
  if (checkScalar(slug, { type: "slug" }) !== null) return null
  return { type, slug }
}

export function slugNamed(text: string): string
export function slugNamed(text: string | null): string | null
export function slugNamed(text: string | null): string | null {
  if (text === null) return null
  return addressParts(text)?.slug ?? text
}

export function addressOf(type: string, slug: string): string {
  return `${type}${ADDRESS_SEPARATOR}${slug}`
}
