import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const gitRepos = {
  id: "01a0658b-0f02-7b81-b4eb-10d0287c3fed",
  pageTypeSlug: "domain",
  slug: "git-repos",
  definition: "the versioned text stores",
  partSlugs: ["domain/dirty"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bare repositories sit on one disk.",
    },
    {
      invariantKind: "departure",
      statement: "A mirror to a second host runs after the push returns.",
    },
    {
      invariantKind: "departure",
      statement: "No mirror to a second host runs inside the push.",
    },
  ],
} as const satisfies Domain
