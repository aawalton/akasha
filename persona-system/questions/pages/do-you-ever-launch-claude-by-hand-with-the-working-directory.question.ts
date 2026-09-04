import type { Question } from "../question.page-type.ts"

export const doYouEverLaunchClaudeByHandWithTheWorkingDirectory = {
  id: "019fc29c-5084-7870-a6fc-cea1277433b7",
  pageTypeSlug: "question",
  slug: "do-you-ever-launch-claude-by-hand-with-the-working-directory",
  ask: "Do you ever launch `claude` by hand with the working directory `~/code`?",
  askedBy: "athena",
  askedIn: "019fbe77-9633-7424-b64f-a1773564a32b",
  status: "answered",
  offered: ["No, delete it", "Yes, keep it and add the check"],
  answer:
    "No, we should have a single settings.json that lives in the instructions repo and that should be used for both headless and (through spawn) interactive agents (through the bash aliases)",
  closedAt: "2026-08-02T13:15:16.669Z",
  context: "txt",
} as const satisfies Question
