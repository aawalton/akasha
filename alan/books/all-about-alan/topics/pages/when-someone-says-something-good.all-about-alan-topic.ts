import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whenSomeoneSaysSomethingGood = {
  id: "01a06559-9d65-76bd-98a7-de33a9e84036",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "when-someone-says-something-good",
  title: "When Someone Says Something Good",
  definition: "why praise so rarely lands on me, and what it takes when it does",
  parents: ["alan"],
  related: ["being-met", "why-i-have-to-be-perfect", "safety-bar"],
  settled:
    "I have had appreciation in large amounts and I am not sure I have ever received any of it.\n\nPraise has to be true, meant, valuable and not incidental, all at once as it is said. Criticism needs one of two.\n\nThe check happens at delivery. It does not have to agree with a verdict I already hold.\n\nWhat passes the true test is an undisputable specific I already hold, rather than a global verdict I would take on faith.",
} as const satisfies AllAboutAlanTopic
