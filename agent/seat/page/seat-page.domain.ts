import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatPage = {
  id: "01a09c49-420c-7e83-819d-68f7d075e037",
  type: "page-type/domain",
  slug: "seat-page",
  definition: "a seat's page in akasha, read and written",
  parts: [
    "module/seat-akasha-beside",
    "module/seat-akasha-history",
    "module/seat-akasha-read",
    "module/seat-beside",
    "module/seat-page-akasha",
    "module/seat-page-beat",
    "module/seat-page-history",
    "module/seat-page-values",
    "module/seat-page-writing",
    "module/seat-reading",
    "module/seat-record",
  ],
} as const satisfies Domain
