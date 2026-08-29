import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const checksSystem = {
  id: "01a04bc4-7e85-704f-b87e-eac561795185",
  pageTypeSlug: "domain",
  slug: "checks-system",
  definition: "how a change is judged against what must be true of it",
  partSlugs: ["page-type/check", "module/judging", "module/checking"],
  requiredReadingSlugs: [],
  design: [
    "The checks reach the akasha folder and nothing above it.",
    "A change is judged before it reaches disk, so a refused change leaves nothing behind.",
    "Audit alone judges every page; patch, worktree and deploy judge a set of changes.",
  ],
  intent: [
    "A change costs the checks what the change is worth, never what the corpus is worth.",
    "A check is run over the changes it was given, and never over the corpus.",
    "What a check must know beyond the file it was handed, it asks the index.",
  ],
} as const satisfies Domain
