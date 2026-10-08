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
  createdAt: "2026-09-07T12:14:59.478Z",
  updatedAt: "2026-09-24T18:26:09.000Z",
} as const satisfies Namespace
