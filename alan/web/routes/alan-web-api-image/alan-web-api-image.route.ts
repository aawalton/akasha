import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiImage = {
  id: "01a08298-2b33-76a0-9f39-dabb8086dfe3",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-image",
  definition: "the image a reader's browser asks for by id",
  code: "ts",
  urlPath: "api/image/:imageId",
} as const satisfies Route
