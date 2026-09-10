import type { Module } from "@akasha/code/module"

export const supervisorLogPath = {
  id: "01a06838-5a84-7007-ad97-0d2824c6293d",
  pageTypeSlug: "module",
  slug: "supervisor-log-path",
  definition: "where a supervisor's own files stand while that supervisor runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every supervisor's files stand under `.supervisors` at the checkout root.",
    },
    {
      invariantKind: "departure",
      statement: "A supervisor's own folder is named for the id of its agent.",
    },

    {
      invariantKind: "constraint",
      statement: "A path the kernel binds a socket at is at most 107 bytes.",
    },
    {
      invariantKind: "constraint",
      statement: "The user's runtime directory is emptied when that user logs out.",
    },
    {
      invariantKind: "departure",
      statement: "The socket the OAuth proxy is reached on is in the user's runtime directory.",
    },
    {
      invariantKind: "departure",
      statement: "That socket is named for its agent rather than held in a folder of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "The runtime directory is worked out from the user rather than read from the environment.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may name another base folder.",
    },
    {
      invariantKind: "departure",
      statement: "A test working apart from the real folder names another base folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a folder or opens a file.",
    },
  ],
} as const satisfies Module
