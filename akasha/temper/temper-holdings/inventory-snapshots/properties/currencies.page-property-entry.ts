import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Currencies = "jsonl"

export const currencies = {
  id: "01a0675a-f185-764c-991b-b24e3698ed52",
  pageTypeSlug: "page-property-entry",
  slug: "currencies",
  propertySlug: "currencies",
  definition: "how much of each currency is held, one purse to a line",
  properties: [
    { pagePropertySlug: "currency-scope", required: true, many: false },
    { pagePropertySlug: "eso-character-id", required: false, many: false },
    { pagePropertySlug: "currency-key", required: true, many: false },
    { pagePropertySlug: "currency-amount", required: true, many: false },
    { pagePropertySlug: "last-scanned-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line is one currency held under one scope.",
    },
    {
      invariantKind: "departure",
      statement: "A currency held across the whole account names no character.",
    },
    {
      invariantKind: "departure",
      statement: "A currency held by one character names when that character was last read.",
    },
  ],
} as const satisfies PagePropertyEntry
