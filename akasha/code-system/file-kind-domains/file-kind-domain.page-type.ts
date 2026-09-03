import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type FileKindDomain = Domain

export const fileKindDomain = {
  id: "01a06837-0535-70c2-9917-d332b4b6a505",
  pageTypeSlug: "page-type",
  slug: "file-kind-domain",
  definition: "one kind of file, told by the name a file carries",
  pluralSlug: "file-kind-domains",
  extendsSlug: "page-type/domain",
  properties: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A kind reaches a file wherever in a repository that file sits.",
    },
    {
      invariantKind: "departure",
      statement: "A kind is told from a file's name rather than from what the file holds.",
    },
    {
      invariantKind: "gap",
      statement:
        "The pattern, the bytes and the splitting a kind states have no property here yet.",
    },
  ],
} as const satisfies PageType
