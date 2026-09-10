import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const sync = {
  id: "01a06835-e289-7ad6-8588-3a59938a1140",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "sync",
  definition: "one outside place this system pulls from, and how each pull went",
  pluralSlug: "syncs",
  extends: ["page-type/page"],
  parts: ["page-property-entry/sync-runs"],
  properties: [{ pageProperty: "page-property-entry/sync-runs", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sync runs one pull at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A second pull starting says the first died without saying so.",
    },
    {
      invariantKind: "departure",
      statement: "Which pull is in flight is rewritten on every start and finish.",
    },
    {
      invariantKind: "absence",
      statement: "The value with the pull in flight is never committed.",
    },
  ],
  types: "ts",
} as const satisfies PageType
