import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type PageTypeSlug = string & { readonly __brand: "PageTypeSlug" }

export function toPageTypeSlug(value: string): PageTypeSlug {
  return slugOf(value) as PageTypeSlug
}
