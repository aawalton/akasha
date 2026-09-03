import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const postgresAnnualDump = {
  id: "01a06865-c012-7000-8a01-9d3f2c410001",
  pageTypeSlug: "workspace-package",
  slug: "postgres-annual-dump",
  definition: "the yearly whole copy of the database, and what it is taken by",
  manifest: "json",
  partSlugs: ["shell-script/annual-dump", "container-recipe/postgres-annual-dump-image"],
} as const satisfies WorkspacePackage
