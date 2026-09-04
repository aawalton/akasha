import type { Question } from "../question.page-type.ts"

export const answerOrRefuseCurrentlySitsOnDomainPagesSystemWhich = {
  id: "01a047db-c58b-7000-859c-365c44b71732",
  pageTypeSlug: "question",
  slug: "answer-or-refuse-currently-sits-on-domain-pages-system-which",
  ask: "Answer Or Refuse currently sits on domain/pages-system, which reaches three places it holds. Should it move to domain/code-quality, which reaches all of them?",
  askedBy: "astra",
  askedIn: "01a04357-3025-7000-b40c-ef42fdbc377e",
  status: "open",
  offered: [
    "Move it to code-quality",
    "Leave it on pages-system",
    "Somewhere else — I will say where",
  ],
  context: "txt",
} as const satisfies Question
