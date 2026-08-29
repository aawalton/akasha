import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const checksSystem = {
  id: "01a04bc4-7e85-704f-b87e-eac561795185",
  pageTypeSlug: "domain",
  slug: "checks-system",
  definition: "how a change is judged against what must be true of it",
  partSlugs: ["page-type/check", "module/judging", "module/checking"],
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement: "Checks reach no further than the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change is judged before it reaches disk, so a refused one leaves nothing behind.",
    },
    {
      invariantKind: "departure",
      statement: "Audit judges every page; the other phases judge only what changed.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "A check runs over the changes it was given, never over the corpus.",
    },
    {
      invariantKind: "gap",
      statement: "A check asks the index for anything beyond the file it was handed.",
    },
  ],
} as const satisfies Domain
