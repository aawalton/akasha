import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionRotationSlot = {
  id: "01a06152-c2d0-7ecb-a493-0d67e8ff42e0",
  type: "page-type/module",
  slug: "companion-rotation-slot",
  definition: "per-slot damage, healing and toughness breakdown of a simulated companion rotation",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Shield formula evaluation is inlined here rather than shared with the rotation metric pass.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Slot data is emitted for every id in companionSkillSlots even when the slot has no skill.",
    },
  ],
} as const satisfies Module
