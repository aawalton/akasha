import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const postgresAnnualDump = {
  id: "01a06865-c012-7000-8a01-503775ee557e",
  pageTypeSlug: "workspace-package",
  slug: "postgres-annual-dump",
  definition: "the yearly whole copy of the database, and what it is taken by",
  manifest: "json",
  partSlugs: ["shell-script/annual-dump", "container-recipe/postgres-annual-dump-image"],
} as const satisfies WorkspacePackage
