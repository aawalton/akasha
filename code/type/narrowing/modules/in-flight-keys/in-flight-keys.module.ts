import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inFlightKeys = {
  id: "01a08df5-ff10-7edf-b73e-d70b1477a50d",
  type: "page-type/module",
  slug: "in-flight-keys",
  definition:
    "keys each held by one claim at a time, a later claim refused until the key is let go",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim on a key nobody holds is taken, and a claim on a held key is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key let go is claimable again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Letting go a key nobody holds does nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each set of keys is its own, so one caller's claim never refuses another's.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "Nothing lets a claim go on its own, so a holder that never lets go holds forever.",
    },
  ],
} as const satisfies Module
