import type { Question } from "../question.page-type.ts"

export const rcCheckDoesRhiaShowAsDisconnectedInYourClaudeCode = {
  id: "019f6e0d-a1de-7b6f-b789-4b611854e4e1",
  pageTypeSlug: "question",
  slug: "rc-check-does-rhia-show-as-disconnected-in-your-claude-code",
  ask: "RC check: does rhia show as disconnected in your Claude Code app right now?",
  askedBy: "athena",
  askedIn: "019f3c82-e54b-7d9f-a0a0-b4d376196141",
  status: "answered",
  offered: ["Dark — restart her", "She looks fine"],
  context: "txt",
} as const satisfies Question
