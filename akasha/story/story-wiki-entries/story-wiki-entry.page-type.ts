import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { WorldSlug } from "../stories-played/properties/world-slug.relation-property.ts"
import type { ChapterNumber } from "./properties/chapter-number.number-property.ts"
import type { WikiKind } from "./properties/wiki-kind.select-property.ts"

export type StoryWikiEntry = Page & {
  title: Title
  worldSlug?: WorldSlug
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
  extendsSlug: "page-type/page",
  runsTabooCheck: false,
  partSlugs: [
    "file-property/prose",
    "number-property/chapter-number",
    "relation-property/world-slug",
    "select-property/wiki-kind",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "world-slug", required: false, many: false },
    { pagePropertySlug: "wiki-kind", required: false, many: false },
    { pagePropertySlug: "chapter-number", required: false, many: false },
    { pagePropertySlug: "prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An entry says what the story has established rather than what the design intends.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is true as of the chapter the entry names.",
    },
    {
      invariantKind: "departure",
      statement: "An entry about what has been set up but not yet paid off is a seed.",
    },
    {
      invariantKind: "departure",
      statement: "The words an entry carries are the story's rather than akasha's own.",
    },
  ],
} as const satisfies PageType
