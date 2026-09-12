import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const idleSystem = {
  id: "01a05b63-a6e5-7573-b275-3738b378b2a5",
  type: "domain",
  slug: "idle-system",
  definition: "the rules an idle game's roster earns and grows by",
  parts: [
    "module/idle-accrual",
    "module/idle-constants",
    "module/idle-deriving",
    "module/idle-dormancy",
    "module/idle-draw",
    "module/idle-gacha-heat",
    "module/idle-gacha-state",
    "module/idle-rate",
    "module/idle-save",
    "module/idle-state",
    "page-type/idle-persona-card",
    "page-type/idle-save",
  ],
} as const satisfies Domain
