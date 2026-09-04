import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { RelationshipTopicParentSlug } from "./properties/relationship-topic-parent-slug.relation-property.ts"
import type { RelationshipTopicPersonSlugs } from "./properties/relationship-topic-person-slugs.relation-property.ts"
import type { RelationshipTopicSensitivity } from "./properties/relationship-topic-sensitivity.select-property.ts"
import type { RelationshipTopicStatus } from "./properties/relationship-topic-status.select-property.ts"

export type RelationshipTopic = Page & {
  title: Title
  relationshipTopicParentSlug?: RelationshipTopicParentSlug
  relationshipTopicPersonSlugs?: readonly RelationshipTopicPersonSlugs[]
  relationshipTopicSensitivity: RelationshipTopicSensitivity
  relationshipTopicStatus: RelationshipTopicStatus
}

export const relationshipTopic = {
  id: "01a0658a-170f-73cd-a458-8f98d995452e",
  pageTypeSlug: "page-type",
  slug: "relationship-topic",
  definition: "one subject Alan and another person have to work through together",
  pluralSlug: "relationship-topics",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "relation-property/relationship-topic-parent-slug",
    "relation-property/relationship-topic-person-slugs",
    "select-property/relationship-topic-sensitivity",
    "select-property/relationship-topic-status",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "relationship-topic-parent-slug", required: false, many: false },
    { pagePropertySlug: "relationship-topic-person-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "relationship-topic-sensitivity", required: true, many: false },
    { pagePropertySlug: "relationship-topic-status", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A relationship topic stands under another relationship topic, or under none.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship topic names the people it is held with.",
    },
    {
      invariantKind: "absence",
      statement: "A person named here is one the system reaches rather than any relationship.",
    },
  ],
} as const satisfies PageType
