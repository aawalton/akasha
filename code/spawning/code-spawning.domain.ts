import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeSpawning = {
  id: "01a05d20-8005-763f-8c3e-b80bd06da1d2",
  type: "page-type/domain",
  slug: "code-spawning",
  definition: "how a process starts another process",
  parts: ["module/running", "module/process-holding", "module/stall-noting"],
  createdAt: "2026-09-01T13:20:06.149Z",
  updatedAt: "2026-10-18T14:47:07.974Z",
} as const satisfies Domain
