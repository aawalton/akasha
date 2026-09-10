import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const geoIo = {
  id: "01a05c48-deeb-7000-a8e9-296daa14b0c7",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "geo-io",
  definition: "a point on the earth, found by the name of a place and measured against another",
  parts: ["module/coord", "module/geoapify"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here has an api key.",
    },
  ],
} as const satisfies Domain
