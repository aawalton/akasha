import type { PageType } from "@akasha/pages/page-type"

export const logSource = {
  id: "01a0657c-cb14-7c6f-83df-0d533f4f7821",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "log-source",
  definition: "a stream of console lines the processes behind a seat write",
  pluralSlug: "log-sources",
  extends: ["page-type/page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source is named for the process writing the lines rather than for the seat.",
    },
    {
      invariantKind: "departure",
      statement: "One source writes a separate day for each seat.",
    },
    {
      invariantKind: "departure",
      statement: "A source outlives every day of lines the source wrote.",
    },
    {
      invariantKind: "absence",
      statement: "A source has nothing but the name the source is reached by.",
    },
  ],
  types: "ts",
} as const satisfies PageType
