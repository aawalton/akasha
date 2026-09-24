import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const browser = {
  id: "01a07bcb-0b96-7d87-888f-325a70adf3df",
  type: "page-type/namespace",
  slug: "browser",
  definition: "a site driven through the test harness",
  parts: [
    "command/browser-screenshot",
    "command/browser-test-verify-render",
    "command/browser-sign-in",
  ],
  name: "browser",
} as const satisfies Namespace
