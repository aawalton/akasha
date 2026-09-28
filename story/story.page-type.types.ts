import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { PageDomain } from "akasha/domain/properties/page-domain.relation-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ChapterBreak } from "akasha/story/properties/chapter-break.text-property.types.ts"
import type { CoordinatorAgent } from "akasha/story/properties/coordinator-agent.text-property.types.ts"
import type { Panels } from "akasha/story/properties/panels.multi-relation-property.types.ts"
import type { PhaseTimings } from "akasha/story/properties/phase-timings.file-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/world/stories/played/properties/world.relation-property.types.ts"

export type Story = Collection & {
  title: Title
  world?: World
  prose?: Prose
  chapterBreak?: ChapterBreak
  coordinatorAgent?: CoordinatorAgent
  domain?: PageDomain
  panels?: Panels
  phaseTimings?: PhaseTimings
}
