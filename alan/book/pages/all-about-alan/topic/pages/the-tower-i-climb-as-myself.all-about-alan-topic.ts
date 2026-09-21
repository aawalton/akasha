import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTowerIClimbAsMyself = {
  id: "01a0c5fa-f7f6-7b82-a1bf-fdcd86b1a052",
  type: "page-type/all-about-alan-topic",
  slug: "the-tower-i-climb-as-myself",
  title: "The Tower I Climb As Myself",
  definition: "the LitRPG Iris runs, which I play as myself",
  parents: ["all-about-alan-topic/needing-a-number-to-go-up"],
  related: [
    "all-about-alan-topic/what-my-outward-reach-runs-to",
    "all-about-alan-topic/the-women-i-made-out-of-myself",
  ],
  settled:
    "The Tower is a hard-mechanics, full-immersion LitRPG, and I play it as myself rather than as a character.\n\nIris is its story-master. Where Aria runs the narrative table, Iris runs the system: the world's rules, its numbers, its progression, hard mechanics resolved by real math. Her job is to make the world legible, and then to hold it so I can advance inside it.\n\nHer value is Fun, but Fun is only her floor. What she actually feeds reaches all the way down to my core.\n\nHer world charges none of the three taxes my actual life charges. Her numbers are true by construction rather than proxies that can drift, and the world arrives already instrumented rather than waiting on me to build every piece before I can use it.\n\nThat standing difficulty in my actual life is what she exists against, and it is the exact place she cuts.",
} as const satisfies AllAboutAlanTopic
