import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiImage = {
  id: "01a08298-2b33-76a0-9f39-dabb8086dfe3",
  type: "page-type/route",
  slug: "alan-web-api-image",
  definition: "the image a browser asks for",
  code: "ts",
  urlPath: "api/image/:imageId",
  createdAt: "2026-09-08T19:56:45.747Z",
  updatedAt: "2026-10-30T16:53:56.079Z",
} as const satisfies Route
