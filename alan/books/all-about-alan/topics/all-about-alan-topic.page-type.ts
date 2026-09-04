import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Definition } from "../../../../domain-system/domains/properties/definition.text-property.ts"
import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"
import type { TopicParentSlugs } from "./properties/topic-parent-slugs.relation-property.ts"
import type { TopicRelatedSlugs } from "./properties/topic-related-slugs.relation-property.ts"
import type { TopicSettled } from "./properties/topic-settled.text-property.ts"
import type { TopicUnsettled } from "./properties/topic-unsettled.text-property.ts"

export type AllAboutAlanTopic = Page & {
  title: Title
  definition: Definition
  parentSlugs?: TopicParentSlugs
  relatedSlugs?: TopicRelatedSlugs
  settled?: TopicSettled
  unsettled?: TopicUnsettled
}

export const allAboutAlanTopic = {
  id: "01a01acb-287b-7001-a5dd-b90e367fe4f8",
  pageTypeSlug: "page-type",
  slug: "all-about-alan-topic",
  definition: "one topic about Alan",
  pluralSlug: "all-about-alan-topics",
  extendsSlug: "page-type/page",
  partSlugs: [
    "relation-property/topic-parent-slugs",
    "relation-property/topic-related-slugs",
    "text-property/topic-settled",
    "text-property/topic-unsettled",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "definition", required: true, many: false },
    { pagePropertySlug: "topic-parent-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "topic-related-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "topic-settled", required: false, many: false },
    { pagePropertySlug: "topic-unsettled", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What contains what is carried by a topic's parents rather than by folders.",
    },
    {
      invariantKind: "departure",
      statement: "A topic sits under another topic or under none.",
    },
    {
      invariantKind: "departure",
      statement: "One topic sits under none.",
    },
    {
      invariantKind: "departure",
      statement: "A topic holds what is worked out apart from what is still open.",
    },
    {
      invariantKind: "departure",
      statement: "A topic that has neither is a title and a definition alone.",
    },
  ],
} as const satisfies PageType
