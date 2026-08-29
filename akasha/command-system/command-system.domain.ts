import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const commandSystem = {
  id: "01a04bdd-596d-7df2-832e-b8571f8bf0c6",
  pageTypeSlug: "domain",
  slug: "command-system",
  definition: "what an agent runs by name",
  partSlugs: ["page-type/command", "module/calling"],
  requiredReadingSlugs: [],
  design: [
    "A command reaches the akasha folder and nothing above it.",
    "The commands are found in the index, so naming one costs nothing the corpus grows.",
    "A command answers with what to report and what refused it, and never writes to the console itself.",
  ],
} as const satisfies Domain
