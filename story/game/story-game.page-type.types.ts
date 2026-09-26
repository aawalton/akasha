import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { ExternalId } from "akasha/alan/collection/external/properties/external-id.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { CardVocabulary } from "akasha/story/game/properties/card-vocabulary.text-property.types.ts"
import type { ChapterBreak } from "akasha/story/game/properties/chapter-break.text-property.types.ts"
import type { ControlledEntityKind } from "akasha/story/game/properties/controlled-entity-kind.select-property.types.ts"
import type { CoordinatorAgent } from "akasha/story/game/properties/coordinator-agent.text-property.types.ts"
import type { CurrentSession } from "akasha/story/game/properties/current-session.number-property.types.ts"
import type { DisplayConfig } from "akasha/story/game/properties/display-config.file-property.types.ts"
import type { GameAttributes } from "akasha/story/game/properties/game-attributes.multi-relation-property.types.ts"
import type { GameDefaultDice } from "akasha/story/game/properties/game-default-dice.relation-property.types.ts"
import type { GameEngine } from "akasha/story/game/properties/game-engine.text-property.types.ts"
import type { GameMechanics } from "akasha/story/game/properties/game-mechanics.multi-relation-property.types.ts"
import type { Genre } from "akasha/story/game/properties/genre.text-property.types.ts"
import type { MechanicsWeight } from "akasha/story/game/properties/mechanics-weight.select-property.types.ts"
import type { PlayerEntity } from "akasha/story/game/properties/player-entity.relation-property.types.ts"
import type { Premise } from "akasha/story/game/properties/premise.text-property.types.ts"
import type { ReaderFraming } from "akasha/story/game/properties/reader-framing.text-property.types.ts"
import type { Resolution } from "akasha/story/game/properties/resolution.select-property.types.ts"
import type { ResolutionMechanism } from "akasha/story/game/properties/resolution-mechanism.file-property.types.ts"
import type { Themes } from "akasha/story/game/properties/themes.text-property.types.ts"
import type { Tone } from "akasha/story/game/properties/tone.text-property.types.ts"

export type StoryGame = Collection & {
  title: Title
  externalId: ExternalId
  gameEngine: GameEngine
  coordinatorAgent?: CoordinatorAgent
  controlledEntityKind?: ControlledEntityKind
  mechanicsWeight?: MechanicsWeight
  resolution?: Resolution
  currentSession?: CurrentSession
  premise?: Premise
  tone?: Tone
  readerFraming?: ReaderFraming
  genre?: Genre
  themes?: Themes
  displayConfig?: DisplayConfig
  resolutionMechanism?: ResolutionMechanism
  mechanics?: GameMechanics
  attributes?: GameAttributes
  cardVocabulary?: CardVocabulary
  defaultDice?: GameDefaultDice
  player?: PlayerEntity
  chapterBreak?: ChapterBreak
}
