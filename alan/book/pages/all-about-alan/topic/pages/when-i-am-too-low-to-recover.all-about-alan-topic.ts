import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenIAmTooLowToRecover = {
  id: "01a0c590-7a72-749e-8288-7ee3e527ca4f",
  type: "page-type/all-about-alan-topic",
  slug: "when-i-am-too-low-to-recover",
  title: "When I Am Too Low To Recover",
  definition: "the deficit where the moves that would rebuild my health cost more than I have",
  parents: ["all-about-alan-topic/recovery-costs-what-it-restores"],
  related: [
    "all-about-alan-topic/the-surplus-i-try-to-stay-above",
    "all-about-alan-topic/what-calms-me-down",
  ],
  settled:
    "At a four to eight hour deficit my health can be too low to recover my health.\n\nLow health pulls my mana and my stamina down with it. The moves that pay health back, the hot bath and exercise, both spend mana and stamina. So the bath goes out of reach exactly when I need it most.\n\nThat is one of the most difficult times for me.\n\nA smaller deficit leaves enough mana to fire a bath. A deeper one does not show up in how I actually live. The window tends to land on this one rung.\n\nIt is a property of how my resources hang together rather than of any one remedy. Any recovery move spending what health gates can hit the same wall.\n\nThe ways out are the moves that cost nothing: sleep, where I can get it started, and lying down.",
} as const satisfies AllAboutAlanTopic
