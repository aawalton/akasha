import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatMyStressNumbersMean = {
  id: "01a0c58f-c22a-7b31-beca-52e6138ddc59",
  type: "page-type/all-about-alan-topic",
  slug: "what-my-stress-numbers-mean",
  title: "What My Stress Numbers Mean",
  definition: "the anchors on the nought-to-a-hundred scale I read my stress on",
  parents: ["all-about-alan-topic/stress-level"],
  related: ["all-about-alan-topic/how-well-i-can-measure"],
  settled:
    "The scale runs from nought to a hundred, and both ends kill, for opposite reasons.\n\nFive is complete relaxation. Fifteen is light activity. Twenty-five is athletic exertion.\n\nThirty-five is an indirect threat to survival, the kind being yelled at by a boss is. Forty-five is a direct one, the kind being chased by a bear is.\n\nI have been reading myself on this scale for about twenty years, since long before I knew I was autistic.\n\nMy tell for stress is not something I feel and check. It is an instrument I built back when stress was my bottleneck, and I have not been reading it for a few weeks now, because the affordability rule has been enough. The anchors are intact. A cheaper governor is holding the line in its place.",
} as const satisfies AllAboutAlanTopic
