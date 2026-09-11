import type { AllAboutAlanQuestion } from "akasha/alan/books/pages/all-about-alan/questions/all-about-alan-question.page-type.types.ts"

export const whichSongsOpenTheDoor = {
  id: "01a077e6-608a-71d8-9b35-bf6e7b879223",
  type: "all-about-alan-question",
  slug: "which-songs-open-the-door",
  topic: "how-a-song-reaches-me",
  ask: "Which songs open the door for me, and which slide past as pretty surface?",
} as const satisfies AllAboutAlanQuestion
