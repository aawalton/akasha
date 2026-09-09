import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const howIReadWhetherSomeoneIsSafe = {
  id: "01a06559-9d65-7a58-9703-2a94d55af4cc",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "how-i-read-whether-someone-is-safe",
  title: "How I Read Whether Someone Is Safe",
  definition: "the signals I judge a person on, before I have decided anything",
  parents: ["who-is-safe-to-be-around"],
  related: ["why-people-read-as-unsafe", "the-four-things-i-need-from-people"],
  settled:
    "Three things feed the read: their physiology, their behaviour, and how uncertain I am about them.\n\nAt least one of the three learns, so an exception can be banked for a particular person against my default.",
} as const satisfies AllAboutAlanTopic
