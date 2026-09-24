import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const geoIo = {
  id: "01a05c48-deeb-7000-a8e9-296daa14b0c7",
  type: "page-type/domain",
  slug: "geo-io",
  definition: "how places are found by name",
  parts: ["module/geoapify"],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here has an api key.",
    },
  ],
} as const satisfies Domain
