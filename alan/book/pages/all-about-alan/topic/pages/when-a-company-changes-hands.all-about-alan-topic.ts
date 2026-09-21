import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenACompanyChangesHands = {
  id: "01a06559-9d65-7c34-8e9a-706c90c3d819",
  type: "page-type/all-about-alan-topic",
  slug: "when-a-company-changes-hands",
  title: "When A Company Changes Hands",
  definition: "a trusted organisation changing owners or leaders puts its trust back to zero",
  parents: ["all-about-alan-topic/which-organisations-i-trust"],
  related: [
    "all-about-alan-topic/how-i-grade-an-organisation",
    "all-about-alan-topic/getting-out-from-under-a-dependency",
  ],
  settled:
    "The old record tells me what the old entity did, not what the new one will do.\n\nA sale, a flotation, an acquisition, a new chief, a reshuffled board or a rewritten mission each counts. So does a government service changing hands: a regulator restructured, new elected leadership over it, or a visible capture such as a revolving-door appointment.\n\nI would rather reset one that was fine than keep leaning on one that has changed, so the list is deliberately wide. A board that drifts over years I treat as one trigger per change.\n\nRe-earning is quick, because everyone's first decisions under pressure right now show up fast. A sale to a co-op or a mission trust still resets, with a shorter watch. How much shorter I have no rule for.\n\nI only notice reactively, when the service gets worse, and then go and look at who owns it.\n\nThe right answer is a watch I build myself, reading news and filings per entity on a schedule. Renting that would move the trust problem up a layer.",
} as const satisfies AllAboutAlanTopic
