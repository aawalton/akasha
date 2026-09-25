import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const webStaticAsset = {
  id: "01a05c48-deeb-7005-87e8-e99206ff06ca",
  type: "page-type/domain",
  slug: "web-static-asset",
  definition: "how a website sends files to a browser",
  parts: ["module/build-directory", "module/serve-static"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hashed asset is cached for a year and everything else for an hour.",
    },
  ],
} as const satisfies Domain
