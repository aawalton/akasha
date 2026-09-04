import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howIDecide = {
  id: "01a06559-9d65-7446-967f-78677e555d5f",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-i-decide",
  title: "How I Decide",
  definition: "how I pick what to do, and what stops me picking badly",
  parentSlugs: ["alan"],
  unsettled:
    "I iterate a rubric until it coheres, and what tells me the loop is done — a fixed point where no pair flips, or something else — is unstated.\n\nI tell a gestalt that carries signal from one that is noise by checking it for consistency in aggregate, which only works afterwards. Whether anything tells them apart in the moment is unexamined.\n\nWhether I think in maths-shaped frames more widely, monotonic progress and convergence and optimisation, or whether that is one borrowed frame, is unprobed.",
} as const satisfies AllAboutAlanTopic
