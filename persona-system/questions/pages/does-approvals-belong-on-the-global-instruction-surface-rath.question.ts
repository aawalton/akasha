import type { Question } from "../question.page-type.ts"

export const doesApprovalsBelongOnTheGlobalInstructionSurfaceRath = {
  id: "019fb427-61e6-7fab-a9a2-8b8a5236d94f",
  pageTypeSlug: "question",
  slug: "does-approvals-belong-on-the-global-instruction-surface-rath",
  ask: "Does `# Approvals` belong on the global instruction surface rather than in the code repo's root `CLAUDE.md`?",
  askedBy: "aine",
  askedIn: "019fb30c-3cbe-7700-91df-83950a893ac9",
  status: "answered",
  offered: [
    "Move all of it to Global Scope in ~/instructions/docs/CLAUDE.md",
    "Split it — the three general exceptions go global, the suppression-gate bullet stays in code",
    "Leave it in the code repo; accept the seven crossings",
  ],
  answer: "Let’s talk about it when I get back",
  closedAt: "2026-07-30T21:01:29.805Z",
  context: "txt",
} as const satisfies Question
