import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const thePrescriptionChainWithNoBackup = {
  id: "01a0c5a3-3155-7f8a-8d32-1321f33fa380",
  type: "page-type/all-about-alan-topic",
  slug: "the-prescription-chain-with-no-backup",
  title: "The Prescription Chain With No Backup",
  definition: "one prescriber and one pharmacy holding two prescriptions, and how that fails",
  parents: ["all-about-alan-topic/who-looks-after-our-health"],
  related: ["all-about-alan-topic/the-five-of-us"],
  settled:
    "Two prescriptions, one prescriber, one pharmacy. My Vyvanse and Joseph's Guanfacine both go the same route, end to end, with nothing beside it.\n\nMine is a schedule two controlled substance, which makes the route itself something that can be denied to me.\n\nThe shortage across 2022 and 2023 is the worked example. Federal quotas, what the makers could produce, pharmacies refusing to fill, my prescriber not reachable when a refill came due, and the insurer wanting authorisation first. Several of those fired at once.\n\nWe keep a small store at home, enough to ride out a short interruption.\n\nThat covers the short tail and nothing else. The shape of the exposure is untouched by it.",
} as const satisfies AllAboutAlanTopic
