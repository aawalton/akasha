import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const infrastructureCommand = {
  id: "01a06809-a024-78cb-a37f-ff53624d76bd",
  type: "domain",
  slug: "infrastructure-command",
  definition: "what an agent runs by name over what the system runs on",
  parts: [],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The Talos code a command here works over is in akasha.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The RBAC rules a command here reads are in akasha.",
    },
  ],
} as const satisfies Domain
