import {
  ACCOUNT_CARDS,
  type AccountCardId,
  CHARACTER_CARDS,
  type CharacterCardId,
  COMPANION_CARDS,
  type CompanionCardId,
} from "../completion-card-registry/completion-card-registry.module.code.ts"

type TaskOnlyCardId =
  | "guild-sales"
  | "hireling-mails"
  | "active-quests"
  | "inventory-management"
  | "dungeon-sets"

const TASK_ONLY_CARD_IDS: readonly TaskOnlyCardId[] = [
  "guild-sales",
  "hireling-mails",
  "active-quests",
  "inventory-management",
  "dungeon-sets",
]

export type AnyCompletionCardId = AccountCardId | CharacterCardId | CompanionCardId | TaskOnlyCardId

const ALL_COMPLETION_CARD_IDS = new Set<string>([
  ...ACCOUNT_CARDS.map((c) => c.id),
  ...CHARACTER_CARDS.map((c) => c.id),
  ...COMPANION_CARDS.map((c) => c.id),
  ...TASK_ONLY_CARD_IDS,
])

export function isAnyCompletionCardId(value: string): value is AnyCompletionCardId {
  return ALL_COMPLETION_CARD_IDS.has(value)
}
