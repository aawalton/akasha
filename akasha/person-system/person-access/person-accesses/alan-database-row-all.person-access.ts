import type { PersonAccess } from "../person-access.page-type.ts"

export const alanDatabaseRowAll = {
  id: "01a05433-f100-7fa0-9ef6-d999cb540ee9",
  pageTypeSlug: "person-access",
  slug: "alan-database-row-all",
  personAccessPersonSlug: "alan",
  personAccessKind: "database-row",
  personAccessTarget: "all",
} as const satisfies PersonAccess
