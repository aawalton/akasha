import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatPending = {
  id: "01a0657f-4492-7003-914d-556c08c04bef",
  type: "page-type/domain",
  slug: "seat-pending",
  definition: "a seat's pendency, read from files and kept true as those files change",
  parts: ["module/pending-from-files", "module/pending-maintaining"],
} as const satisfies Domain
