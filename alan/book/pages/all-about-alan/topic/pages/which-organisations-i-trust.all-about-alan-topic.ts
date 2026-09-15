import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whichOrganisationsITrust = {
  id: "01a06559-9d65-7130-b950-81c0f767d8cd",
  type: "page-type/all-about-alan-topic",
  slug: "which-organisations-i-trust",
  title: "Which Organisations I Trust",
  definition: "the test an organisation has to pass before I will rely on it",
  parents: ["all-about-alan-topic/alan"],
  related: ["all-about-alan-topic/who-is-safe-to-be-around"],
  settled:
    "Decades of track record, plus visibly refusing to yield when pushed.\n\nStated values are not evidence. Only behaviour under pressure counts.\n\nEveryone is being tested right now, so recent behaviour carries the strongest signal and nobody is grandfathered.\n\nIf I cannot trust them to survive I cannot trust them, so stability sits on the same axis.",
} as const satisfies AllAboutAlanTopic
