import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreWithholding = {
  id: "01a0d486-426b-7e79-bb02-c10a0233e201",
  type: "page-type/module",
  slug: "lore-withholding",
  definition: "the lore a held seat is kept from reading, and whether a path reaches it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat whose role is game master, reviewer, writer or story recorder is a held seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent is judged by the seat above that subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every secrets file beside a lore page is withheld whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore page or a place telling no fact to anyone is withheld.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore page whose body reads as no page is withheld as one telling nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a page is let through once one fact on it names a knower.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story page no lore about which tells a fact is withheld too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a page is let through once any fact about it names a knower.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page outside the stories is never withheld for the lore about it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A world's own page is never withheld for the lore about it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other caller is answered with nothing withheld.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether one path is withheld is answered from that page, and the lore the index files about it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One path is withheld exactly where the whole list withholds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller holding a few paths asks about each rather than listing every lore page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path is withheld where the path, links followed, ends in a withheld page's path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy of a withheld page in any tree is withheld as the page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding a withheld page, or a copy of one, reaches that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names nothing from inside a withheld page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal says to ask the world builder rather than to read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A read refused whole for a withheld page is worded here, so every reader refuses it alike.",
    },
  ],
} as const satisfies Module
