import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const rumination = {
  id: "01a06559-9d65-7601-b282-99807b135266",
  type: "page-type/all-about-alan-topic",
  slug: "rumination",
  title: "Rumination",
  definition: "a thought my mind grabs and grinds when I go to sleep stressed",
  parents: ["all-about-alan-topic/how-my-attention-works"],
  settled:
    "Stress starts it, not an idle mind. The worry is the stress finding a face to wear, and the thought it grabs matches the size of the stress.\n\nIt grinds only where the thought is important, unsolved and open. Anything else rides along and fades.\n\nAn unimportant loop closes the moment I decide not to do it. An important unsolved one cannot be closed that way, so there it is to be ground.\n\nIt is conscious focus, so it holds me awake, and the grip releases as soon as my attention moves off it.\n\nThe thing that solves problems for me latches onto the same kind of object and runs in the opposite mode, while I am not looking. Two engines sharing an object rather than one engine with two faces.\n\nReal solving lives in swapping between the two: focus loads and tests, diffuse assembles, focus checks. Rumination is that swapping jammed in focus, which is why it neither solves nor lets me sleep.\n\nA low-grade anchor crowds it out. Doing nothing does not, and a high-intensity one would never give out.",
} as const satisfies AllAboutAlanTopic
