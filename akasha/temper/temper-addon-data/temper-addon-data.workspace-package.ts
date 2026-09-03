import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperAddonData = {
  id: "01a062a9-3f10-7c41-b8e3-5d7420f9e1a6",
  pageTypeSlug: "workspace-package",
  slug: "temper-addon-data",
  definition: "where each data file temper renders from its own pages is landed",
  manifest: "json",
  partSlugs: [
    "module/addon-data-page-rows",
    "module/addon-data-pages",
    "module/addon-data-target",
    "module/alliance-mappings",
    "module/catalog-sidecars",
    "module/champion-point-mappings",
    "module/class-mappings",
    "module/codec-constants",
    "module/codec-widths",
    "module/companion-mappings",
    "module/companion-skill-mappings",
    "module/curse-mappings",
    "module/failing-alone",
    "module/food-mappings",
    "module/inventory-trait-mappings",
    "module/mapping-renders",
    "module/mined-motif-coverage",
    "module/mined-restore-potions",
    "module/mundus-mappings",
    "module/passive-skill-mappings",
    "module/player-skill-mappings",
    "module/potion-mappings",
    "module/potion-restore-metrics",
    "module/race-mappings",
    "module/render-equipment-mappings",
    "module/render-scribing-total-script-count",
    "module/render-set-category-mappings",
    "module/scribing-mappings",
    "module/set-mappings",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target names the module a rendered table lands as rather than a folder.",
    },
    {
      invariantKind: "departure",
      statement: "No numbered series any row here declares reaches an addon's Lua build.",
    },
    {
      invariantKind: "gap",
      statement: "A rendered table lands as a page's entries rather than as numbered parts.",
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
