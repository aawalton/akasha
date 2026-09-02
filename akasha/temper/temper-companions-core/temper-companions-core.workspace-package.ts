import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperCompanionsCore = {
  id: "01a06108-0770-7896-af0b-609e72d8fa97",
  pageTypeSlug: "workspace-package",
  slug: "temper-companions-core",
  definition: "the gear, roles and traits a companion in The Elder Scrolls Online is built from",
  manifest: "json",
  partSlugs: [
    "module/companion-armor-slots",
    "module/companion-armor-weights",
    "module/companion-base-roles",
    "module/companion-equipment-qualities",
    "module/companion-eso-trait-map",
    "module/companion-jewelry-slots",
    "module/companion-metric-effect",
    "module/companion-metric-ids",
    "module/companion-metric-template",
    "module/companion-roles",
    "module/companion-traits",
    "module/companion-weapon-roles",
    "module/companion-weapon-slots",
    "module/companion-weapon-types",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every table here is written out from the companion pages rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement:
        "The generator that writes these tables outside akasha reads the same companion pages.",
    },
  ],
} as const satisfies WorkspacePackage
