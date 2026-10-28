import type { WorldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.types.ts"

export const pathsProbeWorldPath = {
  id: "01a18009-7d21-731e-9e30-f96c20122bd0",
  type: "page-type/world-ability-kind",
  slug: "paths-probe-world-path",
  title: "Path",
  pluralTitle: "Paths",
  activeSlots: 2,
  world: "world/paths-probe-world",
  description: "A road walked further with every effort, two at a time.",
  createdAt: "2026-10-28T01:04:27.937Z",
  updatedAt: "2026-10-28T01:04:27.937Z",
} as const satisfies WorldAbilityKind
