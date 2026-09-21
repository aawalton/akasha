import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howTheDistressAlarmWasTrained = {
  id: "01a0c59b-6017-7514-b598-1ba41f78520f",
  type: "page-type/all-about-alan-topic",
  slug: "how-the-distress-alarm-was-trained",
  title: "How The Distress Alarm Was Trained",
  definition: "what taught the alarm at someone else's distress and why calm does not untrain it",
  parents: ["all-about-alan-topic/why-someone-elses-distress-alarms-me"],
  related: [
    "all-about-alan-topic/why-a-threat-stays-fresh",
    "all-about-alan-topic/why-people-read-as-unsafe",
  ],
  settled:
    "It was in place by the time I was six, and I cannot trace what trained it.\n\nThe cue brought my own pain only sometimes rather than every time. That trains harder than reliably would, and it is why the thing does not wear off. A long calm stretch reads as more of the same schedule rather than as evidence against it.\n\nTwo things stack there. The schedule makes a safe encounter weak evidence, and having no episode to replay means nothing wears it down between encounters at all.\n\nIt runs at two levels that come apart. One is an estimate of how much trouble a particular person brings, taken over all our dealings rather than over the bad ones alone. It drifts down while nothing fires and jumps on a new trigger.\n\nThe other is the cue itself firing, which owes nothing to the first. The estimate can be at its lowest and her distress still sets mine off.",
} as const satisfies AllAboutAlanTopic
