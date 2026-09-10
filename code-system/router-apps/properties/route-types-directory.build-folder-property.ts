import type { BuildFolderProperty } from "akasha/pages/build-folder-properties/build-folder-property.page-type.types.ts"

export type RouteTypesDirectory = true

export const routeTypesDirectory = {
  id: "01a081ef-9db2-73df-a50c-49b9d87041b9",
  pageTypeSlug: "build-folder-property",
  type: "build-folder-property",
  slug: "route-types-directory",
  propertySlug: "route-types-directory",
  definition: "the route types a typegen writes for an app",
  folderName: ".react-router",
} as const satisfies BuildFolderProperty
