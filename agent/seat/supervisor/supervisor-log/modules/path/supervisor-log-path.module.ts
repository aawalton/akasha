import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorLogPath = {
  id: "01a06838-5a84-7007-ad97-0d2824c6293d",
  type: "module",
  slug: "supervisor-log-path",
  definition: "where a supervisor's own files are while that supervisor runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every supervisor's files are under the user's runtime directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A supervisor's own folder is named for the id of its agent.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No file a supervisor writes while running is inside the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file here goes when the user logs out rather than outliving the machine.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What outlives a run is the day of lines filed beside a page.",
    },

    {
      invariantKind: "invariant-kind/constraint",
      statement: "A path the kernel binds a socket at is at most 107 bytes.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The user's runtime directory is emptied when that user logs out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The socket the OAuth proxy is reached on is in the user's runtime directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That socket is named for its agent rather than held in a folder of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file too big to name a socket has a runtime folder of that agent's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No such folder is the directory the sockets themselves sit in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The runtime directory is worked out from the user rather than read from the environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may name another base folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test working apart from the real folder names another base folder.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here makes a folder or opens a file.",
    },
  ],
} as const satisfies Module
