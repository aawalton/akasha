import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"

export type VoiceBrief = Page & {
  prose: Prose
}
