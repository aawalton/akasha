import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const trustingAPersonNotAnInstitution = {
  id: "01a06559-9d65-747c-939b-e34605d602a7",
  pageTypeSlug: "all-about-alan-topic",
  slug: "trusting-a-person-not-an-institution",
  title: "Trusting A Person Not An Institution",
  definition:
    "leaning on one practitioner rather than on an institution, and what that trades away",
  parentSlugs: ["which-organisations-i-trust"],
  relatedSlugs: ["how-i-grade-an-organisation", "when-a-company-changes-hands"],
  settled:
    "The local ones I rely on are individual people: my doctor, the children's dentist, the garage.\n\nAn institution holds the standard when its people change. A person carries it himself and takes it with him.",
  unsettled:
    "Nothing tracks their ages, their succession plans or the signs one is about to sell, and no second provider stands behind any of them.\n\nLosing one would move a whole layer of the cascade rather than costing a single dependency, and that has never been priced.\n\nThe places we eat sit in the audit as one lump, which the framework refuses everywhere else, so nothing says which are worth cultivating.",
} as const satisfies AllAboutAlanTopic
