import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theThirdThingInTheRoom = {
  id: "01a0c5aa-1999-71a8-b88f-af7cf0884b8c",
  type: "page-type/all-about-alan-topic",
  slug: "the-third-thing-in-the-room",
  title: "The Third Thing In The Room",
  definition: "why a code review never welded a judge in, although work was survival stakes",
  parents: ["all-about-alan-topic/where-the-scar-ends"],
  related: [
    "all-about-alan-topic/what-lets-a-judgement-in",
    "all-about-alan-topic/the-open-register",
  ],
  settled:
    "Work is a survival context, and code review still never installed a judge inside me. So the context is necessary and not sufficient.\n\nIt did not hit the bar because I took in the low stakes, and the expectation that this was simply part of the necessary process, bugs being so awful and annoying. It was the reviewer and me against the bug, not the reviewer against me. It was also asynchronous and written, which dropped the intensity a great deal.\n\nA code review has a third thing in the room. We both point at the bug, side by side, so the verdict never has to travel to me.\n\nThat third target is what open has meant the whole time. A sentence, a drawing, a sung note has no bug. Nothing else is there to absorb the hit, so criticism has nowhere to go but me.\n\nWhich is what fuses it. Not that I made the thing, but that there was nothing else for the verdict to land on.",
} as const satisfies AllAboutAlanTopic
