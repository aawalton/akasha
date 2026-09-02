import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperAddonData = {
  id: "01a062a9-3f10-7c41-b8e3-5d7420f9e1a6",
  pageTypeSlug: "workspace-package",
  slug: "temper-addon-data",
  definition: "where each data file temper renders from its own pages is landed",
  manifest: "json",
  partSlugs: ["module/addon-data-target"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target names the module a rendered table lands as rather than a folder.",
    },
    {
      invariantKind: "departure",
      statement: "A table longer than one module's code holds lands as a numbered series.",
    },
    {
      invariantKind: "departure",
      statement: "A series names how many parts the series lands as.",
    },
    {
      invariantKind: "departure",
      statement: "What the parts are named for is not always the module composing the parts.",
    },
    {
      invariantKind: "departure",
      statement: "The whole of a run's output lands as one change set.",
    },
    {
      invariantKind: "departure",
      statement: "A run that cannot land its whole output changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here reads the disk to find out whether a target is still there.",
    },
    {
      invariantKind: "gap",
      statement: "Every table the generators render is named here.",
    },
  ],
} as const satisfies WorkspacePackage
