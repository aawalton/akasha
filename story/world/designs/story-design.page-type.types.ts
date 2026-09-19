import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ArcStructure } from "akasha/story/world/designs/properties/arc-structure.file-property.types.ts"
import type { BookTitle } from "akasha/story/world/designs/properties/book-title.text-property.types.ts"
import type { ChapterNumbering } from "akasha/story/world/designs/properties/chapter-numbering.text-property.types.ts"
import type { Continuity } from "akasha/story/world/designs/properties/continuity.text-property.types.ts"
import type { DesignAuthor } from "akasha/story/world/designs/properties/design-author.text-property.types.ts"
import type { DesignSource } from "akasha/story/world/designs/properties/design-source.text-property.types.ts"
import type { DesignSystem } from "akasha/story/world/designs/properties/design-system.text-property.types.ts"
import type { DesignVersion } from "akasha/story/world/designs/properties/design-version.text-property.types.ts"
import type { DungeonNature } from "akasha/story/world/designs/properties/dungeon-nature.text-property.types.ts"
import type { GbwwReadings } from "akasha/story/world/designs/properties/gbww-readings.text-property.types.ts"
import type { MemoryDistribution } from "akasha/story/world/designs/properties/memory-distribution.text-property.types.ts"
import type { Narrator } from "akasha/story/world/designs/properties/narrator.text-property.types.ts"
import type { SeriesName } from "akasha/story/world/designs/properties/series-name.text-property.types.ts"
import type { SeriesStatus } from "akasha/story/world/designs/properties/series-status.text-property.types.ts"
import type { StoryGenre } from "akasha/story/world/designs/properties/story-genre.text-property.types.ts"
import type { StoryPremise } from "akasha/story/world/designs/properties/story-premise.file-property.types.ts"
import type { StoryReaderFraming } from "akasha/story/world/designs/properties/story-reader-framing.text-property.types.ts"
import type { StoryThemes } from "akasha/story/world/designs/properties/story-themes.text-property.types.ts"
import type { StoryTone } from "akasha/story/world/designs/properties/story-tone.text-property.types.ts"
import type { Structure } from "akasha/story/world/designs/properties/structure.text-property.types.ts"
import type { TimelineDistribution } from "akasha/story/world/designs/properties/timeline-distribution.text-property.types.ts"
import type { VisualStyle } from "akasha/story/world/designs/properties/visual-style.text-property.types.ts"
import type { WritingPhilosophy } from "akasha/story/world/designs/properties/writing-philosophy.text-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/world/stories/played/properties/world.relation-property.types.ts"

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
