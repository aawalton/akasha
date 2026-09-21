import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTwoSystemsThatStayed = {
  id: "01a0c5f2-cbf3-7e28-b1e5-9eb058c3f805",
  type: "page-type/all-about-alan-topic",
  slug: "the-two-systems-that-stayed",
  title: "The Two Systems That Stayed",
  definition: "the two permanent layers of the harness, and what each was built against",
  parents: ["all-about-alan-topic/the-scaffolding-i-built"],
  related: [
    "all-about-alan-topic/how-the-harness-began",
    "all-about-alan-topic/the-ceiling-of-one-times",
    "all-about-alan-topic/which-frameworks-take-in-me",
  ],
  settled:
    "The first was task management. I was juggling too much and dropping balls. I was introduced to Getting Things Done and adapted it into my first productivity harness.\n\nIts creed is that your head is for having ideas, not for holding them. For most people that is a slogan. For me it is an accurate description of the hardware.\n\nIt still works today. I have kept adapting the implementation and I have not outgrown the principles. It became bedrock rather than something I moved past.\n\nStress capacity management has been the second really consistent system for most of the past twenty years. Everything else has been smaller and comes and goes.\n\nThe two are the same kind of thing. Each one guards a budget I can run past without noticing, and each was built when overload first pushed that budget over. One watches how much my head can track before it drops something. The other watches how much I can carry before I buckle.",
} as const satisfies AllAboutAlanTopic
