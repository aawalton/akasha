import type { Question } from "../question.page-type.ts"

export const for1599315988DoYouWantToSpend3MinutesInGameToUn = {
  id: "019f99d7-aebc-7585-9e87-b7accbcd8b18",
  pageTypeSlug: "question",
  slug: "for-15993-15988-do-you-want-to-spend-3-minutes-in-game-to-un",
  ask: "For #15993/#15988: do you want to spend ~3 minutes in-game to unblock M1 today, or wait for the extraction that takes you out of both rows permanently?",
  askedBy: "aine",
  askedIn: "019f93a6-67c0-7174-a75d-40ae007e92e4",
  status: "answered",
  offered: ["Extract — take me out of the loop", "I'll do it in-game, fix the ask first"],
  answer:
    "Links pass\n\nAssume success for all in-game checks for now, we’ll do a comprehensive functionality audit after we have agent driven in-game testing, likely later today.",
  closedAt: "2026-07-25T15:15:52.297Z",
  context: "txt",
  links: [
    {
      label: "#15993 on the web",
      target: "https://alanwalton.com/project/1c4fafa2",
      platform: "web",
    },
    {
      label: "#15993 in-app",
      target: "/project/1c4fafa2",
      platform: "native",
    },
  ],
} as const satisfies Question
