import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { ChapterSlug } from "akasha/story/world/mechanics/properties/chapter-slug.text-property.types.ts"
import type { Claimed } from "akasha/story/world/mechanics/properties/claimed.boolean-property.types.ts"
import type { ClaimedBySlug } from "akasha/story/world/mechanics/properties/claimed-by-slug.text-property.types.ts"
import type { EffectClaimed } from "akasha/story/world/mechanics/properties/effect-claimed.boolean-property.types.ts"
import type { EffectQuote } from "akasha/story/world/mechanics/properties/effect-quote.text-property.types.ts"
import type { FromSlug } from "akasha/story/world/mechanics/properties/from-slug.text-property.types.ts"
import type { HolderQuote } from "akasha/story/world/mechanics/properties/holder-quote.text-property.types.ts"
import type { HolderSlug } from "akasha/story/world/mechanics/properties/holder-slug.text-property.types.ts"
import type { Paragraph } from "akasha/story/world/mechanics/properties/paragraph.number-property.types.ts"
import type { ReferenceEvent } from "akasha/story/world/mechanics/properties/reference-event.text-property.types.ts"
import type { ReferenceKind } from "akasha/story/world/mechanics/properties/reference-kind.text-property.types.ts"
import type { ReferenceLevel } from "akasha/story/world/mechanics/properties/reference-level.number-property.types.ts"
import type { ToSlug } from "akasha/story/world/mechanics/properties/to-slug.text-property.types.ts"
import type { Wording } from "akasha/story/world/mechanics/properties/wording.text-property.types.ts"

export type References = "jsonl"

export type ReferencesRow = {
  id: Id
  chapterSlug: ChapterSlug
  paragraph: Paragraph
  wording: Wording
  event: ReferenceEvent
  holderSlug?: HolderSlug
  holderQuote?: HolderQuote
  effectQuote?: EffectQuote
  claimed?: Claimed
  claimedBySlug?: ClaimedBySlug
  effectClaimed?: EffectClaimed
  kind?: ReferenceKind
  level?: ReferenceLevel
  fromSlug?: FromSlug
  toSlug?: ToSlug
}
