import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const indexIdentity = {
  id: "01a04a4a-23e9-741f-a0ce-e56753a7b13f",
  pageTypeSlug: "domain",
  slug: "index-identity",
  definition: "an index from an identifier to the page carrying it",
  design: [
    {
      invariantKind: "departure",
      statement: "An identity file is found by scope, then property, then value.",
    },
    {
      invariantKind: "departure",
      statement: "The scope is the page type an identifier is unique within.",
    },
    {
      invariantKind: "departure",
      statement: "Only the `page` page type declares an identifier unique across every page.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the page's path and its id.",
    },
    {
      invariantKind: "departure",
      statement: "A slug reaches an id without opening the page.",
    },
    {
      invariantKind: "departure",
      statement: "The identifiers are `id`, `slug` and `path`.",
    },
    {
      invariantKind: "departure",
      statement: "The identifiers are named in code rather than declared.",
    },
    {
      invariantKind: "departure",
      statement: "A file holds one line for each page carrying the value.",
    },
  ],
  condition: [
    {
      invariantKind: "departure",
      statement: "No two pages carry one id.",
    },
    {
      invariantKind: "departure",
      statement: "No two pages of one page type carry one slug.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "The index takes its identifiers from what the properties declare.",
    },
    {
      invariantKind: "gap",
      statement: "A page carrying an identifier another page already carries does not land.",
    },
  ],
} as const satisfies Domain
