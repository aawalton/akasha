import type { PageType } from "@akasha/pages/page-type"
import type { Collection } from "../../collections/collection.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "./properties/prose.file-property.ts"
import type { World } from "./properties/world.relation-property.ts"

export type StoryPlayed = Collection & {
  title: Title
  world?: World
  prose?: Prose
}

export const storyPlayed = {
  id: "01a06424-329c-7c08-a753-0e0520e2d22c",
  pageTypeSlug: "page-type",
  slug: "story-played",
  definition: "a story nobody wrote",
  pluralSlug: "stories-played",
  extends: ["page-type/collection"],
  runsTabooCheck: false,
  parts: ["file-property/prose", "relation-property/world"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A story played was made in play rather than written before the play.",
    },
  ],
} as const satisfies PageType
