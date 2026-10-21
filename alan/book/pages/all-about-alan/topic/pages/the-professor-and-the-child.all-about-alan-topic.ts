import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theProfessorAndTheChild = {
  id: "01a15e7e-8ad9-7f65-a561-5b12b7afee45",
  type: "page-type/all-about-alan-topic",
  slug: "the-professor-and-the-child",
  title: "The Professor And The Child",
  definition:
    "my conceptual self and my physical and emotional self, and which of them is in front",
  parents: ["all-about-alan-topic/the-three-parts-of-me"],
  related: [
    "all-about-alan-topic/punished-by-my-other-half",
    "all-about-alan-topic/being-autistic",
  ],
  settled:
    "For a while I have had a mental model of two fundamental neurodiversities in my life: AuDHD and aphantasia. In a conversation with Jen on the night of 20 October 2026 I added a third. Its working name is the conceptual–somatic split.\n\nI think it is emergent from the first two, but I am coming to understand how fundamental it is.\n\nI think because of the aphantasia, my conceptual self is almost entirely separate from my physical and emotional self. We are calling the conceptual self the Professor and the physical and emotional self the Child.\n\nThe Professor has no direct experience of emotion. The Child has no direct access to conception, including thinking or speaking.\n\nAt any given time one or the other is dominant, eighty to twenty or twenty to eighty. If I am expected to speak, that pushes the Professor to the front.",
  createdAt: "2026-10-21T12:45:13.816Z",
  updatedAt: "2026-10-21T13:50:36.812Z",
} as const satisfies AllAboutAlanTopic
