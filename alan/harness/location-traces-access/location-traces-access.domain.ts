import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const locationTracesAccess = {
  id: "01a05bc7-9129-700a-81c5-e2dfa20709ec",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "location-traces-access",
  definition: "the shape one recorded place is carried in, and the refusal a batch of places meets",
  parts: ["module/trace-shape", "module/trace-insert"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the phone a trace came from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a trace back out.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here keeps a location trace.",
    },
  ],
} as const satisfies Domain
