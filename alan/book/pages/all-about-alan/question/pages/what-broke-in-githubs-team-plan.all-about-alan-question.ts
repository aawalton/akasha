import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatBrokeInGithubsTeamPlan = {
  id: "01a077ee-76c6-7bc2-9856-bfc6f48b7936",
  type: "all-about-alan-question",
  slug: "what-broke-in-githubs-team-plan",
  topic: "all-about-alan-topic/how-my-services-decide-to-deploy",
  ask: "What exactly broke in GitHub's team plan when I broke it as an individual in January, and what was the limit?",
} as const satisfies AllAboutAlanQuestion
