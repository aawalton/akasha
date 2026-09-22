import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const gatewayVersion = {
  id: "01a0540c-dbc1-7fb4-9fa4-54d2c5594de8",
  type: "page-type/text-property",
  slug: "gateway-version",
  propertySlug: "version",
  definition: "the build of the proxy serving a seat",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build is named by the digest of the source the build was built from.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
