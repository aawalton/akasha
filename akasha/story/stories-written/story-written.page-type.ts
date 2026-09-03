import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { WorldSlug } from "../stories-played/properties/world-slug.relation-property.ts"

export type StoryWritten = Collection & {
  title: Title
  worldSlug: WorldSlug
  prose?: Prose
}

export const storyWritten = {
  id: "01a06554-d8bd-7502-a414-fd4fd32eba45",
  pageTypeSlug: "page-type",
  slug: "story-written",
  definition: "a story written here",
  pluralSlug: "stories-written",
  extendsSlug: "page-type/collection",
  runsTabooCheck: false,
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "world-slug", required: true, many: false },
    { pagePropertySlug: "prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A story written was set down chapter by chapter rather than played or read.",
    },
    {
      invariantKind: "departure",
      statement: "A story names the world the story is of.",
    },
    {
      invariantKind: "departure",
      statement: "More than one story written may be of the one world.",
    },
  ],
} as const satisfies PageType
