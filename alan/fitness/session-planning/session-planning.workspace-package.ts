import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const sessionPlanning = {
  id: "01a0685e-89d5-74be-a16b-eb86bd16a316",
  pageTypeSlug: "workspace-package",
  slug: "session-planning",
  definition: "which movements a session asks for and what each of them is prescribed",
  manifest: "json",
  partSlugs: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One module reads pages and every other module takes values already narrowed.",
    },

    {
      invariantKind: "departure",
      statement:
        "A value a movement carries is named by the exercise property that declares that value.",
    },
    {
      invariantKind: "departure",
      statement: "Every number a session is weighed by comes from the selection policy page.",
    },
    {
      invariantKind: "departure",
      statement: "A plan states why each movement is where that movement is.",
    },
    {
      invariantKind: "departure",
      statement: "A slot no movement fills is reported as unfilled rather than dropped.",
    },
  ],
} as const satisfies WorkspacePackage
