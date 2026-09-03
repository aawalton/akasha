import type { Question } from "../question.page-type.ts"

export const bunOpsAgentListNowPrintsTheAddressableHandleProject = {
  id: "019fa7d6-a218-7436-9be2-29ad97ad8d07",
  pageTypeSlug: "question",
  slug: "bun-ops-agent-list-now-prints-the-addressable-handle-project",
  ask: "`bun ops agent list` now prints the addressable handle (`project-16255`) where it used to print the project title. Does losing that title cost you something on a line you read constantly?",
  askedBy: "athena",
  askedIn: "019f9d68-65b6-7dd3-a6ed-77f8b0d9b6e4",
  status: "answered",
  offered: [
    "Keep the handle — the change stands",
    "Restore the title — I read subject matter more than I act on handles",
    "Handle plus a truncated title if it fits one line",
  ],
  answer: "Keep the handle — the change stands",
  closedAt: "2026-07-28T08:28:24.971Z",
  context: "txt",
} as const satisfies Question
