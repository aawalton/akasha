import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { ClaimField } from "akasha/story/world/characters/properties/claim-field.text-property.types.ts"
import type { ClaimValue } from "akasha/story/world/characters/properties/claim-value.text-property.types.ts"
import type { ClaimedBy } from "akasha/story/world/characters/properties/claimed-by.text-property.types.ts"
import type { Epistemic } from "akasha/story/world/characters/properties/epistemic.text-property.types.ts"
import type { SourceChapter } from "akasha/story/world/characters/properties/source-chapter.text-property.types.ts"
import type { ChapterSlug } from "akasha/story/world/mechanics/properties/chapter-slug.text-property.types.ts"

export type CharacterClaims = "jsonl"

export type CharacterClaimsRow = {
  id: Id
  chapterSlug: ChapterSlug
  claimField: ClaimField
  claimValue: ClaimValue
  epistemic: Epistemic
  claimedBy?: ClaimedBy
  sourceChapter?: SourceChapter
}
