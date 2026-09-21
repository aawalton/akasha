import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereACandidateModelComesFrom = {
  id: "01a0c5a9-3bf1-7320-89af-c7a2a44fde1f",
  type: "page-type/all-about-alan-topic",
  slug: "where-a-candidate-model-comes-from",
  title: "Where A Candidate Model Comes From",
  definition: "two channels generating candidates, one while I work and one while I do not",
  parents: ["all-about-alan-topic/how-an-idea-sits-before-it-compacts"],
  related: ["all-about-alan-topic/how-understanding-arrives"],
  settled:
    "Where a candidate compact structure comes from is half conscious and half not, and both sides generate candidates. It runs on Barbara Oakley's focus mode and diffuse mode.\n\nThe focused channel produces candidates while I am deliberately working the problem.\n\nThe diffuse channel produces them when I am not thinking about it at all. The clearest case is the first moment of the morning: the candidate is already there, built whole, handed over. I never watch it assemble.\n\nThe solver is the alternation rather than either channel alone. Focus loads and tests, diffuse assembles, focus comes back to check.",
} as const satisfies AllAboutAlanTopic
