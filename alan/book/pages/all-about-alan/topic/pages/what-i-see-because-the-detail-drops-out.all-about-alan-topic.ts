import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatISeeBecauseTheDetailDropsOut = {
  id: "01a0c59d-e98e-7d1e-a261-5c92e54872ae",
  type: "page-type/all-about-alan-topic",
  slug: "what-i-see-because-the-detail-drops-out",
  title: "What I See Because The Detail Drops Out",
  definition: "seeing the abstractions themselves, because nothing sensory stays to crowd them",
  parents: ["all-about-alan-topic/how-i-know-things"],
  related: [
    "all-about-alan-topic/the-three-kinds-of-trouble-it-causes",
    "all-about-alan-topic/what-i-cannot-play-forward",
    "all-about-alan-topic/being-an-inventor-not-a-coder",
  ],
  settled:
    "What I see is precisely the abstractions. The sensory detail leaves almost as soon as it arrives, so the abstraction is what is left to look at.\n\nThat is why I understand a thing quickly, and often differently from everyone else in the room.\n\nThe usual reading calls not holding detail a deficit. For me it is the source of the thing I value most in myself.\n\nThe cost and the gift share one root. Taking the cost away would take the gift, and taking the gift away would end the person. That is exactly why I refuse an intervention on this tier.",
} as const satisfies AllAboutAlanTopic
