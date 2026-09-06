import type { Question } from "../question.page-type.ts"

export const beforeWeRenameLibaddonmenu20AndLibcustommenuToTempe = {
  id: "019f999c-5316-73bc-a560-256c5f3681ee",
  pageTypeSlug: "question",
  slug: "before-we-rename-libaddonmenu-2-0-and-libcustommenu-to-tempe",
  ask: "Before we rename LibAddonMenu-2.0 and LibCustomMenu to Temper identity, TamrielTradeCentre will lose both dependencies and stop loading in your game. Do you want to install the real ones from Minion first so TTC keeps working, or should we go ahead and let TTC break?",
  askedBy: "ember",
  askedIn: "019f32f0-ea53-7940-9596-1613e218bb1f",
  status: "answered",
  offered: [
    "I'll install both from Minion — tell me when you need them",
    "Go ahead and rename; I don't mind TTC breaking",
    "Hold those two until I decide",
  ],
  answer: "Can you do the rename and the install for the two TTC deps from the source?",
  closedAt: "2026-07-25T14:10:41.210Z",
  context: "txt",
} as const satisfies Question
