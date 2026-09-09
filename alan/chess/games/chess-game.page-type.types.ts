import type { ExternalId } from "../../../collections/externals/properties/external-id.text-property.ts"
import type { Page } from "../../../pages/page.page-type.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { PlayedAt } from "../../track/days/properties/played-at.instant-property.ts"
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
