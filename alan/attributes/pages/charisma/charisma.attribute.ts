import type { Attribute } from "akasha/alan/attributes/attribute.page-type.types.ts"

export const charisma = {
  id: "01a06841-a142-7b48-90d6-bb5e2c5138dd",
  type: "attribute",
  slug: "charisma",
  definition: "what Alan has built by hours spent at ease",
  pointUnit: "one hour of a stretch whose safety less its difficulty is at least 1",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An hour with someone at ease is one point.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is at ease where its safety less its difficulty reaches one level.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is with someone where that stretch names a relationship.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch naming nobody adds no hours however far that stretch is at ease.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Sleep names nobody.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level given as text is read as the number that text spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch missing either level or either time is left out of the sum.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch that earns nothing adds no hours and still makes the day count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day no stretch can be read on earns nothing rather than a charisma of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day is read as holding two hundred stretches at the most.",
    },
  ],
} as const satisfies Attribute
