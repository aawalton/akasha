import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howTheHarnessBegan = {
  id: "01a0c5f2-3f1a-7c8c-bc5b-a1ffe3d43efc",
  type: "page-type/all-about-alan-topic",
  slug: "how-the-harness-began",
  title: "How The Harness Began",
  definition: "the tracking that came before the first system, and the overload that made it one",
  parents: ["all-about-alan-topic/the-scaffolding-i-built"],
  related: ["all-about-alan-topic/the-best-three-years", "all-about-alan-topic/the-company-years"],
  settled:
    "The instinct is older than the system. I seem to remember some personal tracking as a teen in college, and I definitely had some built into the mission mechanics in Novosibirsk, so it was not an entirely new pattern.\n\nIt became deliberate at Epic, my first real job. I was overwhelmed, so I started tracking the overwhelm to look for patterns.\n\nThat was not my first response. First I went in earlier and stayed later, throwing time at the problem until I could work out how to be more efficient. The hours and the tracking ran side by side. The hours bought time while the tracking looked for the structure, and the hours are still what fires under acute overload.\n\nSo the order was scattered tracking, then real overload at a real job, then hours and tracking together, and then the tracking hardening into a system.",
} as const satisfies AllAboutAlanTopic
