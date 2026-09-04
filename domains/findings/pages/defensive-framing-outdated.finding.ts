import type { Finding } from "../finding.page-type.ts"

export const defensiveFramingOutdated = {
  id: "01a06555-9f3d-79a4-b1f7-d145343bcb74",
  pageTypeSlug: "finding",
  slug: "defensive-framing-outdated",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's personal-freedom thesis has been corrected to hold that sovereignty is a positive good — freedom to, not only freedom from — and the corpus around it still reads defensively. The reasoning that every dependence is an exposure runs through the audit files, the not-needing direction is written as subtraction, and the remediation logic reads purely as reducing exposure. The correction landed in one place and the writing it supersedes stands everywhere else.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 54 as `FRAME/freedom-to-reconcile` (was item 63), which records the correction as landed at `notes/thesis.md#freedom-to-not-only-freedom-from--sovereignty-is-a-positive-good` and names the audit files, `notes/alternatives.md` and the remediation logic as where the defensive-only reading persists. It is filed as landing in edits in place rather than as a new note.\n\nThis is one of the few items in the theme that is a state of the corpus rather than an unanswered question, which is why I could state it as something that is so.\n\nWhat I did not measure: I did not read `notes/thesis.md` or any audit file, so both that the correction landed and that the older framing persists elsewhere are the backlog's account, and I did not count how many places carry it.",
} as const satisfies Finding
