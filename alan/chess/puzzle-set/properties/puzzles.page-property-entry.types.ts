import type { Fen } from "akasha/alan/chess/game/properties/fen.text-property.types.ts"
import type { GameUrl } from "akasha/alan/chess/puzzle-set/properties/game-url.url-property.types.ts"
import type { NbPlays } from "akasha/alan/chess/puzzle-set/properties/nb-plays.number-property.types.ts"
import type { OpeningTags } from "akasha/alan/chess/puzzle-set/properties/opening-tags.text-property.types.ts"
import type { Popularity } from "akasha/alan/chess/puzzle-set/properties/popularity.number-property.types.ts"
import type { PuzzleId } from "akasha/alan/chess/puzzle-set/properties/puzzle-id.text-property.types.ts"
import type { PuzzleLicense } from "akasha/alan/chess/puzzle-set/properties/puzzle-license.text-property.types.ts"
import type { PuzzleMoves } from "akasha/alan/chess/puzzle-set/properties/puzzle-moves.text-property.types.ts"
import type { PuzzleRating } from "akasha/alan/chess/puzzle-set/properties/puzzle-rating.number-property.types.ts"
import type { PuzzleThemes } from "akasha/alan/chess/puzzle-set/properties/puzzle-themes.text-property.types.ts"
import type { RatingDeviation } from "akasha/alan/chess/puzzle-set/properties/rating-deviation.number-property.types.ts"
import type { Solved } from "akasha/alan/chess/puzzle-set/properties/solved.boolean-property.types.ts"
import type { SolverColor } from "akasha/alan/chess/puzzle-set/properties/solver-color.select-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Puzzles = "jsonl"

export type PuzzlesRow = {
  id: Id
  title: Title
  puzzleId: PuzzleId
  fen: Fen
  moves: PuzzleMoves
  rating: PuzzleRating
  ratingDeviation: RatingDeviation
  popularity: Popularity
  nbPlays: NbPlays
  themes: PuzzleThemes
  gameUrl: GameUrl
  license: PuzzleLicense
  solverColor: SolverColor
  openingTags?: OpeningTags
  solved?: Solved
}
