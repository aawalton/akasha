export type PageTypeSlug = string & { readonly __brand: "PageTypeSlug" }

export function toPageTypeSlug(value: string): PageTypeSlug {
  return value as PageTypeSlug
}
