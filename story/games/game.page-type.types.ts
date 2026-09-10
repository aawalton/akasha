import type { Collection } from "../../collections/collection.page-type.types.ts"
import type { ExternalId } from "../../collections/externals/properties/external-id.text-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Config } from "./properties/config.file-property.ts"
import type { ControlledEntityKind } from "./properties/controlled-entity-kind.select-property.ts"
import type { CoordinatorAgent } from "./properties/coordinator-agent.text-property.ts"
import type { CurrentSession } from "./properties/current-session.number-property.ts"
import type { DesignEntries } from "./properties/design-entries.file-property.ts"
import type { DisplayConfig } from "./properties/display-config.file-property.ts"
import type { Entities } from "./properties/entities.file-property.ts"
import type { GameCharacters } from "./properties/game-characters.file-property.ts"
import type { GameEngine } from "./properties/game-engine.text-property.ts"
import type { Genre } from "./properties/genre.text-property.ts"
import type { GmContext } from "./properties/gm-context.file-property.ts"
import type { LoreEntries } from "./properties/lore-entries.file-property.ts"
import type { MaintainsDesign } from "./properties/maintains-design.boolean-property.ts"
import type { MaintainsLore } from "./properties/maintains-lore.boolean-property.ts"
import type { MechanicsWeight } from "./properties/mechanics-weight.select-property.ts"
import type { NarrativeContinuity } from "./properties/narrative-continuity.file-property.ts"
import type { Premise } from "./properties/premise.text-property.ts"
import type { ReaderFraming } from "./properties/reader-framing.text-property.ts"
import type { RequiresPerTurnGate } from "./properties/requires-per-turn-gate.boolean-property.ts"
import type { Resolution } from "./properties/resolution.select-property.ts"
import type { ResolutionMechanism } from "./properties/resolution-mechanism.file-property.ts"
import type { Rolls } from "./properties/rolls.file-property.ts"
import type { Rulebook } from "./properties/rulebook.file-property.ts"
import type { States } from "./properties/states.file-property.ts"
import type { Themes } from "./properties/themes.text-property.ts"
import type { Tone } from "./properties/tone.text-property.ts"
import type { TowerFloors } from "./properties/tower-floors.file-property.ts"
import type { TowerSessions } from "./properties/tower-sessions.file-property.ts"
import type { Turns } from "./properties/turns.file-property.ts"

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
