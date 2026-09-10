import type { PageType } from "@akasha/pages/page-type"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { RelationshipTopicParent } from "./properties/relationship-topic-parent.relation-property.ts"
import type { RelationshipTopicPeople } from "./properties/relationship-topic-people.relation-property.ts"
import type { RelationshipTopicSensitivity } from "./properties/relationship-topic-sensitivity.select-property.ts"
import type { RelationshipTopicStatus } from "./properties/relationship-topic-status.select-property.ts"

export type RelationshipTopic = Page & {
  title: Title
  relationshipTopicParent?: RelationshipTopicParent
  relationshipTopicPeople?: RelationshipTopicPeople
  relationshipTopicSensitivity: RelationshipTopicSensitivity
  relationshipTopicStatus: RelationshipTopicStatus
}

export const relationshipTopic = {
  id: "01a0658a-170f-73cd-a458-8f98d995452e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "relationship-topic",
  definition: "one subject Alan and another person have to work through together",
  pluralSlug: "relationship-topics",
  extends: ["page-type/page"],
  parts: [
    "relation-property/relationship-topic-parent",
    "relation-property/relationship-topic-people",
    "select-property/relationship-topic-sensitivity",
    "select-property/relationship-topic-status",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "relation-property/relationship-topic-parent",
      required: false,
      many: false,
    },
    {
      pageProperty: "relation-property/relationship-topic-people",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "select-property/relationship-topic-sensitivity",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/relationship-topic-status", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A relationship topic is under another relationship topic or under no topic.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship topic names the people that topic is held with.",
    },
    {
      invariantKind: "absence",
      statement: "A person named here is a person the system reaches rather than a relationship.",
    },
  ],
} as const satisfies PageType
