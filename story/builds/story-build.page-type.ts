import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { ChapterNumber } from "../wiki-entries/properties/chapter-number.number-property.ts"
import type { BuildLevel } from "./properties/build-level.number-property.ts"
import type { ClassName } from "./properties/class-name.text-property.ts"
import type { GameSystem } from "./properties/game-system.text-property.ts"

export type StoryBuild = Page & {
  title: Title
  worldSlug?: World
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
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: ["number-property/build-level", "text-property/class-name", "text-property/game-system"],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "relation-property/world", required: false, many: false },
    { pagePropertySlug: "number-property/chapter-number", required: false, many: false },
    { pagePropertySlug: "number-property/build-level", required: false, many: false },
    { pagePropertySlug: "text-property/class-name", required: false, many: false },
    { pagePropertySlug: "text-property/game-system", required: false, many: false },
    { pagePropertySlug: "file-property/prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build is true as of the chapter the build names.",
    },
    {
      invariantKind: "departure",
      statement: "A build has the rules a reader reads the build against.",
    },
    {
      invariantKind: "departure",
      statement: "The words a build carries are the story's rather than akasha's own.",
    },
  ],
} as const satisfies PageType
