import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeAgentFolder = {
  id: "01a07cc2-5592-76c0-9945-aa8a44a111d0",
  type: "page-type/domain",
  slug: "change-agent-folder",
  definition: "a change an agent makes to a whole folder",
  parts: ["change-agent/move-folder", "change-agent/nest-modules", "change-agent/remove-folder"],
  createdAt: "2026-09-07T16:45:05.810Z",
  updatedAt: "2026-09-25T13:29:24.000Z",
} as const satisfies Domain
