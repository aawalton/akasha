import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatComesBackIntoReachAsIClimb = {
  id: "01a06559-9d65-7e41-820c-5cf9a4c80b03",
  type: "page-type/all-about-alan-topic",
  slug: "what-comes-back-into-reach-as-i-climb",
  title: "What Comes Back Into Reach As I Climb",
  definition: "activities coming into and out of reach as my safety level rises",
  parents: ["all-about-alan-topic/what-an-activity-costs-me"],
  related: [
    "all-about-alan-topic/how-safety-climbs",
    "all-about-alan-topic/how-far-behind-i-am-on-people",
  ],
  settled:
    "Every activity has a band: a rung where it turns affordable, and a higher one where it turns free.\n\nAffordable means it does not cost me the day. Free means I do not count the cost at all.\n\nEntertainment sits at one and programming at two. Company goes affordable at three, conflict and telling someone about myself at four, criticism at five.\n\nThe affordable set cycles rather than piling up. Each rung admits some activities and retires others, because something higher-value becomes affordable and takes the slot.\n\nI pay extra attention to what is newly affordable, and among those I privilege whatever I believe is on the critical path for my recovery, the thing that unblocks the next rung rather than the pleasantest thing in reach. The first thing I am reaching for as I expand is connection: to be known.\n\nI do not argue myself out of dangerous. I wait for a surplus of social capacity, carefully expand a little, read the result, and ask if it is safe now.",
} as const satisfies AllAboutAlanTopic
