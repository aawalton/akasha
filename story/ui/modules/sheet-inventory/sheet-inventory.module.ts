import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sheetInventory = {
  id: "01a17ebf-87fb-75d6-ab44-d42b9741ad6b",
  type: "page-type/module",
  slug: "sheet-inventory",
  definition: "the inventory tab of a character sheet, being its purse, its items and its slots",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row of filters heads the list: all, equipped, each category held, currency.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter is drawn only where something falls under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Categories are drawn as filters and groups only where two or more are held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item stating no category falls under Other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The purse is the currency group, above what the character carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse with a ledger opens that ledger when tapped, newest change first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item held more than once shows how many beside its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot with nothing in it is not shown, so gear not yet owned is not foretold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carried item offers Drop, Equip and Use, and a worn one Drop, Unequip and Use.",
    },
  ],
  createdAt: "2026-10-27T19:04:03.834Z",
  updatedAt: "2026-10-27T19:23:01.232Z",
} as const satisfies Module
