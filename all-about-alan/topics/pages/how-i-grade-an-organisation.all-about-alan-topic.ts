import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howIGradeAnOrganisation = {
  id: "01a06559-9d65-7464-a706-4605f215e681",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-i-grade-an-organisation",
  title: "How I Grade An Organisation",
  definition: "one letter for how far I trust them today, and what each letter means",
  parentSlugs: ["which-organisations-i-trust"],
  relatedSlugs: ["getting-out-from-under-a-dependency"],
  settled:
    "A needs a structure that holds when the people change. B is strong with one reservation. C is no information either way. D is a cost I knowingly carry. F is get out whatever it costs.\n\nThe worst part sets the letter, however strong the rest are.\n\nIt grades one product rather than a whole company, and a troubled industry sets the starting letter until company evidence moves it.\n\nWhere no exit exists at any price, the letter says what I would do and the plan becomes staying small and watching.",
  unsettled:
    "How the component scores combine into a letter has never been written down, and whether a component under a line should cap the grade however strong the rest are is undecided.\n\nOwnership is named as significant and is still not scored, with no bands set for publicly traded, private, mutual, co-operative, purpose trust or employee-owned.\n\nThe research prompt does not look for the events that reset trust: a founder selling, a flotation, a change of leadership, a rewritten mission.",
} as const satisfies AllAboutAlanTopic
