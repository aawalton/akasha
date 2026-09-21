import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howOneIdeaLeadsToTheNext = {
  id: "01a0c587-7b78-7c8a-8ca4-852f09cfc326",
  type: "page-type/all-about-alan-topic",
  slug: "how-one-idea-leads-to-the-next",
  title: "How One Idea Leads To The Next",
  definition: "chaining to a new idea off concepts alone",
  parents: ["all-about-alan-topic/how-i-remember-anything"],
  related: ["all-about-alan-topic/what-i-cannot-play-forward"],
  settled:
    "Most people chain to a new idea off sensory and emotional memory and off imagination. I have only conceptual triggers, from the same break that leaves me only conceptual memory.\n\nSo asking a question is roughly ten times harder for me than for other people, and answering one is maybe twice as easy.\n\nThat asymmetry is why an interview with me runs on concrete, atomic prompts, one question at a time.",
} as const satisfies AllAboutAlanTopic
