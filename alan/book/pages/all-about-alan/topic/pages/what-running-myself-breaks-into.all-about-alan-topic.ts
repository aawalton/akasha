import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatRunningMyselfBreaksInto = {
  id: "01a0c58c-62df-7548-b150-6fca1b09a86f",
  type: "page-type/all-about-alan-topic",
  slug: "what-running-myself-breaks-into",
  title: "What Running Myself Breaks Into",
  definition: "the separate capacities that add up to running myself, and what each is called",
  parents: ["all-about-alan-topic/how-i-get-anything-done"],
  related: ["all-about-alan-topic/having-adhd", "all-about-alan-topic/two-conditions-or-one"],
  settled:
    "Running myself is not one capacity. It comes apart into stopping an action before it fires, holding something in mind while I work on it, keeping feeling from taking the wheel, staying on a task that gives me nothing back, starting at all, sequencing and ranking the steps, keeping track of where things are, judging and spending time, pushing on past obstacles, changing course when conditions change, and watching how I am doing and adjusting.\n\nI took that breakdown from Dawson and Guare rather than working it out myself.\n\nADHD takes most or all of them at once rather than one of them.",
} as const satisfies AllAboutAlanTopic
