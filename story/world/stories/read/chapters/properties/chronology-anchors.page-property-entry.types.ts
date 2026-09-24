import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { AnchorBeat } from "akasha/story/world/stories/read/chapters/properties/anchor-beat.number-property.types.ts"
import type { AnchorChapter } from "akasha/story/world/stories/read/chapters/properties/anchor-chapter.text-property.types.ts"
import type { AnchorClaimedBy } from "akasha/story/world/stories/read/chapters/properties/anchor-claimed-by.text-property.types.ts"
import type { AnchorDirection } from "akasha/story/world/stories/read/chapters/properties/anchor-direction.select-property.types.ts"
import type { AnchorKind } from "akasha/story/world/stories/read/chapters/properties/anchor-kind.select-property.types.ts"
import type { AnchorLexeme } from "akasha/story/world/stories/read/chapters/properties/anchor-lexeme.text-property.types.ts"
import type { AnchorReference } from "akasha/story/world/stories/read/chapters/properties/anchor-reference.text-property.types.ts"
import type { AnchorStanding } from "akasha/story/world/stories/read/chapters/properties/anchor-standing.select-property.types.ts"
import type { AnchorTier } from "akasha/story/world/stories/read/chapters/properties/anchor-tier.select-property.types.ts"
import type { AnchorVolume } from "akasha/story/world/stories/read/chapters/properties/anchor-volume.number-property.types.ts"

export type ChronologyAnchors = "jsonl"

export type ChronologyAnchorsRow = {
  id: Id
  kind: AnchorKind
  tier: AnchorTier
  lexeme: AnchorLexeme
  reference: AnchorReference
  standing: AnchorStanding
  chapter: AnchorChapter
  direction?: AnchorDirection
  claimedBy?: AnchorClaimedBy
  volume?: AnchorVolume
  beat?: AnchorBeat
}
