import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { ArcStructure } from "./properties/arc-structure.file-property.ts"
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
import type { StoryPremise } from "./properties/story-premise.file-property.ts"
import type { StoryReaderFraming } from "./properties/story-reader-framing.text-property.ts"
import type { StoryThemes } from "./properties/story-themes.text-property.ts"
import type { StoryTone } from "./properties/story-tone.text-property.ts"
import type { Structure } from "./properties/structure.text-property.ts"
import type { TimelineDistribution } from "./properties/timeline-distribution.text-property.ts"
import type { VisualStyle } from "./properties/visual-style.text-property.ts"
import type { WritingPhilosophy } from "./properties/writing-philosophy.text-property.ts"

export type StoryDesign = Page & {
  title: Title
  world?: World
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
