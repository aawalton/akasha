import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const containerRegistry = {
  id: "01a0658b-0f02-7e11-9293-61be7a832920",
  type: "page-type/domain",
  slug: "container-registry",
  definition: "where container images are kept",
  parts: ["manifest/registry", "manifest/registry-gc", "module/registry-constants"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The registry serves plain HTTP.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A node cannot resolve names inside the cluster.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A node reaches the registry at an address rather than by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the newest images of each family are kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every older image of a family is deleted.",
    },
  ],
} as const satisfies Domain
