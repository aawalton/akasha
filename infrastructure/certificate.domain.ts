import type { Domain } from "../domains/domain.page-type.ts"

export const certificate = {
  id: "01a0658b-0f02-7cc7-a170-0193d5a4bc1d",
  pageTypeSlug: "domain",
  slug: "certificate",
  definition: "a signed statement that a name belongs to whoever answers on it",
  pluralSlug: "certificates",
  partSlugs: ["page-type/certificate-authority"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A certificate for a public name is issued by an outside authority.",
    },
    {
      invariantKind: "departure",
      statement: "A certificate used inside the cluster is signed by our own authority.",
    },
    {
      invariantKind: "constraint",
      statement: "Our own authority's key is not in the repository.",
    },
  ],
} as const satisfies Domain
