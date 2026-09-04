import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howIReadWhetherSomeoneIsSafe = {
  id: "01a06559-9d65-7a58-9703-2a94d55af4cc",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-i-read-whether-someone-is-safe",
  title: "How I Read Whether Someone Is Safe",
  definition: "the signals I judge a person on, before I have decided anything",
  parentSlugs: ["who-is-safe-to-be-around"],
  relatedSlugs: ["why-people-read-as-unsafe", "the-four-things-i-need-from-people"],
  settled:
    "Three things feed the read: their physiology, their behaviour, and how uncertain I am about them.\n\nAt least one of the three learns, so an exception can be banked for a particular person against my default.",
  unsettled:
    "How the three combine is unknown: whether the lowest wins, whether they add up, or whether each is weighted by how reliable it is. One case where two fired at once hints at adding, or at taking the worst.\n\nWhether the behaviour and uncertainty reads also learn person by person, or only the physiological one does, is unknown.\n\nHow many safe encounters bank an exception, and whether it overrides the default fully or only weakens it, is unrecorded.",
} as const satisfies AllAboutAlanTopic
