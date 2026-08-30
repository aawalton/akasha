import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type ProxyProcess = string

export const proxyProcess = {
  id: "01a05035-2609-7c3e-a7b9-66344cdd0b64",
  pageTypeSlug: "text-property",
  slug: "proxy-process",
  definition: "the process serving a seat its model calls, and when that process started",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
