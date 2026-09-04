import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { WorldSlug } from "../stories-played/properties/world-slug.relation-property.ts"
import type { NoteSubject } from "./properties/note-subject.text-property.ts"

export type StoryDesignNote = Page & {
  title: Title
  worldSlug?: WorldSlug
  subject?: NoteSubject
  prose?: Prose
}

export const storyDesignNote = {
  id: "01a06578-d638-794d-b1f4-f5c46500a7e9",
  pageTypeSlug: "page-type",
  slug: "story-design-note",
  definition: "one document worked out while a story's design was being settled",
  pluralSlug: "story-design-notes",
  extendsSlug: ["page-type/page"],
  runsTabooCheck: false,
  partSlugs: ["text-property/note-subject"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "world-slug", required: false, many: false },
    { pagePropertySlug: "note-subject", required: false, many: false },
    { pagePropertySlug: "prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A note is one working document rather than the design the note was worked out for.",
    },
    {
      invariantKind: "departure",
      statement: "A story has as many notes as were written.",
    },
    {
      invariantKind: "departure",
      statement: "A note carries its whole document beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A note carrying data rather than prose carries that data beside the page as the data was written.",
    },
    {
      invariantKind: "departure",
      statement: "The words a note carries are the story's rather than akasha's own.",
    },
  ],
} as const satisfies PageType
