import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatWorkRestart = {
  id: "01a09c76-b2be-7707-bd70-5331e793850e",
  type: "page-type/domain",
  slug: "seat-work-restart",
  definition: "a seat's work restarted after a stop",
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
  createdAt: "2026-09-13T20:30:19.838Z",
  updatedAt: "2026-09-24T17:13:20.000Z",
} as const satisfies Domain
