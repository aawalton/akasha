import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Definition } from "../../../../domains/properties/definition.text-property.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
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
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "relation-property/topic-parent-slugs",
    "relation-property/topic-related-slugs",
    "text-property/topic-settled",
    "text-property/topic-unsettled",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "text-property/definition", required: true, many: false },
    {
      pagePropertySlug: "relation-property/topic-parent-slugs",
      required: false,
      many: true,
      max: null,
    },
    {
      pagePropertySlug: "relation-property/topic-related-slugs",
      required: false,
      many: true,
      max: null,
    },
    { pagePropertySlug: "text-property/topic-settled", required: false, many: false },
    { pagePropertySlug: "text-property/topic-unsettled", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Containment is carried by a topic's parents rather than by folders.",
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
      statement: "A topic holds its settled text apart from its unsettled text.",
    },
    {
      invariantKind: "departure",
      statement: "A topic that has neither is a title and a definition alone.",
    },
  ],
} as const satisfies PageType
