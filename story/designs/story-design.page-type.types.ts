import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { ArcStructure } from "akasha/story/designs/properties/arc-structure.file-property.ts"
import type { BookTitle } from "akasha/story/designs/properties/book-title.text-property.ts"
import type { ChapterNumbering } from "akasha/story/designs/properties/chapter-numbering.text-property.ts"
import type { Continuity } from "akasha/story/designs/properties/continuity.text-property.ts"
import type { DesignAuthor } from "akasha/story/designs/properties/design-author.text-property.ts"
import type { DesignSource } from "akasha/story/designs/properties/design-source.text-property.ts"
import type { DesignSystem } from "akasha/story/designs/properties/design-system.text-property.ts"
import type { DesignVersion } from "akasha/story/designs/properties/design-version.text-property.ts"
import type { DungeonNature } from "akasha/story/designs/properties/dungeon-nature.text-property.ts"
import type { GbwwReadings } from "akasha/story/designs/properties/gbww-readings.text-property.ts"
import type { MemoryDistribution } from "akasha/story/designs/properties/memory-distribution.text-property.ts"
import type { Narrator } from "akasha/story/designs/properties/narrator.text-property.ts"
import type { SeriesName } from "akasha/story/designs/properties/series-name.text-property.ts"
import type { SeriesStatus } from "akasha/story/designs/properties/series-status.text-property.ts"
import type { StoryGenre } from "akasha/story/designs/properties/story-genre.text-property.ts"
import type { StoryPremise } from "akasha/story/designs/properties/story-premise.file-property.ts"
import type { StoryReaderFraming } from "akasha/story/designs/properties/story-reader-framing.text-property.ts"
import type { StoryThemes } from "akasha/story/designs/properties/story-themes.text-property.ts"
import type { StoryTone } from "akasha/story/designs/properties/story-tone.text-property.ts"
import type { Structure } from "akasha/story/designs/properties/structure.text-property.ts"
import type { TimelineDistribution } from "akasha/story/designs/properties/timeline-distribution.text-property.ts"
import type { VisualStyle } from "akasha/story/designs/properties/visual-style.text-property.ts"
import type { WritingPhilosophy } from "akasha/story/designs/properties/writing-philosophy.text-property.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.ts"
import type { World } from "akasha/story/stories-played/properties/world.relation-property.types.ts"

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
