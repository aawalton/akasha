import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type FilePurpose = Domain

export const filePurpose = {
  id: "01a06837-0535-7469-ab8e-6bda76b453a7",
  pageTypeSlug: "page-type",
  slug: "file-purpose",
  definition: "what a file is for, told by its name ending rather than its format",
  pluralSlug: "file-purposes",
  partSlugs: ["file-purpose/test-ts", "file-purpose/test-tsx"],
  extendsSlug: ["page-type/domain"],
  properties: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A purpose is told from a file's name rather than from what the file holds.",
    },
    {
      invariantKind: "departure",
      statement: "A kind says what a file is written in and a purpose says what it is written for.",
    },
    {
      invariantKind: "departure",
      statement: "One file carries a kind and a purpose at once.",
    },
    {
      invariantKind: "gap",
      statement: "The ending a purpose claims has no property here yet.",
    },
  ],
} as const satisfies PageType
