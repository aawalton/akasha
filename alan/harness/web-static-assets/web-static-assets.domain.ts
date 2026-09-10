import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const webStaticAssets = {
  id: "01a05c48-deeb-7005-87e8-e99206ff06ca",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "web-static-assets",
  definition: "a built file handed back from disk with the cache lifetime it is given",
  parts: ["module/serve-static"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hashed asset is cached for a year and everything else for an hour.",
    },
  ],
} as const satisfies Domain
