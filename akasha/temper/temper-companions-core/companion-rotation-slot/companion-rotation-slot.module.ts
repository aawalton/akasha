import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionRotationSlot = {
  id: "01a06152-c2d0-7ecb-a493-0d67e8ff42e0",
  pageTypeSlug: "module",
  slug: "companion-rotation-slot",
  definition: "per-slot damage, healing and toughness breakdown of a simulated companion rotation",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Shield formula evaluation is inlined here rather than shared with the rotation metric pass.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Slot data is emitted for every id in companionSkillSlots even when the slot holds no skill.",
    },
    {
      invariantKind: "gap",
      statement:
        "Resolve buffs assume a fixed armor divisor of fifty thousand instead of the metric divisor.",
    },
  ],
} as const satisfies Module
