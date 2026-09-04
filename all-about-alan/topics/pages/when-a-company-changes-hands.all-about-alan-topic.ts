import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whenACompanyChangesHands = {
  id: "01a06559-9d65-7c34-8e9a-706c90c3d819",
  pageTypeSlug: "all-about-alan-topic",
  slug: "when-a-company-changes-hands",
  title: "When A Company Changes Hands",
  definition: "a trusted organisation changing owners or leaders puts its trust back to zero",
  parentSlugs: ["which-organisations-i-trust"],
  relatedSlugs: ["how-i-grade-an-organisation", "getting-out-from-under-a-dependency"],
  settled:
    "The old record tells me what the old entity did, not what the new one will do.\n\nA sale, a flotation, an acquisition, a new chief, a reshuffled board or a rewritten mission each counts.\n\nI would rather reset one that was fine than keep leaning on one that has changed, so the list is deliberately wide.\n\nRe-earning is quick, because everyone's first decisions under pressure right now show up fast.\n\nI only notice reactively, when the service gets worse, and then go and look at who owns it.",
  unsettled:
    "A successor structurally aligned, a co-op or a trust, should shorten the watching. How short has no rule.\n\nWhat to actually look for in a new charter or mission statement at the moment of change has never been set out.\n\nWhether long-serving staff count as continuity once the leaders turn over is unsettled. My leaning is no.\n\nNothing tells me one has changed hands but the service getting worse. A watcher reading filings and governance on a schedule is named in my own framework and does not exist.",
} as const satisfies AllAboutAlanTopic
