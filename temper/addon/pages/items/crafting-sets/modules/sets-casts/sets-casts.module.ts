import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCasts = {
  id: "01a0617b-4b73-706b-9bf0-e2b177ca28eb",
  type: "page-type/module",
  slug: "sets-casts",
  definition: "the narrowings this library uses to read a value the game hands over untyped",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each narrowing here names one shape and answers a value of that shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each narrowing checks the value's Lua type before answering it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value of another type raises an error naming the type expected and the type found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An optional narrowing answers nothing for nil and fails on every other wrong type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A narrowing to a table accepts a userdata too, since the game's controls are userdata.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrowing to a list of numbers or strings checks every element the list holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrowing to a table checks the table and never what the table holds.",
    },
  ],
} as const satisfies Module
