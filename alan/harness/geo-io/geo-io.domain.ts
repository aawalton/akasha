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
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies Domain
