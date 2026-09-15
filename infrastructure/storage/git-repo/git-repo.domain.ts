import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const gitRepo = {
  id: "01a0658b-0f02-7b81-b4eb-10d0287c3fed",
  type: "page-type/domain",
  slug: "git-repo",
  definition: "the versioned text stores",
  parts: ["domain/dirty", "page-type/repo"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bare repositories sit on one disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mirror to a second host runs after the push returns.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No mirror to a second host runs inside the push.",
    },
  ],
} as const satisfies Domain
