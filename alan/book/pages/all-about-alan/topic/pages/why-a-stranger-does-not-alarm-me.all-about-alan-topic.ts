import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyAStrangerDoesNotAlarmMe = {
  id: "01a0c5a0-8ba4-73b9-9a0d-541d519799b7",
  type: "page-type/all-about-alan-topic",
  slug: "why-a-stranger-does-not-alarm-me",
  title: "Why A Stranger Does Not Alarm Me",
  definition: "why someone I have no model of reads safe when the unmodellable reads as danger",
  parents: ["all-about-alan-topic/when-i-cannot-predict-someone"],
  related: ["all-about-alan-topic/who-is-safe-to-be-around"],
  settled:
    "A complete stranger is someone I have no model of at all, so by my own rule they should read as maximally unsafe. They do not. Strangers rank second, above people I have had long good relationships with.\n\nWhat resolves it is the best-behaviour mask. Normal people run a default best-behaviour script on first contact, and that script is itself a model. Not of the individual but of the population. It tells me what a normal stranger will do in the next few minutes, which is the only horizon loaded. Most normal people will not hurt me on a first conversation.\n\nSo the mask buys predictability the individual model has not earned.\n\nIt is the default only for normal-presenting people. Visible signs of abnormality break the script, unhoused people being my example. The short-horizon prediction disappears and the alarm comes back up.",
} as const satisfies AllAboutAlanTopic
