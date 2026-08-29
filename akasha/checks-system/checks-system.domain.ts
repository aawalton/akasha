import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const checksSystem = {
  id: "01a04bc4-7e85-704f-b87e-eac561795185",
  pageTypeSlug: "domain",
  slug: "checks-system",
  definition: "how a change is judged against what must be true of it",
  partSlugs: ["page-type/check", "module/judging", "module/checking"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Checks reach no further than the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the akasha folder is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change is judged before it reaches disk, and a refused one leaves nothing behind.",
    },
    {
      invariantKind: "departure",
      statement: "A change may land with no check run, its commit saying that none ran and why.",
    },
    {
      invariantKind: "departure",
      statement: "Audit judges every page; the other phases judge only what changed.",
    },
    {
      invariantKind: "departure",
      statement: "A check reads the index together with the change, never the index alone.",
    },
    {
      invariantKind: "gap",
      statement: "A check runs over the changes it was given, never over the corpus.",
    },
    {
      invariantKind: "gap",
      statement: "A check asks the index for anything beyond the change it was handed.",
    },
    {
      invariantKind: "gap",
      statement: "Every phase a check states is reached by a caller that runs it.",
    },
  ],
} as const satisfies Domain
