import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const filePropertyFile = {
  id: "01a04f58-a7ef-7001-9186-8aa35b0da656",
  pageTypeSlug: "context-warrant",
  slug: "file-property-file",
  definition: "what a seat must read for a file that is one property's own",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page property's file warrants its page and its property's type.",
    },
  ],
} as const satisfies ContextWarrant
