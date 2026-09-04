import type { PageType } from "@akasha/pages-system/page-type"
import type { ExternalId } from "../../collection-system/collection-externals/properties/external-id.text-property.ts"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
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
  genre?: readonly Genre[]
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

export const game = {
  id: "01a0673e-1000-7005-9766-e0a425ef3a66",
  pageTypeSlug: "page-type",
  slug: "game",
  definition: "a story Alan plays through with a persona running the other side",
  pluralSlug: "games",
  extendsSlug: "page-type/collection",
  detailConfig: {
    display: "game",
  },
  partSlugs: [
    "boolean-property/maintains-design",
    "boolean-property/maintains-lore",
    "boolean-property/requires-per-turn-gate",
    "file-property/config",
    "file-property/design-entries",
    "file-property/display-config",
    "file-property/entities",
    "file-property/game-characters",
    "file-property/gm-context",
    "file-property/lore-entries",
    "file-property/narrative-continuity",
    "file-property/resolution-mechanism",
    "file-property/rolls",
    "file-property/rulebook",
    "file-property/states",
    "file-property/tower-floors",
    "file-property/tower-sessions",
    "file-property/turns",
    "number-property/current-session",
    "select-property/controlled-entity-kind",
    "select-property/mechanics-weight",
    "select-property/resolution",
    "text-property/coordinator-agent",
    "text-property/game-engine",
    "text-property/genre",
    "text-property/premise",
    "text-property/reader-framing",
    "text-property/themes",
    "text-property/tone",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "external-id", required: true, many: false },
    { pagePropertySlug: "game-engine", required: true, many: false },
    { pagePropertySlug: "coordinator-agent", required: false, many: false },
    { pagePropertySlug: "controlled-entity-kind", required: false, many: false },
    { pagePropertySlug: "mechanics-weight", required: false, many: false },
    { pagePropertySlug: "resolution", required: false, many: false },
    { pagePropertySlug: "current-session", required: false, many: false },
    { pagePropertySlug: "premise", required: false, many: false },
    { pagePropertySlug: "tone", required: false, many: false },
    { pagePropertySlug: "reader-framing", required: false, many: false },
    { pagePropertySlug: "genre", required: false, many: true, max: null },
    { pagePropertySlug: "themes", required: false, many: false },
    { pagePropertySlug: "maintains-lore", required: false, many: false },
    { pagePropertySlug: "maintains-design", required: false, many: false },
    { pagePropertySlug: "requires-per-turn-gate", required: false, many: false },
    { pagePropertySlug: "config", required: false, many: false },
    { pagePropertySlug: "display-config", required: false, many: false },
    { pagePropertySlug: "gm-context", required: false, many: false },
    { pagePropertySlug: "narrative-continuity", required: false, many: false },
    { pagePropertySlug: "rulebook", required: false, many: false },
    { pagePropertySlug: "resolution-mechanism", required: false, many: false },
    { pagePropertySlug: "turns", required: false, many: false },
    { pagePropertySlug: "entities", required: false, many: false },
    { pagePropertySlug: "states", required: false, many: false },
    { pagePropertySlug: "rolls", required: false, many: false },
    { pagePropertySlug: "game-characters", required: false, many: false },
    { pagePropertySlug: "lore-entries", required: false, many: false },
    { pagePropertySlug: "design-entries", required: false, many: false },
    { pagePropertySlug: "tower-floors", required: false, many: false },
    { pagePropertySlug: "tower-sessions", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a game is made of sits in files beside the game's page rather than inside the page.",
    },
    {
      invariantKind: "departure",
      statement: "One row of such a file is one json object on one line.",
    },
    {
      invariantKind: "departure",
      statement: "A game's rows are committed.",
    },
    {
      invariantKind: "departure",
      statement: "A game names the agent running the side Alan does not play.",
    },
    {
      invariantKind: "departure",
      statement: "A game weighing its mechanics at zero settles an action by no formula.",
    },
    {
      invariantKind: "departure",
      statement: "A game's premise and tone are Alan's own words for the game Alan asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A game is keyed on its external id.",
    },
    {
      invariantKind: "departure",
      statement: "A game's rulebook settles what an action does.",
    },
    {
      invariantKind: "departure",
      statement: "A game character is one a player runs rather than one the game runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entity's sheet is shaped by the game's rulebook rather than by the row carrying the sheet.",
    },
    {
      invariantKind: "departure",
      statement: "An entity is held back until the play reaches the turn its reveal gate names.",
    },
    {
      invariantKind: "departure",
      statement: "A turn is numbered within its game.",
    },
    {
      invariantKind: "departure",
      statement: "A turn's number orders the play.",
    },
    {
      invariantKind: "departure",
      statement: "A state holds what has been revealed rather than everything the game knows.",
    },
    {
      invariantKind: "departure",
      statement: "A roll carries the hash of the previous roll.",
    },
    {
      invariantKind: "departure",
      statement: "A seed is settled before its roll is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A lore entry cites the turn the entry was drawn from.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry superseding an earlier one names the entry superseded rather than replacing it.",
    },
    {
      invariantKind: "departure",
      statement: "A design entry is settled before the play using that entry.",
    },
    {
      invariantKind: "departure",
      statement: "What the play discloses beats what the design intended.",
    },
  ],
} as const satisfies PageType
