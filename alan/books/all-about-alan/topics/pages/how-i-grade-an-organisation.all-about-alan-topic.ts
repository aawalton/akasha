import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const howIGradeAnOrganisation = {
  id: "01a06559-9d65-7464-a706-4605f215e681",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "how-i-grade-an-organisation",
  title: "How I Grade An Organisation",
  definition: "one letter for how far I trust them today, and what each letter means",
  parents: ["which-organisations-i-trust"],
  related: ["getting-out-from-under-a-dependency"],
  settled:
    "A needs a structure that holds when the people change. B is strong with one reservation. C is no information either way. D is a cost I knowingly carry. F is get out whatever it costs.\n\nThe worst part sets the letter, however strong the rest are.\n\nIt grades one product rather than a whole company, and a troubled industry sets the starting letter until company evidence moves it.\n\nWhere no exit exists at any price, the letter says what I would do and the plan becomes staying small and watching.",
} as const satisfies AllAboutAlanTopic
