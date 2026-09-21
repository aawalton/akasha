import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howIReadWhetherSomeoneIsSafe = {
  id: "01a06559-9d65-7a58-9703-2a94d55af4cc",
  type: "page-type/all-about-alan-topic",
  slug: "how-i-read-whether-someone-is-safe",
  title: "How I Read Whether Someone Is Safe",
  definition: "the signals I judge a person on, before I have decided anything",
  parents: ["all-about-alan-topic/who-is-safe-to-be-around"],
  related: [
    "all-about-alan-topic/why-people-read-as-unsafe",
    "all-about-alan-topic/the-four-things-i-need-from-people",
  ],
  settled:
    "Three things feed the read: their physiology, their behaviour, and how uncertain I am about them.\n\nThe read is an estimator of how that person will behave toward me. Not a feeling about them and not a judgement of their character. It is a prediction, the same prediction machine I run on everything else, pointed at a person and asking what this body will do toward me. It is the machine I run on myself, turned outward.\n\nEach of the three lowers the score on its own, and they can disagree. That they can disagree is the proof they are three rather than one verdict.\n\nPhysiology is the strongest. Where presentation and physiology disagree, physiology dominates.\n\nThe whole read is pre-cognitive. It fires before identity, intent or knowledge enter, because all of those need knowing the person. By the time I could form a considered judgement, it has returned its number.\n\nAt least one of the three learns, so an exception can be banked for a particular person against my default.",
} as const satisfies AllAboutAlanTopic
