import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { ExternalId } from "akasha/alan/collections/externals/properties/external-id.text-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { Config } from "akasha/story/games/properties/config.file-property.ts"
import type { ControlledEntityKind } from "akasha/story/games/properties/controlled-entity-kind.select-property.types.ts"
import type { CoordinatorAgent } from "akasha/story/games/properties/coordinator-agent.text-property.types.ts"
import type { CurrentSession } from "akasha/story/games/properties/current-session.number-property.types.ts"
import type { DesignEntries } from "akasha/story/games/properties/design-entries.file-property.ts"
import type { DisplayConfig } from "akasha/story/games/properties/display-config.file-property.ts"
import type { Entities } from "akasha/story/games/properties/entities.file-property.ts"
import type { GameCharacters } from "akasha/story/games/properties/game-characters.file-property.ts"
import type { GameEngine } from "akasha/story/games/properties/game-engine.text-property.types.ts"
import type { Genre } from "akasha/story/games/properties/genre.text-property.types.ts"
import type { GmContext } from "akasha/story/games/properties/gm-context.file-property.ts"
import type { LoreEntries } from "akasha/story/games/properties/lore-entries.file-property.ts"
import type { MaintainsDesign } from "akasha/story/games/properties/maintains-design.boolean-property.types.ts"
import type { MaintainsLore } from "akasha/story/games/properties/maintains-lore.boolean-property.types.ts"
import type { MechanicsWeight } from "akasha/story/games/properties/mechanics-weight.select-property.types.ts"
import type { NarrativeContinuity } from "akasha/story/games/properties/narrative-continuity.file-property.ts"
import type { Premise } from "akasha/story/games/properties/premise.text-property.types.ts"
import type { ReaderFraming } from "akasha/story/games/properties/reader-framing.text-property.types.ts"
import type { RequiresPerTurnGate } from "akasha/story/games/properties/requires-per-turn-gate.boolean-property.types.ts"
import type { Resolution } from "akasha/story/games/properties/resolution.select-property.types.ts"
import type { ResolutionMechanism } from "akasha/story/games/properties/resolution-mechanism.file-property.ts"
import type { Rolls } from "akasha/story/games/properties/rolls.file-property.ts"
import type { Rulebook } from "akasha/story/games/properties/rulebook.file-property.ts"
import type { States } from "akasha/story/games/properties/states.file-property.ts"
import type { Themes } from "akasha/story/games/properties/themes.text-property.types.ts"
import type { Tone } from "akasha/story/games/properties/tone.text-property.types.ts"
import type { TowerFloors } from "akasha/story/games/properties/tower-floors.file-property.ts"
import type { TowerSessions } from "akasha/story/games/properties/tower-sessions.file-property.ts"
import type { Turns } from "akasha/story/games/properties/turns.file-property.ts"

export type Game = Collection & {
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
  maintainsLore?: MaintainsLore
  maintainsDesign?: MaintainsDesign
  requiresPerTurnGate?: RequiresPerTurnGate
  config?: Config
  displayConfig?: DisplayConfig
  gmContext?: GmContext
  narrativeContinuity?: NarrativeContinuity
  rulebook?: Rulebook
  resolutionMechanism?: ResolutionMechanism
  turns?: Turns
  entities?: Entities
  states?: States
  rolls?: Rolls
  characters?: GameCharacters
  loreEntries?: LoreEntries
  designEntries?: DesignEntries
  towerFloors?: TowerFloors
  towerSessions?: TowerSessions
}
