import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenIChangeFasterThanTheChannel = {
  id: "01a0c5e9-dd7e-72dd-bdb6-4f6373785c35",
  type: "page-type/all-about-alan-topic",
  slug: "when-i-change-faster-than-the-channel",
  title: "When I Change Faster Than The Channel",
  definition: "the gap that accrues when my rate of change outruns what a knower can take in",
  parents: ["all-about-alan-topic/what-it-costs-someone-to-know-me"],
  related: [
    "all-about-alan-topic/where-connection-could-come-from",
    "all-about-alan-topic/what-i-cannot-say-to-her",
  ],
  settled:
    "Being known does not move in one batch. It moves in partial syncs, each bounded by what is affordable that session, and the channel has a top rate.\n\nWhen I change faster than the channel carries, the updates I generate outrun the ones that get across, and the remainder accrues as a gap between who I am and who their model says I am.\n\nThat is a different thing from a teardown, where one long-hidden truth lands all at once in a single expensive session. The gap accrues continuously even when no single update is large.\n\nThe remedies differ. A teardown wants one big affordable session. A throughput gap wants a richer channel, more frequent syncs, lower content cost through alignment, or a slower rate of change on my side.\n\nTwo levers lower what a knower has to build: a near twin, who has little to build, or expertise, a knower skilled at building unusual models cheaply.",
} as const satisfies AllAboutAlanTopic
