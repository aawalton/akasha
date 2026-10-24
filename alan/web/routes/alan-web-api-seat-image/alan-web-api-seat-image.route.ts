import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiSeatImage = {
  id: "01a0d49f-ffe0-7a3c-9a82-45a6c09b5b3a",
  type: "page-type/route",
  slug: "alan-web-api-seat-image",
  definition: "an image the signed-in person attaches to a message from a seat's page",
  code: "ts",
  urlPath: "api/seat/image",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and keeps nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image names the seat it is for by that seat's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image for a seat its sender may not read is refused and keeps nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image is kept as an image page, and the answer names that page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image arrives as jpg bytes, and any other bytes are answered 415.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Keeping an image sends no message, so an image kept and never sent reaches no seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image the pages service would not keep is answered 503.",
    },
  ],
  createdAt: "2026-09-24T18:14:10.656Z",
  updatedAt: "2026-10-24T17:06:52.994Z",
} as const satisfies Route
