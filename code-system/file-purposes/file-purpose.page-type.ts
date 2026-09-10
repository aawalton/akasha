import type { PageType } from "@akasha/pages/page-type"

export const filePurpose = {
  id: "01a06837-0535-7469-ab8e-6bda76b453a7",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "file-purpose",
  definition: "what a file is for, told by its name ending rather than its format",
  pluralSlug: "file-purposes",
  parts: ["file-purpose/test-ts", "file-purpose/test-tsx"],
  extends: ["page-type/domain"],
  properties: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A purpose is told from a file's name rather than from the file's body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A kind says the format a file is written in and a purpose says the use that file is written for.",
    },
    {
      invariantKind: "departure",
      statement: "One file has a kind and a purpose at once.",
    },
    {
      invariantKind: "gap",
      statement: "The ending a purpose claims has no property here yet.",
    },
  ],
  types: "ts",
} as const satisfies PageType
