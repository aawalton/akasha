import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const filePropertyGroup = {
  id: "01a087b2-13af-7316-9986-2aadf342ea64",
  type: "page-type/page-type",
  slug: "file-property-group",
  definition: "a page property held in a set of files",
  extends: ["page-type/page-property"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group's members are the file properties the group's page type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member's file sits beside the page carrying the group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No member's file sits beside the group's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member's file is named by the group's slug and then the member's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group names no members of its own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
