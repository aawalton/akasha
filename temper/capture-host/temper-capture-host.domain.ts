import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperCaptureHost = {
  id: "01a06075-b051-757f-99fd-44c2240d028a",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-capture-host",
  definition: "the check every capture host makes that its zod schema and payload type agree",
  parts: ["module/assert-schema-matches-payload"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A capture host reads the payload a capture addon saved rather than the running game.",
    },
    {
      invariantKind: "departure",
      statement: "The check here runs in the type system rather than at runtime.",
    },
  ],
} as const satisfies Domain
