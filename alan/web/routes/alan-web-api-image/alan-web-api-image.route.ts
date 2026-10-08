import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiImage = {
  id: "01a08298-2b33-76a0-9f39-dabb8086dfe3",
  type: "page-type/route",
  slug: "alan-web-api-image",
  definition: "the image a reader's browser asks for by id",
  code: "ts",
  urlPath: "api/image/:imageId",
  createdAt: "2026-09-08T19:56:45.747Z",
  updatedAt: "2026-09-15T16:44:30.000Z",
} as const satisfies Route
