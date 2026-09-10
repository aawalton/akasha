import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const invariantGroup = {
  id: "01a04e11-9f97-7f42-bb41-d519ae123a65",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "invariant-group",
  definition: "the standing an invariant has",
  pluralSlug: "invariant-groups",
  parts: ["invariant-group/condition", "invariant-group/design", "invariant-group/intent"],
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A group is read off the kinds that name the group rather than stored as a list of the kinds.",
    },
  ],
  types: "ts",
} as const satisfies PageType
