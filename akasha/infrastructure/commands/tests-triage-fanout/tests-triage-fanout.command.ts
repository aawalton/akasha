import type { Command } from "@akasha/command-system/command"

export const testsTriageFanout = {
  id: "01a06862-06c8-7003-903f-25652f8f14ad",
  pageTypeSlug: "command",
  slug: "tests-triage-fanout",
  definition:
    "the command reading a whole fan-out pod log and saying which workspace's tests failed in it",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "the log is piped in rather than named, since it is the output of the call before this one.",
    "the log has to be the whole pod log: a tail carries the summary and drops the failures the summary counted.",
    "a workspace whose run executed no test at all is a refusal here rather than a pass.",
    "a fail line the log carries no producing-process tag for is reported unattributed rather than guessed at.",
    "an answer with no clean terminal in it means the log was cut short, whatever the count says.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The whole log is read rather than its last summary.",
    },
    {
      invariantKind: "departure",
      statement: "A fail count above zero anywhere in the log is a failure.",
    },
    {
      invariantKind: "departure",
      statement: "A run that executed no test is a failure rather than a pass.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fail line carrying no producing-process tag is answered as located by nobody rather than attributed.",
    },
    {
      invariantKind: "departure",
      statement: "A failure seen answers 1 and a log that could not be told from clean answers 3.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing on standard input is refused rather than read as a clean log.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs a test or reaches the cluster.",
    },
  ],
} as const satisfies Command
