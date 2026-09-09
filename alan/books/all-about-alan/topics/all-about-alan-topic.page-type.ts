import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Definition } from "../../../../domains/properties/definition.standard-agent-english-property.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { TopicParents } from "./properties/topic-parents.relation-property.ts"
import type { TopicRelated } from "./properties/topic-related.relation-property.ts"
import type { TopicSettled } from "./properties/topic-settled.text-property.ts"

export type AllAboutAlanTopic = Page & {
  title: Title
  definition: Definition
  parents?: TopicParents
  related?: TopicRelated
  settled?: TopicSettled
}

export const allAboutAlanTopic = {
  id: "01a01acb-287b-7001-a5dd-b90e367fe4f8",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "all-about-alan-topic",
  definition: "one topic about Alan",
  pluralSlug: "all-about-alan-topics",
  extends: ["page-type/page"],
  parts: [
    "relation-property/topic-parents",
    "relation-property/topic-related",
    "text-property/topic-settled",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
    {
      pageProperty: "relation-property/topic-parents",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "relation-property/topic-related",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/topic-settled", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Containment is carried by a topic's parents rather than by folders.",
    },
    {
      invariantKind: "departure",
      statement: "A topic sits under another topic or under no topic.",
    },
    {
      invariantKind: "departure",
      statement: "Exactly one topic sits under no topic.",
    },
    {
      invariantKind: "departure",
      statement: "A topic with no settled text is a title and a definition alone.",
    },
  ],
} as const satisfies PageType
