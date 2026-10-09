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
        "A past tense misaki builds on a wrong stem, as bowed on Bowe, is handed on as its own reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cursed is one syllable in every sense, the adjective as well as the verb.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Resent is the feeling, said with a z, since misaki reads it as sent again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Breathed is the past of breathe, since misaki's own entry reads it as breath.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word in -ied or -ies that misaki ends with a short i, as copied, is handed on with a long ee.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A true adjective in -ed, as wicked, naked or alleged, keeps misaki's reading.",
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
  updatedAt: "2026-10-09T01:51:33.276Z",
} as const satisfies Module
