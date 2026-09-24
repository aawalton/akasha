import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatWorkRestart = {
  id: "01a09c76-b2be-7707-bd70-5331e793850e",
  type: "page-type/domain",
  slug: "seat-work-restart",
  definition: "a seat nudged back into its work after a limit or a wait",
  parts: [
    "module/supervisor-limit-resume",
    "module/supervisor-limit-resume-answer",
    "module/supervisor-limit-resume-decide",
    "module/supervisor-limit-resume-effects",
    "module/supervisor-limit-resume-send",
    "module/supervisor-wait-resume",
    "module/supervisor-wait-resume-answer",
    "module/supervisor-wait-resume-decide",
    "module/turn-end-error-death",
  ],
} as const satisfies Domain
