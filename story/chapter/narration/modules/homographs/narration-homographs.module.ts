import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationHomographs = {
  id: "01a11d0c-15bb-7430-b5dd-b502ac230397",
  type: "page-type/module",
  slug: "narration-homographs",
  definition: "a word spelled like another, handed to the voice with the reading its sense needs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word said one way in every sentence is a pronunciation naming no world, not a rule here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A true adjective in -ed, as wicked, naked or alleged, keeps misaki's reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A compound misaki stresses twice, as eye contact, is handed on stressed on its first word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A homograph is handed on with a reading only where the words beside it settle its sense.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where no words beside a homograph settle its sense, misaki's own reading is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule joins this table only after its matches in the chapters are read and found right.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Markup already handed on is never read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bow given, taken, returned or swept to someone is the bend.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bow held, aimed or named beside other arms is the weapon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bow of a ship, and a bow named port or starboard, is the bend.",
    },
  ],
  createdAt: "2026-10-08T19:44:53.690Z",
  updatedAt: "2026-10-09T14:00:40.352Z",
} as const satisfies Module
