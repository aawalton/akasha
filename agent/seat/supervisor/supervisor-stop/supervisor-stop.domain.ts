import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorStop = {
  id: "01a09c5e-33e0-7824-a49b-55dffd8e1a86",
  type: "page-type/domain",
  slug: "supervisor-stop",
  definition: "a supervisor stopped",
  parts: [
    "module/supervisor-lifecycle",
    "module/supervisor-lifecycle-death-write",
    "module/supervisor-shutdown-procs",
    "module/supervisor-terminal",
  ],
  createdAt: "2026-09-13T20:03:34.496Z",
  updatedAt: "2026-09-24T17:14:29.000Z",
} as const satisfies Domain
