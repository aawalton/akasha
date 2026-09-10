import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const fileKindDomain = {
  id: "01a06837-0535-70c2-9917-d332b4b6a505",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "file-kind-domain",
  definition: "one kind of file, told by the name a file has",
  pluralSlug: "file-kind-domains",
  extends: ["page-type/domain"],
  properties: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A kind reaches a file wherever in a repository that file sits.",
    },
    {
      invariantKind: "departure",
      statement: "A kind is told from a file's name rather than from the bytes the file has.",
    },
    {
      invariantKind: "gap",
      statement:
        "The pattern and the bytes and the splitting a kind states have no property here yet.",
    },
  ],
  types: "ts",
} as const satisfies PageType
