import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsBrowserTestStorageState = {
  id: "01a06920-37f6-782b-adc5-ba7f2a9e14bb",
  pageTypeSlug: "ops-command",
  slug: "ops-browser-test-storage-state",
  definition:
    "the browser-test user signed in, and the Playwright storage state the browser MCP is seeded with.",
  opsPath: "browser-test storage-state",
  opsEntryFile: "tools/playwright-storage-state.ts",
} as const satisfies OpsCommand
