import type { Route } from "@akasha/code/route"

export const alanWebApiMediaToken = {
  id: "01a0882f-3b1a-70b3-a4fd-b2024b64f672",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-media-token",
  definition: "the token a reader's browser fetches a medium with",
  code: "ts",
  urlPath: "api/media/token",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token is good for an hour.",
    },
    {
      invariantKind: "departure",
      statement: "A reader who is not signed in is refused before the medium is looked for.",
    },
  ],
} as const satisfies Route
