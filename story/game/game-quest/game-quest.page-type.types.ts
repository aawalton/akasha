import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { QuestObjective } from "akasha/story/game/game-quest/properties/quest-objective.text-property.types.ts"
import type { QuestReward } from "akasha/story/game/game-quest/properties/quest-reward.text-property.types.ts"
import type { QuestStatus } from "akasha/story/game/game-quest/properties/quest-status.text-property.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"
import type { ListedNote } from "akasha/story/game/properties/listed-note.text-property.types.ts"

export type GameQuest = Page & {
  title: Title
  game: HoldingGame
  note?: ListedNote
  objective: QuestObjective
  reward?: QuestReward
  status: QuestStatus
}
