import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const testflightPoll = {
  id: "01a05cee-e560-7b4d-8df2-e5be4918211f",
  type: "page-type/module",
  slug: "testflight-poll",
  definition: "how code waits until TestFlight gives an iOS app to people",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "an internalBuildState of MISSING_EXPORT_COMPLIANCE counts as blocked rather than as still waiting",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "a read of App Store Connect that fails is retried at the next interval",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "three read failures in a row raise the error rather than being retried again",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "a read that answers resets the count of failures in a row to zero",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "a build App Store Connect has not yet listed is carried as a state of its own",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "each tick says how long the poll has run and when the poll gives up",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "the processing poll gives up after 30 minutes",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "the tester-visibility poll gives up after 10 minutes",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "a processing failure is emitted as a single-line JSON marker beside its prose message",
    },
  ],
  createdAt: "2026-09-01T12:25:55.296Z",
  updatedAt: "2026-10-30T15:47:30.085Z",
} as const satisfies Module
