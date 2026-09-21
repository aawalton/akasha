import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatPullsMeIntoDoingSomething = {
  id: "01a06559-9d65-78bc-a02c-3071e18b967e",
  type: "page-type/all-about-alan-topic",
  slug: "what-pulls-me-into-doing-something",
  title: "What Pulls Me Into Doing Something",
  definition: "the two ways a thing gets me moving, one I feel and one I reason out",
  parents: ["all-about-alan-topic/how-i-decide"],
  settled:
    "One channel runs on how familiar and how new a thing is, and I only notice it afterwards.\n\nFamiliar alone or new alone is not enough. Both have to fire. Familiar lowers what my nervous system carries; new supplies the stimulation. Opposite drives, one output, and with both running I can work twelve hours a day.\n\nI notice it only afterwards because two things stack: I cannot re-experience a past state to compare against, and watching myself is one of the weak functions.\n\nThe other runs on importance, and it is the one I can use on purpose. Importance and mattering are one signal at two scales: importance decides the thing in front of me, mattering decides which abandoned things come back.\n\nThe two make different wants. The instinctive one is wanting to do the thing; the conceptual one is wanting it done.\n\nThe instinctive one wins when it fires, so I take urgency out of my surroundings rather than override it. Urgency is the only input I engineer out; novelty pulls productively.",
} as const satisfies AllAboutAlanTopic
