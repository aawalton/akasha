import type { ContextWarrant } from "akasha/domain/context/warrant/context-warrant.page-type.types.ts"

export const filePropertyFile = {
  id: "01a04f58-a7ef-7001-9186-8aa35b0da656",
  type: "page-type/context-warrant",
  slug: "file-property-file",
  definition: "what a seat must read for a file that is a property's own",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page property's file warrants its page and its property's type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property's file warrants its page whatever the file has.",
    },
  ],
  createdAt: "2026-08-29T21:06:45.359Z",
  updatedAt: "2026-09-22T10:11:09.000Z",
} as const satisfies ContextWarrant
