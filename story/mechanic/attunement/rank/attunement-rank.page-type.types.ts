import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { AttunementRankCap } from "akasha/story/mechanic/attunement/rank/properties/attunement-rank-cap.number-property.types.ts"
import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"

export type AttunementRank = Mechanic & {
  title: Title
  cap: AttunementRankCap
}
