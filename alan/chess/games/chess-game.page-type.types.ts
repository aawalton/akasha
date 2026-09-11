import type { ChessBlack } from "akasha/alan/chess/games/properties/chess-black.text-property.types.ts"
import type { ChessCollection } from "akasha/alan/chess/games/properties/chess-collection.text-property.types.ts"
import type { ChessOutcome } from "akasha/alan/chess/games/properties/chess-outcome.select-property.types.ts"
import type { ChessResult } from "akasha/alan/chess/games/properties/chess-result.select-property.types.ts"
import type { ChessSource } from "akasha/alan/chess/games/properties/chess-source.text-property.types.ts"
import type { ChessSpeed } from "akasha/alan/chess/games/properties/chess-speed.select-property.types.ts"
import type { ChessVariant } from "akasha/alan/chess/games/properties/chess-variant.select-property.types.ts"
import type { ChessWhite } from "akasha/alan/chess/games/properties/chess-white.text-property.types.ts"
import type { ChessWinner } from "akasha/alan/chess/games/properties/chess-winner.select-property.types.ts"
import type { Fen } from "akasha/alan/chess/games/properties/fen.text-property.types.ts"
import type { Handle } from "akasha/alan/chess/games/properties/handle.text-property.types.ts"
import type { Lesson } from "akasha/alan/chess/games/properties/lesson.text-property.types.ts"
import type { OpeningEco } from "akasha/alan/chess/games/properties/opening-eco.text-property.types.ts"
import type { OpeningName } from "akasha/alan/chess/games/properties/opening-name.text-property.types.ts"
import type { Pgn } from "akasha/alan/chess/games/properties/pgn.file-property.types.ts"
import type { PlayerColor } from "akasha/alan/chess/games/properties/player-color.select-property.types.ts"
import type { Ply } from "akasha/alan/chess/games/properties/ply.number-property.types.ts"
import type { Rated } from "akasha/alan/chess/games/properties/rated.boolean-property.types.ts"
import type { SourceGameId } from "akasha/alan/chess/games/properties/source-game-id.text-property.types.ts"
import type { TimeControl } from "akasha/alan/chess/games/properties/time-control.text-property.types.ts"
import type { ExternalId } from "akasha/alan/collections/externals/properties/external-id.text-property.types.ts"
import type { PlayedAt } from "akasha/alan/track/daily/days/properties/played-at.instant-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

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
