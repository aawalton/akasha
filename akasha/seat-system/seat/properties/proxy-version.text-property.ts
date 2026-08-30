import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type ProxyVersion = string

export const proxyVersion = {
  id: "01a0540c-dbc1-7fb4-9fa4-54d2c5594de8",
  pageTypeSlug: "text-property",
  slug: "proxy-version",
  propertySlug: "version",
  definition: "the build of the proxy serving a seat",
  max: 64,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A build is named by the digest of the source it was built from, so two builds of one source carry one name.",
    },
  ],
} as const satisfies TextProperty
