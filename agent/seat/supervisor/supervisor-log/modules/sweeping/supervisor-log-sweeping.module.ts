import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorLogSweeping = {
  id: "01a0686a-7a57-7a62-bfba-385af928123a",
  type: "page-type/module",
  slug: "supervisor-log-sweeping",
  definition: "the log directory of every departed supervisor taken away",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every supervisor keeps a directory named for its agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A supervisor's directory has that supervisor's socket.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A log file a supervisor falls back to when a log day page cannot be written is there too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A directory is kept where a seat page that still exists names its agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A directory with a file written inside the window is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A supervisor whose seat page has gone is a supervisor that has stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The window leaves a stopped seat's log readable for as long as somebody might open that log.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing reads a departed supervisor's directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A departed supervisor's directory is kept seven days where no other window is stated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "These files are gitignored.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each removal here goes with a plain remove rather than through the gated remove.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file directly under the supervisors root past the window goes with the departed directories.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A directory whose entries cannot be listed is named as unread.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A directory whose entries cannot be listed is not taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The run exits non-zero where a directory's entries cannot be listed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is taken away unless the sweep is asked to.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A seat store that stopped being written is refused rather than read as every seat departing at once.",
    },
  ],
} as const satisfies Module
