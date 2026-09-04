import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { ExternalId } from "../../../collection-system/collection-externals/properties/external-id.text-property.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { PlayedAt } from "../../tracking/daily/eso-days/properties/played-at.instant-property.ts"
import type { ChessBlack } from "./properties/chess-black.text-property.ts"
import type { ChessCollection } from "./properties/chess-collection.text-property.ts"
import type { ChessOutcome } from "./properties/chess-outcome.select-property.ts"
import type { ChessResult } from "./properties/chess-result.select-property.ts"
import type { ChessSource } from "./properties/chess-source.text-property.ts"
import type { ChessSpeed } from "./properties/chess-speed.select-property.ts"
import type { ChessVariant } from "./properties/chess-variant.select-property.ts"
import type { ChessWhite } from "./properties/chess-white.text-property.ts"
import type { ChessWinner } from "./properties/chess-winner.select-property.ts"
import type { Fen } from "./properties/fen.text-property.ts"
import type { Handle } from "./properties/handle.text-property.ts"
import type { Lesson } from "./properties/lesson.text-property.ts"
import type { OpeningEco } from "./properties/opening-eco.text-property.ts"
import type { OpeningName } from "./properties/opening-name.text-property.ts"
import type { Pgn } from "./properties/pgn.file-property.ts"
import type { PlayerColor } from "./properties/player-color.select-property.ts"
import type { Ply } from "./properties/ply.number-property.ts"
import type { Rated } from "./properties/rated.boolean-property.ts"
import type { SourceGameId } from "./properties/source-game-id.text-property.ts"
import type { TimeControl } from "./properties/time-control.text-property.ts"

export type ChessGame = Page & {
  title: Title
  externalId: ExternalId
  white: ChessWhite
  black: ChessBlack
  playedAt: PlayedAt
  rated: Rated
  variant: ChessVariant
  speed: ChessSpeed
  result: ChessResult
  winner: ChessWinner
  ply: Ply
  source?: ChessSource
  sourceGameId?: SourceGameId
  handle?: Handle
  openingName?: OpeningName
  openingEco?: OpeningEco
  lesson?: Lesson
  collection?: ChessCollection
  fen?: Fen
  timeControl?: TimeControl
  playerColor?: PlayerColor
  outcome?: ChessOutcome
  pgn?: Pgn
}

export const chessGame = {
  id: "01a06582-bd62-7ffe-a236-e510097e9b91",
  pageTypeSlug: "page-type",
  slug: "chess-game",
  definition: "one game of chess played out to its end",
  pluralSlug: "chess-games",
  extendsSlug: ["page-type/page"],
  runsTabooCheck: false,
  detailConfig: {
    display: "chess-review",
  },
  partSlugs: [
    "boolean-property/rated",
    "file-property/pgn",
    "instant-property/played-at",
    "number-property/ply",
    "select-property/chess-outcome",
    "select-property/chess-result",
    "select-property/chess-speed",
    "select-property/chess-variant",
    "select-property/chess-winner",
    "select-property/player-color",
    "text-property/chess-black",
    "text-property/chess-collection",
    "text-property/chess-source",
    "text-property/chess-white",
    "text-property/fen",
    "text-property/handle",
    "text-property/lesson",
    "text-property/opening-eco",
    "text-property/opening-name",
    "text-property/source-game-id",
    "text-property/time-control",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "external-id", required: true, many: false },
    { pagePropertySlug: "chess-white", required: true, many: false },
    { pagePropertySlug: "chess-black", required: true, many: false },
    { pagePropertySlug: "played-at", required: true, many: false },
    { pagePropertySlug: "rated", required: true, many: false },
    { pagePropertySlug: "chess-variant", required: true, many: false },
    { pagePropertySlug: "chess-speed", required: true, many: false },
    { pagePropertySlug: "chess-result", required: true, many: false },
    { pagePropertySlug: "chess-winner", required: true, many: false },
    { pagePropertySlug: "ply", required: true, many: false },
    { pagePropertySlug: "chess-source", required: false, many: false },
    { pagePropertySlug: "source-game-id", required: false, many: false },
    { pagePropertySlug: "handle", required: false, many: false },
    { pagePropertySlug: "opening-name", required: false, many: false },
    { pagePropertySlug: "opening-eco", required: false, many: false },
    { pagePropertySlug: "lesson", required: false, many: false },
    { pagePropertySlug: "chess-collection", required: false, many: false },
    { pagePropertySlug: "fen", required: false, many: false },
    { pagePropertySlug: "time-control", required: false, many: false },
    { pagePropertySlug: "player-color", required: false, many: false },
    { pagePropertySlug: "chess-outcome", required: false, many: false },
    { pagePropertySlug: "pgn", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A game's moves are beside the page rather than in the page.",
    },
    {
      invariantKind: "departure",
      statement: "A game Alan played names the side Alan took and how the game went for Alan.",
    },
    {
      invariantKind: "departure",
      statement: "A game nobody here played names the source the game was taken from.",
    },
    {
      invariantKind: "departure",
      statement: "A drawn game names `draw` as its winner.",
    },
    {
      invariantKind: "departure",
      statement: "A game opening from a position rather than the first rank names that position.",
    },
    {
      invariantKind: "departure",
      statement: "The names and prose here are the record's rather than akasha's own.",
    },
  ],
} as const satisfies PageType
