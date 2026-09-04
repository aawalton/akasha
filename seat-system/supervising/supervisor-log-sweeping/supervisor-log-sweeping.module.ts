import type { Module } from "@akasha/code-system/module"

export const supervisorLogSweeping = {
  id: "01a0686a-7a57-7a62-bfba-385af928123a",
  pageTypeSlug: "module",
  slug: "supervisor-log-sweeping",
  definition: "the log directory of every departed supervisor taken away",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every supervisor keeps a directory named for its agent, holding its socket and the log files it falls back to when a log day page cannot be written.",
    },
    {
      invariantKind: "departure",
      statement:
        "A directory is kept where a seat page that still exists names its agent, or where a file in it was written inside the window.",
    },
    {
      invariantKind: "departure",
      statement: "A supervisor whose seat page has gone is a supervisor that has stopped.",
    },
    {
      invariantKind: "departure",
      statement:
        "The window leaves a stopped seat's log readable for as long as somebody might open it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing reads a departed supervisor's directory.",
    },
    {
      invariantKind: "departure",
      statement:
        "A departed supervisor's directory is kept seven days where no other window is stated.",
    },
    {
      invariantKind: "departure",
      statement:
        "These files are gitignored, so no removal here reaches a commit and each goes with a plain remove rather than through the gated one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A loose file directly under the supervisors root, past the window, goes with the departed directories.",
    },
    {
      invariantKind: "departure",
      statement:
        "A directory whose entries cannot be listed is named as unread, left standing, and the run that met it exits non-zero.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is taken away unless the sweep is asked to, because the removal cannot be undone.",
    },
    {
      invariantKind: "gap",
      statement:
        "A seat store that has stopped being written is refused rather than read as every seat having departed at once.",
    },
  ],
} as const satisfies Module
