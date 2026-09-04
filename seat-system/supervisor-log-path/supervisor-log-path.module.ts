import type { Module } from "@akasha/code-system/module"

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
      invariantKind: "departure",
      statement: "The socket the OAuth proxy is reached on stands in that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may name another base folder, which is what a test standing aside does.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a folder or opens a file.",
    },
  ],
} as const satisfies Module
