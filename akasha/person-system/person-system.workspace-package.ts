import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const personSystem = {
  id: "01a053e0-6cf6-7ff5-b070-19e936336f59",
  pageTypeSlug: "workspace-package",
  slug: "person-system",
  definition: "a human this system reaches, and what serving them takes",
  manifest: "json",
  partSlugs: [
    "page-type/access-kind",
    "page-type/authority-kind",
    "page-type/person",
    "page-type/person-access",
    "page-type/person-authority",
    "module/person-enrolment",
    "module/route-access",
  ],
} as const satisfies WorkspacePackage
