import type { Notice } from "../notice.page-type.ts"

export const restartImmediate = {
  id: "01a06864-7aa3-7734-beb8-d01398581469",
  pageTypeSlug: "notice",
  slug: "restart-immediate",
  text: "md",
  warrant:
    "The restart notice a seat is respawned with, read the moment it comes back. It is one of the two the restart branch picks between.",
} as const satisfies Notice
