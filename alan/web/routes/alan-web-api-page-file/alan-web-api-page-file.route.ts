import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPageFile = {
  id: "01a0d4ab-e2a3-7918-92c5-98ade7912a09",
  type: "page-type/route",
  slug: "alan-web-api-page-file",
  definition: "the file beside a page a reader's browser asks for by its property",
  code: "ts",
  urlPath: "api/page-file/:pageTypeSlug/:slug/:key",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is answered only to a reader who reads its page type unnarrowed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text is answered as plain text, so a browser shows it rather than running it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that is no image and no text is answered as bytes to keep.",
    },
  ],
} as const satisfies Route
