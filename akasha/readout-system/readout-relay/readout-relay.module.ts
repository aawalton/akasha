import type { Module } from "@akasha/code-system/module"

export const readoutRelay = {
  id: "01a05b53-8d89-70aa-a7f0-f32ee7eac52b",
  pageTypeSlug: "module",
  slug: "readout-relay",
  definition: "the reading carried from the machine that took it to the machine that shows it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading moves only when the machine that took it sends it.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is carried under the name of the readout it was taken for.",
    },
    {
      invariantKind: "departure",
      statement:
        "The moment carried is the moment the reading was taken rather than the moment it arrived.",
    },
    {
      invariantKind: "departure",
      statement: "A reading arriving replaces the one held before it.",
    },
    {
      invariantKind: "departure",
      statement: "A reading arriving is held in memory rather than in a file.",
    },
    {
      invariantKind: "departure",
      statement: "A machine that starts again holds no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not a whole reading is refused rather than held.",
    },
    {
      invariantKind: "departure",
      statement: "A moment that cannot be read is no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A carrier presents the relay secret the machine it carries to names.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that is not OK is refused rather than counted as carried.",
    },
    {
      invariantKind: "departure",
      statement: "Running this file carries the reading standing beside the readout it names.",
    },
    {
      invariantKind: "departure",
      statement: "The readout carried under is read off the name of the page it was named by.",
    },
    {
      invariantKind: "departure",
      statement: "A readout with no reading beside it is said rather than carried as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A reading held is dropped only to prove that none is held.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when one is due.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides a reading held is too old to show.",
    },
  ],
} as const satisfies Module
