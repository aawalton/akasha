import type { PageType } from "@akasha/pages/page-type"
import type { Collection } from "../../collections/collection.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"

export type StoryWritten = Collection & {
  title: Title
  world?: World
  prose?: Prose
}

export const storyWritten = {
  id: "01a06554-d8bd-7502-a414-fd4fd32eba45",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "story-written",
  definition: "a story written here",
  pluralSlug: "stories-written",
  extends: ["page-type/collection"],
  runsTabooCheck: false,
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A story written was set down chapter by chapter rather than played or read.",
    },

    {
      invariantKind: "departure",
      statement: "More than one story written may be of the one world.",
    },
  ],
} as const satisfies PageType
