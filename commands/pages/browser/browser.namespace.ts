import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const browser = {
  id: "01a07bcb-0b96-7d87-888f-325a70adf3df",
  pageTypeSlug: "namespace",
  slug: "browser",
  definition: "a site driven through the test harness",
  parts: ["command/browser-test-storage-state", "command/browser-test-verify-render"],
} as const satisfies Namespace
