import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const locationTraceAccess = {
  id: "01a05bc7-9129-700a-81c5-e2dfa20709ec",
  type: "page-type/domain",
  slug: "location-trace-access",
  definition: "the shape one recorded place is carried in, and the refusal a batch of places meets",
  parts: ["module/trace-insert", "module/trace-shape"],
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the phone a trace came from.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a trace back out.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here keeps a location trace.",
    },
  ],
} as const satisfies Domain
