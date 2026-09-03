import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howIPreventACategoryOfWrong = {
  id: "01a04615-e75d-75d0-b3fd-9d09d8b9b090",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-i-prevent-a-category-of-wrong",
  title: "How I Prevent A Category Of Wrong",
  definition: "what I do with a failure once I have seen it",
  parentSlugs: ["the-scaffolding-i-built"],
  relatedSlugs: [
    "what-the-book-of-me-is-for",
    "why-i-rebuilt-everything",
    "how-many-checks-i-run",
    "the-three-ways-an-agent-gets-it-wrong",
  ],
  settled:
    "For every failure I ask what went wrong, and how that category of wrong can be prevented.\n\nSome things can be prevented programmatically, through checks or architecture. Some only through agent instructions.\n\nChecks always win. Instructions are only for things a check cannot catch.\n\nThat includes telling agents what the checks are catching, so agents do not corrupt the checks.\n\nThe failure neither a check nor an instruction can prevent is agents not knowing what is in my head.",
  unsettled:
    "Abby's reading: the residue is what this book is for, and the interview is the only instrument aimed at it. Nothing yet says how much of it an interview can actually reach.\n\nChecks always winning is a rule I stated and no domain carries. Where it should live, so it binds rather than only describes me, is unsettled.",
} as const satisfies AllAboutAlanTopic
