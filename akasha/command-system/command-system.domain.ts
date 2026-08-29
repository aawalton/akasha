import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const commandSystem = {
  id: "01a04bdd-596d-7df2-832e-b8571f8bf0c6",
  pageTypeSlug: "domain",
  slug: "command-system",
  definition: "what an agent runs by name",
  partSlugs: [
    "page-type/command",
    "module/calling",
    "module/landing",
    "module/cli",
    "module/asking",
    "module/differing",
    "module/fault-saying",
    "module/holding",
    "module/reading",
    "module/rooting",
    "module/scratching",
    "module/standing",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command reaches no further than the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "A command is found in the index, and naming one costs the same at any size.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command answers with what to report and what refused it, and prints nothing itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command's answer carries a code saying whose fault it was: the caller's, the data's, or the command's.",
    },
  ],
} as const satisfies Domain
