import type { Domain } from "../domains/domains/domain.page-type.ts"

export const browser = {
  id: "01a06346-df12-7000-82c1-3f46040c2442",
  pageTypeSlug: "domain",
  slug: "browser",
  definition: "a browser driven from code, and what is kept of a run",
  partSlugs: [
    "workspace-package/browser-commands",
    "workspace-package/browser-launch-env",
    "workspace-package/browser-test-harness",
  ],
} as const satisfies Domain
