import type { Route } from "@akasha/code/route"

export const alanWebApiSave = {
  id: "01a08834-2110-7c75-8b49-447fda981ae9",
  pageTypeSlug: "route",
  slug: "alan-web-api-save",
  definition: "the idle save a reader's game is kept as",
  code: "ts",
  urlPath: "api/save",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body that parses as an intent to pull is answered with the pull's outcome.",
    },
    {
      invariantKind: "departure",
      statement: "Any other body is taken as the whole save.",
    },
  ],
} as const satisfies Route
