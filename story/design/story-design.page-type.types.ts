import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ArcStructure } from "akasha/story/design/properties/arc-structure.file-property.types.ts"
import type { BookTitle } from "akasha/story/design/properties/book-title.text-property.types.ts"
import type { ChapterNumbering } from "akasha/story/design/properties/chapter-numbering.text-property.types.ts"
import type { Continuity } from "akasha/story/design/properties/continuity.text-property.types.ts"
import type { DesignAuthor } from "akasha/story/design/properties/design-author.text-property.types.ts"
import type { DesignSource } from "akasha/story/design/properties/design-source.text-property.types.ts"
import type { DesignSystem } from "akasha/story/design/properties/design-system.text-property.types.ts"
import type { DesignVersion } from "akasha/story/design/properties/design-version.text-property.types.ts"
import type { DungeonNature } from "akasha/story/design/properties/dungeon-nature.text-property.types.ts"
import type { GbwwReadings } from "akasha/story/design/properties/gbww-readings.text-property.types.ts"
import type { MemoryDistribution } from "akasha/story/design/properties/memory-distribution.text-property.types.ts"
import type { Narrator } from "akasha/story/design/properties/narrator.text-property.types.ts"
import type { SeriesName } from "akasha/story/design/properties/series-name.text-property.types.ts"
import type { SeriesStatus } from "akasha/story/design/properties/series-status.text-property.types.ts"
import type { StoryGenre } from "akasha/story/design/properties/story-genre.text-property.types.ts"
import type { StoryPremise } from "akasha/story/design/properties/story-premise.file-property.types.ts"
import type { StoryReaderFraming } from "akasha/story/design/properties/story-reader-framing.text-property.types.ts"
import type { StoryThemes } from "akasha/story/design/properties/story-themes.text-property.types.ts"
import type { StoryTone } from "akasha/story/design/properties/story-tone.text-property.types.ts"
import type { Structure } from "akasha/story/design/properties/structure.text-property.types.ts"
import type { TimelineDistribution } from "akasha/story/design/properties/timeline-distribution.text-property.types.ts"
import type { VisualStyle } from "akasha/story/design/properties/visual-style.text-property.types.ts"
import type { WritingPhilosophy } from "akasha/story/design/properties/writing-philosophy.text-property.types.ts"
import type { Prose } from "akasha/story/played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/played/properties/world.relation-property.types.ts"

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
