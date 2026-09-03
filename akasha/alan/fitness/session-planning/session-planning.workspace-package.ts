import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const sessionPlanning = {
  id: "01a0685e-89d5-74be-a16b-eb86bd16a316",
  pageTypeSlug: "workspace-package",
  slug: "session-planning",
  definition: "which movements a session asks for and what each of them is prescribed",
  manifest: "json",
  partSlugs: [
    "module/equipment-kit",
    "module/load-progression",
    "module/movement-recency",
    "module/movement-scoring",
    "module/next-set",
    "module/novelty-budget",
    "module/pattern-groups",
    "module/performed-set",
    "module/session-anchor",
    "module/session-loading",
    "module/session-selection",
    "module/slot-templates",
    "module/weekly-coverage",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One module reads pages and every other module takes values already narrowed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages are read from the checkout this code runs in rather than over the service.",
    },
    {
      invariantKind: "departure",
      statement: "A value a movement carries is named by the exercise property that declares it.",
    },
    {
      invariantKind: "departure",
      statement: "Every number a session is weighed by comes from the selection policy page.",
    },
    {
      invariantKind: "departure",
      statement: "A plan states why each movement stands where it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A slot no movement fills is reported as unfilled rather than dropped.",
    },
  ],
} as const satisfies WorkspacePackage
