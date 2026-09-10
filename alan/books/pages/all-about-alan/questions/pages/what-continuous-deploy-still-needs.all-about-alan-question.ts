import type { AllAboutAlanQuestion } from "../all-about-alan-question.page-type.types.ts"

export const whatContinuousDeployStillNeeds = {
  id: "01a077ee-76c7-766c-8c4b-a344c051c9ac",
  pageTypeSlug: "all-about-alan-question",
  type: "all-about-alan-question",
  slug: "what-continuous-deploy-still-needs",
  topic: "how-my-services-decide-to-deploy",
  ask: "What does continuous deploy on graph changes still need before it is running?",
} as const satisfies AllAboutAlanQuestion
