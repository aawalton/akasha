import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howMyMissionEnded = {
  id: "01a0c602-d58f-7fb5-9fd5-08466ed4fdcb",
  type: "page-type/all-about-alan-topic",
  slug: "how-my-mission-ended",
  title: "How My Mission Ended",
  definition: "what I did at the break instead of going home, and what that phone call left me",
  parents: ["all-about-alan-topic/the-nine-months-my-body-broke"],
  related: [
    "all-about-alan-topic/how-i-actually-breathe",
    "all-about-alan-topic/digging-up-an-old-belief",
  ],
  settled:
    "The break did not end my mission, though I think many would have gone home. I got in touch with the mission president's wife, who coordinated health issues, and she connected me by phone to a church psychologist in Germany. He had me take a stress assessment and I scored at the 99th percentile. I literally could not have scored higher.\n\nI did not view leaving as a real option, so I went back to my belief that the only way out is through. I think that traced to my deeper beliefs at the time that my needs were not important and that I always had to meet the expectations of others.\n\nHe taught me the main systems of the body, how they integrate with the autonomic nervous system, and that breathing is the semi-voluntary bridge into it. That call, at twenty, when I could not leave the room, seeded the breathing practice that anchors hours of every day now.\n\nThree months in the training centre plus six in the field is the nine I overrode.",
} as const satisfies AllAboutAlanTopic
