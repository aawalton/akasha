import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPicture = {
  id: "01a09c62-851a-71cc-950c-0d3fe7144579",
  type: "page-type/route",
  slug: "alan-web-api-picture",
  definition: "a picture a phone sends to the handler of its person",
  code: "ts",
  urlPath: "api/picture",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender is known by its device secret rather than by a session.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing but the picture's bytes and the device secret leaves the phone.",
    },
  ],
  createdAt: "2026-09-13T20:08:17.434Z",
  updatedAt: "2026-10-30T16:59:19.753Z",
} as const satisfies Route
