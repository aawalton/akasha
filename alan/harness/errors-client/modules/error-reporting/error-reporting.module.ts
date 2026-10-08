import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorReporting = {
  id: "01a05c89-6034-7244-b9d2-6f9242df9ca4",
  type: "page-type/module",
  slug: "error-reporting",
  definition: "a browser error posted to the sink, with its page",
  code: "ts",
  runsInABrowser: true,
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A report that fails to send raises nothing to the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A report goes to the site that served the page rather than to a named origin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The release a report names is the one its caller hands in.",
    },
  ],
  createdAt: "2026-09-01T10:35:02.068Z",
  updatedAt: "2026-09-28T14:31:14.000Z",
} as const satisfies Module
