import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const flag = {
  id: "01a06835-e289-76ca-8e3e-0ef012ffdf1a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "flag",
  definition: "a switch held outside the code that reads it",
  pluralSlug: "flags",
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag is read at the moment that flag is needed rather than at start-up.",
    },
  ],
  types: "ts",
} as const satisfies PageType
