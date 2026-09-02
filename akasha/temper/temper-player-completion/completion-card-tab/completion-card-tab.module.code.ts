import { COMPLETION_CATEGORY_TREE_STATIC } from "../completion-category-tree/completion-category-tree.module.code.ts"
import type { CompletionTab } from "../completion-category-tree-types/completion-category-tree-types.module.code.ts"

const TABS: readonly CompletionTab[] = ["account", "characters", "companions"]

const CARD_TAB_MAP = new Map<string, CompletionTab>()
for (const tab of TABS) {
  for (const node of COMPLETION_CATEGORY_TREE_STATIC[tab]) {
    CARD_TAB_MAP.set(node.id, tab)
  }
}

export function getCompletionCardTab(cardId: string): CompletionTab | undefined {
  return CARD_TAB_MAP.get(cardId)
}
