import type { Notice } from "../notice.page-type.ts"

export const restartDeferred = {
  id: "01a06864-7aa3-7f1d-8d0e-7e8835e11fd1",
  pageTypeSlug: "notice",
  slug: "restart-deferred",
  text: "md",
  warrant:
    "Rides the seat's next real inbound rather than a restart, so hours may have passed before it is read. It goes to a seat that was idle, so it must not tell that seat to pick up what it had in hand.",
} as const satisfies Notice
