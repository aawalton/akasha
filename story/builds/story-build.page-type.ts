import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { WorldSlug } from "../stories-played/properties/world-slug.relation-property.ts"
import type { ChapterNumber } from "../wiki-entries/properties/chapter-number.number-property.ts"
import type { BuildLevel } from "./properties/build-level.number-property.ts"
import type { ClassName } from "./properties/class-name.text-property.ts"
import type { GameSystem } from "./properties/game-system.text-property.ts"

export type StoryBuild = Page & {
  title: Title
  worldSlug?: WorldSlug
  chapterNumber?: ChapterNumber
  level?: BuildLevel
  className?: ClassName
  gameSystem?: GameSystem
  prose?: Prose
}

export const storyBuild = {
  id: "01a06578-d638-74fa-9fea-d5dfb9cf10ec",
  pageTypeSlug: "page-type",
  slug: "story-build",
  definition: "what a played character's numbers are at one chapter",
  pluralSlug: "story-builds",
  extendsSlug: ["page-type/page"],
  runsTabooCheck: false,
  partSlugs: [
    "number-property/build-level",
    "text-property/class-name",
    "text-property/game-system",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "world-slug", required: false, many: false },
    { pagePropertySlug: "chapter-number", required: false, many: false },
    { pagePropertySlug: "build-level", required: false, many: false },
    { pagePropertySlug: "class-name", required: false, many: false },
    { pagePropertySlug: "game-system", required: false, many: false },
    { pagePropertySlug: "prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build is true as of the chapter the build names.",
    },
    {
      invariantKind: "departure",
      statement: "A build carries the rules a reader reads the build against.",
    },
    {
      invariantKind: "departure",
      statement: "The words a build carries are the story's rather than akasha's own.",
    },
  ],
} as const satisfies PageType
