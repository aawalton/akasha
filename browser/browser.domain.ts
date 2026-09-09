import type { Domain } from "../domains/domain.page-type.ts"

export const browser = {
  id: "01a06346-df12-7000-82c1-3f46040c2442",
  pageTypeSlug: "domain",
  slug: "browser",
  definition: "a browser driven from code, and what is kept of a run",
  parts: ["domain/browser-commands", "domain/browser-launch-env", "domain/browser-test-harness"],
} as const satisfies Domain
