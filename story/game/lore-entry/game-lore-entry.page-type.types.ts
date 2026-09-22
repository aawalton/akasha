import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { BeatOrdinal } from "akasha/story/game/lore-entry/properties/beat-ordinal.number-property.types.ts"
import type { CitedQuote } from "akasha/story/game/lore-entry/properties/cited-quote.text-property.types.ts"
import type { LoreAttribute } from "akasha/story/game/lore-entry/properties/lore-attribute.text-property.types.ts"
import type { LoreKind } from "akasha/story/game/lore-entry/properties/lore-kind.text-property.types.ts"
import type { LoreSaid } from "akasha/story/game/lore-entry/properties/lore-said.text-property.types.ts"
import type { LoreSubject } from "akasha/story/game/lore-entry/properties/lore-subject.text-property.types.ts"
import type { QuoteSpeaker } from "akasha/story/game/lore-entry/properties/quote-speaker.text-property.types.ts"
import type { SourceTurn } from "akasha/story/game/lore-entry/properties/source-turn.number-property.types.ts"
import type { SupersededLore } from "akasha/story/game/lore-entry/properties/superseded-lore.relation-property.types.ts"
import type { ThreadStatus } from "akasha/story/game/lore-entry/properties/thread-status.text-property.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"

export type GameLoreEntry = Page & {
  title: Title
  game: HoldingGame
  kind: LoreKind
  subject: LoreSubject
  said: LoreSaid
  turn: SourceTurn
  quote?: CitedQuote
  attribute?: LoreAttribute
  status?: ThreadStatus
  ordinal?: BeatOrdinal
  speaker?: QuoteSpeaker
  supersedes?: SupersededLore
}
