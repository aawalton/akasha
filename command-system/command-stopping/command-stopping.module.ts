import type { Module } from "@akasha/code/module"

export const commandStopping = {
  id: "01a08210-6d0b-7dc1-ab3e-7bbc1658cd31",
  pageTypeSlug: "module",
  slug: "command-stopping",
  definition: "a call stopped where the command runs past the seconds that command is allowed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seconds a command is allowed are read off that command's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no seconds is allowed a hundred and twenty.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating seconds that are no number above nothing is allowed a hundred and twenty.",
    },
    {
      invariantKind: "departure",
      statement:
        "The seconds are counted on the wall clock rather than on the work a command does.",
    },
    {
      invariantKind: "departure",
      statement: "The watch runs on a thread of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A command holding the loop for its whole run is stopped all the same.",
    },
    {
      invariantKind: "departure",
      statement: "What is said names the call and the seconds that call was allowed.",
    },
    {
      invariantKind: "departure",
      statement: "What is said sends a ceiling that wants raising to Alan.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped call says why on the error stream and the process is ended.",
    },
    {
      invariantKind: "departure",
      statement: "A call answering inside its seconds ends the watch.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits on the answer a command gives.",
    },
  ],
} as const satisfies Module
