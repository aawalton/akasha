import type { Namespace } from "../../namespaces/namespace.page-type.types.ts"

export const iosApp = {
  id: "01a08cfb-bfa1-7052-b2ad-fce2dc8bdbcb",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "ios-app",
  definition: "the iOS apps akasha carries",
  parts: ["command/ios-app-build"],
} as const satisfies Namespace
