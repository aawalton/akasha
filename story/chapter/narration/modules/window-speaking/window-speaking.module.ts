import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowSpeaking = {
  id: "01a10dbf-2e7b-7bee-aa86-18cca7f7eead",
  type: "page-type/module",
  slug: "window-speaking",
  definition: "a system window in a chapter, said as the sentences a narrator speaks",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each kind of window a chapter writes is said by a rule of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window of a kind with no rule says its kind, its name, its level and its note.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A note is said one label and one value at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fenced screen in a chapter is said one line at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word of three capitals or more is said as a word, unless it is a Roman numeral.",
    },
  ],
} as const satisfies Module
