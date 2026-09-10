import type { PersonAccess } from "../person-access.page-type.types.ts"

export const alanDatabaseRowAll = {
  id: "01a05433-f100-7fa0-9ef6-d999cb540ee9",
  pageTypeSlug: "person-access",
  type: "person-access",
  slug: "alan-database-row-all",
  person: "alan",
  accessKind: "database-row",
  target: "all",
} as const satisfies PersonAccess
