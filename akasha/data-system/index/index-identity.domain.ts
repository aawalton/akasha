import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const indexIdentity = {
  id: "01a04a4a-23e9-741f-a0ce-e56753a7b13f",
  pageTypeSlug: "domain",
  slug: "index-identity",
  definition: "an index from an identifier to the page carrying it",
  design: [
    "An identity file is found by scope, then property, then value.",
    "The scope is the page type an identifier is unique within.",
    "Only the `page` page type declares an identifier unique across every page.",
    "A line carries the page's path and its id.",
    "A slug reaches an id without opening the page.",
    "The identifiers are `id` and `slug`.",
    "The identifiers are named in code rather than declared.",
    "A file holds one line for each page carrying the value.",
  ],
  condition: [
    "No two pages carry one id.",
    "No two pages of one page type carry one slug.",
  ],
  intent: [
    "The index takes its identifiers from what the properties declare.",
  ],
} as const satisfies Domain
