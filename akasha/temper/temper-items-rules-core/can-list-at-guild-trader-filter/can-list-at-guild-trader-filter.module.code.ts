import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.canListAtGuildTrader

export const CAN_LIST_AT_GUILD_TRADER_FILTER: InventoryRuleFilter = {
  id: "can-list-at-guild-trader",
  label: "Can List at Guild Trader",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isEligibleForAction: (action) => action === "list",
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canListAtGuildTrader: "can-list-at-guild-trader" }),
  clear: () => ({ canListAtGuildTrader: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canListAtGuildTrader: v } : {}
  },
}
