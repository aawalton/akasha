import type { Domain } from "../../domains/domain.page-type.ts"

export const postgresAnnualDump = {
  id: "01a06865-c012-7000-8a01-503775ee557e",
  pageTypeSlug: "domain",
  slug: "postgres-annual-dump",
  definition: "the yearly whole copy of the database, and what it is taken by",
  parts: [
    "manifest/postgres-annual-dump-manifests",
    "shell-script/annual-dump",
    "container-recipe/postgres-annual-dump-image",
  ],
} as const satisfies Domain
