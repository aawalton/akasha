import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { ChapterNumber } from "./properties/chapter-number.number-property.ts"
import type { WikiKind } from "./properties/wiki-kind.select-property.ts"

export type StoryWikiEntry = Page & {
  title: Title
  worldSlug?: World
  kind?: WikiKind
  chapterNumber?: ChapterNumber
  prose?: Prose
}

export const storyWikiEntry = {
  id: "01a06578-d638-7c48-8225-eb46a4fbf9c6",
  pageTypeSlug: "page-type",
  slug: "story-wiki-entry",
  definition: "what a story has established about one of the things in it",
  pluralSlug: "story-wiki-entries",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: ["number-property/chapter-number", "select-property/wiki-kind"],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "relation-property/world", required: false, many: false },
    { pagePropertySlug: "select-property/wiki-kind", required: false, many: false },
    { pagePropertySlug: "number-property/chapter-number", required: false, many: false },
    { pagePropertySlug: "file-property/prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An entry says the truths the story has established rather than the truths the design intends.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is true as of the chapter the entry names.",
    },
    {
      invariantKind: "departure",
      statement: "An entry about a setup not yet paid off is a seed.",
    },
    {
      invariantKind: "departure",
      statement: "The words an entry has are the story's rather than akasha's own.",
    },
  ],
} as const satisfies PageType
