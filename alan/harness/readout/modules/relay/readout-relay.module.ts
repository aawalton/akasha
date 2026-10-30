import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutRelay = {
  id: "01a05b53-8d89-70aa-a7f0-f32ee7eac52b",
  type: "page-type/module",
  slug: "readout-relay",
  definition: "how code sends a readout's number to the machine that shows the readout",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A number moves only when the machine that took the number sends the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number is carried under the name of the readout the number was taken for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The moment carried is the moment the number was taken rather than the moment the number arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number arriving is written beside the readout's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number arriving is written outside the commit rather than into one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number is written under the keys `readout-reading` answers with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page a number is written beside is placed by page type and slug rather than named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout no page is slugged for has its number refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number written answers nothing, and a number refused answers why.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A machine that starts again has every number its readouts' pages carry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body that does not parse as a number and its moment is refused rather than held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number below zero is carried rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How fast a number falls with the clock is carried beside that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming no rate is carried as a number falling at nothing an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number between two whole numbers is carried rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number that is not finite is refused rather than carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A moment that cannot be read is no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carrier presents the relay secret the machine the carrier carries to names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer that is not OK is refused rather than counted as carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Running this file has the number beside the readout that run names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line a carry says names the moment rather than the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a number is carried to is said where the carrier is run rather than held as a secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sites a readout's number is carried to are read off that readout's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A site is reached at the first hostname its router app's tunnel routes name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The readout carried under is read off the name of the page the readout was named by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A readout with no number beside the readout is said rather than carried as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path naming no readout page is refused apart from a readout that has taken no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path naming no readout page is said at the level a journal keeps for an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout that has taken no number is said at no level of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number is written with the values a write keeps rather than with a body a write puts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write putting a body would commit the readout page for every number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The helper a test carries a number over HTTP with sits here rather than in each test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test proving a carry is refused reads the answer rather than being thrown at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test carrying one readout's number again and again names that readout once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes a number.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides when a number is due.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides a number held is too old to show.",
    },
  ],
  createdAt: "2026-09-01T04:56:37.513Z",
  updatedAt: "2026-10-30T17:32:16.974Z",
} as const satisfies Module
