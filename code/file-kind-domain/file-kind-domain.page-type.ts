import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const fileKindDomain = {
  id: "01a06837-0535-70c2-9917-d332b4b6a505",
  type: "page-type",
  slug: "file-kind-domain",
  definition: "one kind of file, told by the name a file has",
  extends: ["page-type/domain"],
  properties: [],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind reaches a file wherever in a repository that file sits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind is told from a file's name rather than from the bytes the file has.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "The pattern and the bytes and the splitting a kind states have no property here yet.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
