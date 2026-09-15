import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditRequest = {
  id: "01a09277-b9e5-7000-93dc-4d36ee548c6c",
  type: "module",
  slug: "audit-request",
  definition: "the checks an agent asked a round to run beyond the ones a phase names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request is one file named for one check.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second asker naming that check writes the file the first asker wrote.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request is taken away by whoever ran the check that request named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request is kept beside the verdicts, outside the repository it is about.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name that is no check slug is refused rather than written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder that is not there holds no request rather than throwing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which checks there are.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs a check or writes a verdict.",
    },
  ],
} as const satisfies Module
