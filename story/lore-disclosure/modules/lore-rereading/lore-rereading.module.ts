import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreRereading = {
  id: "01a0e337-29f5-7855-af44-8e1c85997314",
  type: "page-type/module",
  slug: "lore-rereading",
  definition: "the lore pages a turn's notice names to a seat",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page is named where the seat's last line naming it is of a body other than the one there now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the seat never read, or read at the body there now, is not named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat holding no reading is named no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place page is lore as a lore page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page withheld from the seat is not named, whatever the seat read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing of a page's body is named, only its path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The world builder's lore of a turn is what a held seat is withheld under the turn's world.",
    },
  ],
  createdAt: "2026-09-27T14:13:58.389Z",
  updatedAt: "2026-10-30T19:44:49.406Z",
} as const satisfies Module
