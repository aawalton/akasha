import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type ProxyVersion = string

export const proxyVersion = {
  id: "01a05035-2609-7a16-af9b-1c37a51ed418",
  pageTypeSlug: "text-property",
  slug: "proxy-version",
  definition: "the build of the proxy serving a seat",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
