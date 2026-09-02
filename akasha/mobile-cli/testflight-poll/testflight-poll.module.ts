import type { Module } from "@akasha/code-system/module"

export const testflightPoll = {
  id: "01a05cee-e560-7b4d-8df2-e5be4918211f",
  pageTypeSlug: "module",
  slug: "testflight-poll",
  definition: "the polling loop that carries an uploaded build from processing to tester-visible",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "an internalBuildState of MISSING_EXPORT_COMPLIANCE counts as blocked rather than as still waiting",
    },
    {
      invariantKind: "departure",
      statement: "a read of App Store Connect that fails is retried at the next interval",
    },
    {
      invariantKind: "departure",
      statement: "three read failures in a row raise the error rather than being retried again",
    },
    {
      invariantKind: "departure",
      statement: "a read that answers resets the count of failures in a row to zero",
    },
    {
      invariantKind: "departure",
      statement: "a build App Store Connect has not yet listed is carried as a state of its own",
    },
    {
      invariantKind: "departure",
      statement: "each tick says how long the poll has run and when the poll gives up",
    },
    {
      invariantKind: "constraint",
      statement: "the processing poll gives up after 30 minutes",
    },
    {
      invariantKind: "constraint",
      statement: "the tester-visibility poll gives up after 10 minutes",
    },
    {
      invariantKind: "departure",
      statement:
        "a processing failure is emitted as a single-line JSON marker beside its prose message",
    },
  ],
} as const satisfies Module
