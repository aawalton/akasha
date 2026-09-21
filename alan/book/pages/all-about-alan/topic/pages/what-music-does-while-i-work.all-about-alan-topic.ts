import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatMusicDoesWhileIWork = {
  id: "01a0c5ed-0f9e-7400-aade-b609c2252d01",
  type: "page-type/all-about-alan-topic",
  slug: "what-music-does-while-i-work",
  title: "What Music Does While I Work",
  definition: "the two separate things music does at my desk, on two independent dimensions",
  parents: ["all-about-alan-topic/how-a-song-reaches-me"],
  related: [
    "all-about-alan-topic/how-stimulated-i-am",
    "all-about-alan-topic/which-way-my-focus-is-wandering",
  ],
  settled:
    "Music is off by default. It is a top-up I reach for when I am understimulated, and some days I run none at all. It also feeds the executive function my ADHD is short of.\n\nUnlike the game it does two separable jobs.\n\nThe words compete with hard collaborative work. Difficult agent work is words all the way down, reading and reasoning and writing back, and lyrics take the same lane. I have a hard time doing it with music running sometimes. Routine work is much easier.\n\nIt is definitely the words. Sometimes the lyrics fall to background and the conflict drops. Instrumental basically never conflicts.\n\nThe sound itself still carries stimulation, words or not. Instrumental can still overstimulate.\n\nSo the two failures are independent. One is about the kind of work and only lyrics trigger it. The other is about the level of input and needs no words. Instrumental during collaborative work is safe on the first and still live on the second.",
} as const satisfies AllAboutAlanTopic
