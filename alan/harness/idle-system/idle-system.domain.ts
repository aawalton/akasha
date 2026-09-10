import type { Domain } from "../../../domains/domain.page-type.ts"

export const idleSystem = {
  id: "01a05b63-a6e5-7573-b275-3738b378b2a5",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "idle-system",
  definition: "the rules an idle game's roster earns and grows by",
  parts: [
    "page-type/idle-persona-card",
    "page-type/idle-save",
    "module/idle-state",
    "module/idle-constants",
    "module/idle-gacha-state",
    "module/idle-dormancy",
    "module/idle-deriving",
    "module/idle-save",
    "module/idle-gacha-heat",
    "module/idle-rate",
    "module/idle-accrual",
    "module/idle-draw",
  ],
} as const satisfies Domain
