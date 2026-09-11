import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const syncScript = {
  id: "01a090f2-699c-72b3-bd1c-8131bbdf8613",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "sync-script",
  propertySlug: "sync-script",
  definition: "the script making an app's native sources from its shell",
  targetPageType: "page-type/shell-script",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The script is handed `add` where the shell carries no native sources, `sync` where it does.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which script makes an app's native sources is read from its page rather than walked to.",
    },
    {
      invariantKind: "departure",
      statement: "The script is run by name rather than through a manifest.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
