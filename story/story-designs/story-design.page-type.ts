import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { WorldSlug } from "../stories-played/properties/world-slug.relation-property.ts"
import type { ArcStructure } from "./properties/arc-structure.text-property.ts"
import type { BookTitle } from "./properties/book-title.text-property.ts"
import type { ChapterNumbering } from "./properties/chapter-numbering.text-property.ts"
import type { Continuity } from "./properties/continuity.text-property.ts"
import type { DesignAuthor } from "./properties/design-author.text-property.ts"
import type { DesignSource } from "./properties/design-source.text-property.ts"
import type { DesignSystem } from "./properties/design-system.text-property.ts"
import type { DesignVersion } from "./properties/design-version.text-property.ts"
import type { DungeonNature } from "./properties/dungeon-nature.text-property.ts"
import type { GbwwReadings } from "./properties/gbww-readings.text-property.ts"
import type { MemoryDistribution } from "./properties/memory-distribution.text-property.ts"
import type { Narrator } from "./properties/narrator.text-property.ts"
import type { SeriesName } from "./properties/series-name.text-property.ts"
import type { SeriesStatus } from "./properties/series-status.text-property.ts"
import type { StoryGenre } from "./properties/story-genre.text-property.ts"
import type { StoryPremise } from "./properties/story-premise.text-property.ts"
import type { StoryReaderFraming } from "./properties/story-reader-framing.text-property.ts"
import type { StoryThemes } from "./properties/story-themes.text-property.ts"
import type { StoryTone } from "./properties/story-tone.text-property.ts"
import type { Structure } from "./properties/structure.text-property.ts"
import type { TimelineDistribution } from "./properties/timeline-distribution.text-property.ts"
import type { VisualStyle } from "./properties/visual-style.text-property.ts"
import type { WritingPhilosophy } from "./properties/writing-philosophy.text-property.ts"

export type StoryDesign = Page & {
  title: Title
  worldSlug?: WorldSlug
  premise?: StoryPremise
  genre?: StoryGenre
  tone?: StoryTone
  themes?: StoryThemes
  visualStyle?: VisualStyle
  readerFraming?: StoryReaderFraming
  narrator?: Narrator
  system?: DesignSystem
  arcStructure?: ArcStructure
  writingPhilosophy?: WritingPhilosophy
  structure?: Structure
  seriesName?: SeriesName
  seriesStatus?: SeriesStatus
  bookTitle?: BookTitle
  author?: DesignAuthor
  source?: DesignSource
  version?: DesignVersion
  chapterNumbering?: ChapterNumbering
  continuity?: Continuity
  memoryDistribution?: MemoryDistribution
  timelineDistribution?: TimelineDistribution
  dungeonNature?: DungeonNature
  gbwwReadings?: GbwwReadings
  prose?: Prose
}

export const storyDesign = {
  id: "01a06578-d638-7c98-b608-6c1fc38de0d7",
  pageTypeSlug: "page-type",
  slug: "story-design",
  definition: "how a story is meant to read, settled before the story is read",
  pluralSlug: "story-designs",
  extendsSlug: "page-type/page",
  runsTabooCheck: false,
  partSlugs: [
    "file-property/prose",
    "relation-property/world-slug",
    "text-property/story-premise",
    "text-property/story-genre",
    "text-property/story-tone",
    "text-property/story-themes",
    "text-property/visual-style",
    "text-property/story-reader-framing",
    "text-property/narrator",
    "text-property/design-system",
    "text-property/arc-structure",
    "text-property/writing-philosophy",
    "text-property/structure",
    "text-property/series-name",
    "text-property/series-status",
    "text-property/book-title",
    "text-property/design-author",
    "text-property/design-source",
    "text-property/design-version",
    "text-property/chapter-numbering",
    "text-property/continuity",
    "text-property/memory-distribution",
    "text-property/timeline-distribution",
    "text-property/dungeon-nature",
    "text-property/gbww-readings",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "world-slug", required: false, many: false },
    { pagePropertySlug: "story-premise", required: false, many: false },
    { pagePropertySlug: "story-genre", required: false, many: false },
    { pagePropertySlug: "story-tone", required: false, many: false },
    { pagePropertySlug: "story-themes", required: false, many: false },
    { pagePropertySlug: "visual-style", required: false, many: false },
    { pagePropertySlug: "story-reader-framing", required: false, many: false },
    { pagePropertySlug: "narrator", required: false, many: false },
    { pagePropertySlug: "design-system", required: false, many: false },
    { pagePropertySlug: "arc-structure", required: false, many: false },
    { pagePropertySlug: "writing-philosophy", required: false, many: false },
    { pagePropertySlug: "structure", required: false, many: false },
    { pagePropertySlug: "series-name", required: false, many: false },
    { pagePropertySlug: "series-status", required: false, many: false },
    { pagePropertySlug: "book-title", required: false, many: false },
    { pagePropertySlug: "design-author", required: false, many: false },
    { pagePropertySlug: "design-source", required: false, many: false },
    { pagePropertySlug: "design-version", required: false, many: false },
    { pagePropertySlug: "chapter-numbering", required: false, many: false },
    { pagePropertySlug: "continuity", required: false, many: false },
    { pagePropertySlug: "memory-distribution", required: false, many: false },
    { pagePropertySlug: "timeline-distribution", required: false, many: false },
    { pagePropertySlug: "dungeon-nature", required: false, many: false },
    { pagePropertySlug: "gbww-readings", required: false, many: false },
    { pagePropertySlug: "prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A design says how a story is meant to read rather than what the story says.",
    },
    {
      invariantKind: "departure",
      statement: "A story has one design.",
    },
    {
      invariantKind: "departure",
      statement: "A design states a property only where the design settled that property.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a design settled in prose too long for a property is carried beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "The words a design carries are the story's rather than akasha's own.",
    },
  ],
} as const satisfies PageType
