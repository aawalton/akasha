import type { Alert } from "../alert.page-type.ts"

export const supersedeCycle = {
  id: "01a06755-62fb-7f7f-a95d-62600889e3ec",
  pageTypeSlug: "alert",
  slug: "supersede-cycle",
  title: "Supersede loop",
  definition:
    "the merge queue keeps superseding batches around one entry and nothing leaves the queue",
  domain: "change-harness",
} as const satisfies Alert
