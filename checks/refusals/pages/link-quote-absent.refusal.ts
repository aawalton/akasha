import type { Refusal } from "../refusal.page-type.types.ts"

export const linkQuoteAbsent = {
  id: "01a06611-398c-7f35-bdf8-fdb4af9a837e",
  pageTypeSlug: "refusal",
  type: "refusal",
  slug: "link-quote-absent",
  title: "Link quote absent",
  text: "{where} links `{href}` under quoted text {resolved} does not hold — a quote reads as the document's own words, so one representing what it no longer says is read as current.",
} as const satisfies Refusal
