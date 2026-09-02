import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperGameCatalogCaptureAddon = {
  id: "01a060e2-3185-7405-a79e-40fe38c8220f",
  pageTypeSlug: "workspace-package",
  slug: "temper-game-catalog-capture-addon",
  definition:
    "the collectors reading the game's reference catalogs into an add-on's saved variables",
  manifest: "json",
  partSlugs: [
    "module/achievement-catalog-capture",
    "module/antiquity-lore-catalog-capture",
    "module/armor-type-constants",
    "module/cadwell-catalog-capture",
    "module/class-catalog-capture",
    "module/collectibles-catalog-capture",
    "module/companion-equipment-catalog-capture",
    "module/companion-skill-catalog-capture",
    "module/currency-catalog-capture",
    "module/display-category-constants",
    "module/enum-value-labels",
    "module/equip-type-constants",
    "module/furniture-catalog-capture",
    "module/inventory-constants-catalog-capture",
    "module/item-filter-type-constants",
    "module/item-set-catalog-capture",
    "module/item-type-constants",
    "module/lore-library-catalog-capture",
    "module/poi-catalog-capture",
    "module/recipe-catalog-capture",
    "module/scribing-catalog-capture",
    "module/skill-catalog-capture",
    "module/specialized-item-type-constants",
    "module/trait-research-catalog-capture",
    "module/tribute-catalog-capture",
    "module/weapon-type-constants",
    "module/zone-completion-catalog-capture",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each catalog domain is collected by a module of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A collector adds itself to the registry in `temper-catalog-core`.",
    },
    {
      invariantKind: "departure",
      statement: "The add-on bundling a collector decides whether that collector runs.",
    },
    {
      invariantKind: "departure",
      statement: "Each catalog answers a reader in `temper-game-catalog-capture-host`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what the player has done.",
    },
  ],
} as const satisfies WorkspacePackage
