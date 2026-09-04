import type { Notice } from "../notice.page-type.ts"

export const limitResumeNudge = {
  id: "01a06864-7aa3-7fb0-98d2-052f60167c40",
  pageTypeSlug: "notice",
  slug: "limit-resume-nudge",
  text: "md",
  warrant:
    "Goes to a seat that is alive and idle rather than respawned, whose previous turn ended at a Claude usage limit that has since cleared. These words are also the monitor's anti-hammer key: before sending, the monitor asks whether a message carrying exactly them landed recently. Editing them retires the old key, so a seat nudged under the previous wording inside that window may be nudged once more, which costs one turn and is bounded by one window.",
} as const satisfies Notice
