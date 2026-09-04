import type { Module } from "@akasha/code-system/module"

export const readoutRelay = {
  id: "01a05b53-8d89-70aa-a7f0-f32ee7eac52b",
  pageTypeSlug: "module",
  slug: "readout-relay",
  definition: "the reading carried from the machine that took it to the machine that shows it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading moves only when the machine that took the reading sends the reading.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is carried under the name of the readout the reading was taken for.",
    },
    {
      invariantKind: "departure",
      statement:
        "The moment carried is the moment the reading was taken rather than the moment the reading arrived.",
    },
    {
      invariantKind: "departure",
      statement: "A reading arriving replaces the reading held before the arriving reading.",
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
      statement: "A reading below zero is carried rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A reading between two whole numbers is carried rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that is no finite number is refused rather than carried.",
    },
    {
      invariantKind: "departure",
      statement: "A moment that cannot be read is no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A carrier presents the relay secret the machine the carrier carries to names.",
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
      statement: "What a carry says names the moment rather than the reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a reading is carried to is said where the carrier is run rather than held as a secret.",
    },
    {
      invariantKind: "departure",
      statement:
        "The readout carried under is read off the name of the page the readout was named by.",
    },
    {
      invariantKind: "departure",
      statement:
        "A readout with no reading beside the readout is said rather than carried as nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path naming no readout page is refused apart from a readout that has taken no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no readout page is said at the level a journal keeps for an error.",
    },
    {
      invariantKind: "departure",
      statement: "A readout that has taken no reading is said at no level of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A reading held is dropped only to prove that no reading is held.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides a reading held is too old to show.",
    },
  ],
} as const satisfies Module
