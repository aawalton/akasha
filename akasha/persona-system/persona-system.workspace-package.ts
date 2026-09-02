import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const personaSystem = {
  id: "01a0532a-a54c-785e-97fa-4e56cb1bc0d1",
  pageTypeSlug: "workspace-package",
  slug: "persona-system",
  definition: "who answers for a part of Alan's life, and what is kept of her",
  manifest: "json",
  partSlugs: [
    "page-type/closeness-level",
    "page-type/origin-kind",
    "page-type/persona",
    "page-type/persona-points-source",
  ],
} as const satisfies WorkspacePackage
