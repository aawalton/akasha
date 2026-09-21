import type { TemperCompanionActivationBuff } from "akasha/temper/catalog/companion/activation-buff/temper-companion-activation-buff.page-type.types.ts"

export const flatDamageReduction = {
  id: "01a05fcd-70f4-7c83-b108-1885c9bdb242",
  type: "page-type/temper-companion-activation-buff",
  slug: "flat-damage-reduction",
  key: "flat-damage-reduction",
  title: "Damage Taken",
} as const satisfies TemperCompanionActivationBuff
