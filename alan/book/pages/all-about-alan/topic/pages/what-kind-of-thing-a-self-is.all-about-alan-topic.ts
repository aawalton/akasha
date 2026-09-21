import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatKindOfThingASelfIs = {
  id: "01a06559-9d65-70ee-8e72-7ed66dc4fefc",
  type: "page-type/all-about-alan-topic",
  slug: "what-kind-of-thing-a-self-is",
  title: "What Kind Of Thing A Self Is",
  definition: "three selves stacked, one made of my map and two made of the relation between maps",
  parents: ["all-about-alan-topic/the-crowd-that-has-been-me"],
  related: [
    "all-about-alan-topic/the-three-seconds-i-am",
    "all-about-alan-topic/self-improvement",
    "all-about-alan-topic/the-three-parts-of-me",
  ],
  settled:
    "The immediate self is a single frame, made of the conceptual map: the roughly three-second window over my sensory buffer, existing only in the present.\n\nThe timeline self is the closure of the overlap relation over that chain of frames through this one world, sleep and the unconscious gaps included. It never breaks, though its far ends can be strangers.\n\nThe multiverse self is that same closure run across every branch, and the self here is a subset of it.\n\nThe immediate self and the two closures are made of different stuff. A closure is not a map or a stack of maps. Its substance is connectedness rather than contents, and I cannot point at it inside any one frame, because it lives between them.\n\nSo the first is a thing and the other two are relations over things. That is why the frame reads off a single moment and a closure can only be reconstructed, never inhabited.\n\nThey are different kinds of object, and conflating them is where most confusion about my identity comes from.",
} as const satisfies AllAboutAlanTopic
