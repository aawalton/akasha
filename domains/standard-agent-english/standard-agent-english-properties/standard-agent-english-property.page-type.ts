import type { PageType } from "@akasha/pages/page-type"
import type { TextProperty } from "@akasha/pages/text-property"

export type StandardAgentEnglishProperty = TextProperty

export const standardAgentEnglishProperty = {
  id: "01a07c99-fb58-79b6-a204-a2bf1f056902",
  pageTypeSlug: "page-type",
  slug: "standard-agent-english-property",
  definition: "a text property whose value Standard Agent English judges",
  pluralSlug: "standard-agent-english-properties",
  extends: ["page-type/text-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property of this page type has a value read as English.",
    },
    {
      invariantKind: "departure",
      statement: "A property whose page type extends this page type is judged the same way.",
    },
    {
      invariantKind: "departure",
      statement: "A property of any other page type is not judged.",
    },
    {
      invariantKind: "departure",
      statement: "A property is moved to this page type rather than named in a list.",
    },
  ],
} as const satisfies PageType
