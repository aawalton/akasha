import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorStop = {
  id: "01a09c5e-33e0-7824-a49b-55dffd8e1a86",
  type: "page-type/domain",
  slug: "supervisor-stop",
  definition: "a supervisor on its way down, and what it puts back as it goes",
  parts: [
    "module/supervisor-lifecycle",
    "module/supervisor-lifecycle-death-write",
    "module/supervisor-shutdown-procs",
    "module/supervisor-terminal",
  ],
} as const satisfies Domain
