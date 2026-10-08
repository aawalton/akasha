import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatPending = {
  id: "01a0657f-4492-7003-914d-556c08c04bef",
  type: "page-type/domain",
  slug: "seat-pending",
  definition: "a seat's work read from files",
  parts: ["module/pending-from-files", "module/pending-maintaining"],
  createdAt: "2026-09-03T04:20:34.578Z",
  updatedAt: "2026-09-24T14:22:51.000Z",
} as const satisfies Domain
