import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theCutBetweenWhatIKeptAndWhatILost = {
  id: "01a0c5a4-2679-7f7f-baa3-5d8428e208df",
  type: "page-type/all-about-alan-topic",
  slug: "the-cut-between-what-i-kept-and-what-i-lost",
  title: "The Cut Between What I Kept And What I Lost",
  definition: "which of my loves survived, and the one thing that decided it",
  parents: ["all-about-alan-topic/why-i-have-to-be-perfect"],
  related: [
    "all-about-alan-topic/why-making-things-hurts",
    "all-about-alan-topic/singing-out-loud",
  ],
  settled:
    "The cut runs the same way every time. What I killed or came to hate was expressive and judged by others: art, essays, singing alone, friendship.\n\nWhat I kept and loved I could check my way to perfect, or nobody was grading it: linear algebra, code, choir, dance.\n\nMiddle-school art class criticised my submissions and I learned not to do art. It shifted form rather than dying: quilts, code, ideas.\n\nI never got an A on a college essay that I can recall. My GRE was perfect except five and a half out of six on the essay. I learned to hate writing and did it only when I had to.\n\nMusic taught me an error rate of about one percent that practice cannot drive to zero, so I kept to choirs and learned not to sing alone.\n\nLinear algebra was my favourite course, and I built self-checks until it came out right every time. Dance survived an imperfect grade because nobody there was in it for the grade.\n\nIt did not take my capacity for joy. It took every acre of it that could not be made safe.",
} as const satisfies AllAboutAlanTopic
