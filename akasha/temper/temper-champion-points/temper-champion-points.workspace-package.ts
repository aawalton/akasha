import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperChampionPoints = {
  id: "01a06076-1b64-7dfd-b35b-f6c86003f6c1",
  pageTypeSlug: "workspace-package",
  slug: "temper-champion-points",
  definition: "the champion stars a character earns past level fifty",
  manifest: "json",
  partSlugs: [
    "module/champion-point-source",
    "module/craft-passives",
    "module/craft-slottables",
    "module/fitness-passives",
    "module/fitness-slottables",
    "module/warfare-passives",
    "module/warfare-slottables",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A star is reached by its kebab id rather than by the number the game gives that star.",
    },
  ],
} as const satisfies WorkspacePackage
