import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../pages/pages/properties/title.text-property.ts"
import type { Prose } from "./properties/prose.file-property.ts"
import type { WorldSlug } from "./properties/world-slug.relation-property.ts"

export type StoryPlayed = Collection & {
  title: Title
  worldSlug: WorldSlug
  prose?: Prose
}

export const storyPlayed = {
  id: "01a06424-329c-7c08-a753-0e0520e2d22c",
  pageTypeSlug: "page-type",
  slug: "story-played",
  definition: "a story nobody wrote",
  pluralSlug: "stories-played",
  extendsSlug: "page-type/collection",
  runsTabooCheck: false,
  partSlugs: ["file-property/prose", "relation-property/world-slug"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "world-slug", required: true, many: false },
    { pagePropertySlug: "prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A story played was made in play rather than written before the play.",
    },
    {
      invariantKind: "departure",
      statement: "A story names the world the story is of.",
    },
  ],
} as const satisfies PageType
