import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutRelay = {
  id: "01a05b53-8d89-70aa-a7f0-f32ee7eac52b",
  type: "page-type/module",
  slug: "readout-relay",
  definition: "the reading carried from the machine that took it to the machine that shows it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading moves only when the machine that took the reading sends the reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is carried under the name of the readout the reading was taken for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The moment carried is the moment the reading was taken rather than the moment the reading arrived.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading arriving replaces the reading held before the arriving reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading arriving is in memory rather than in a file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A machine that starts again has no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is not a whole reading is refused rather than held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading below zero is carried rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How fast a reading falls with the clock is carried beside that reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body naming no rate is carried as a reading falling at nothing an hour.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading between two whole numbers is carried rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading that is no finite number is refused rather than carried.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A moment that cannot be read is no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A carrier presents the relay secret the machine the carrier carries to names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer that is not OK is refused rather than counted as carried.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Running this file has the reading beside the readout that run names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The line a carry says names the moment rather than the reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where a reading is carried to is said where the carrier is run rather than held as a secret.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The readout carried under is read off the name of the page the readout was named by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A readout with no reading beside the readout is said rather than carried as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path naming no readout page is refused apart from a readout that has taken no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path naming no readout page is said at the level a journal keeps for an error.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout that has taken no reading is said at no level of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading held is dropped only to prove that no reading is held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The helper a test carries a reading over HTTP with sits here rather than in each test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test proving a carry is refused reads the answer rather than being thrown at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test carrying one readout's reading again and again names that readout once.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a reading.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides a reading held is too old to show.",
    },
  ],
} as const satisfies Module
