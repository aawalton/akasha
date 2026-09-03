import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const playwrightImageAlignment = {
  id: "01a06810-92ff-74c4-bc53-b8304e75b457",
  pageTypeSlug: "cluster-check",
  slug: "playwright-image-alignment",
  definition:
    "the check refusing a Playwright version the manifests, lockfile, image tags and mirrors disagree on",
  code: "ts",
  dispatchNodeTypes: [
    { nodeKind: "package" },
    { nodeKind: "json-file" },
    { nodeKind: "sh-file" },
    { nodeKind: "lock-file" },
  ],
} as const satisfies ClusterCheck
