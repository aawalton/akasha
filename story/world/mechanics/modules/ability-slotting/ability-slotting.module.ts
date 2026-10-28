import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const abilitySlotting = {
  id: "01a17ffd-0845-78cf-9525-bda0071098c3",
  type: "page-type/module",
  slug: "ability-slotting",
  definition:
    "what setting a held ability aside or taking it up again changes, or why it is refused",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a held ability whose kind states its active slots is set aside or taken up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held ability holds a slot unless it is set aside or completed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Setting an ability aside drops its experience to the last tier it passed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ability whose skill states no tiers is refused setting aside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking an ability up is refused while every slot of its kind is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each change states the value its page held before, as a beat's change does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a page, or names a world.",
    },
  ],
  createdAt: "2026-10-28T00:50:51.589Z",
  updatedAt: "2026-10-28T00:50:51.589Z",
} as const satisfies Module
