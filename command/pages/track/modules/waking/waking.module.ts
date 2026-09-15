import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const waking = {
  id: "01a06c4c-15f1-7000-9fb5-6a33127258e9",
  type: "module",
  slug: "waking",
  definition: "which day a sleep opens, and which day comes before another",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day a sleep opens is read from when that sleep began.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sleep beginning at or after six the evening in Utah opens the day after.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is a sleep where the title of the stretch reads sleep alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A title is read for that word with its case and its spacing set aside.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day that will not parse answers itself.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a checkout.",
    },
  ],
} as const satisfies Module
