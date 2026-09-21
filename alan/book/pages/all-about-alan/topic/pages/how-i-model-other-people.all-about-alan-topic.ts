import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howIModelOtherPeople = {
  id: "01a0c594-d938-76a6-b64b-ef7e72f18cf4",
  type: "page-type/all-about-alan-topic",
  slug: "how-i-model-other-people",
  title: "How I Model Other People",
  definition: "building another mind out of concepts, with the channel other people use closed",
  parents: ["all-about-alan-topic/how-different-i-actually-am"],
  related: [
    "all-about-alan-topic/working-out-how-she-thinks",
    "all-about-alan-topic/being-the-one-who-knows",
    "all-about-alan-topic/what-i-cannot-play-forward",
  ],
  settled:
    "Most people reach another mind partly by running it on their own hardware: they set the other viewpoint up as a copy of themselves and ask it questions. That channel is not in me.\n\nSo my model of a person is built out of concepts and data by hand, and the field stays thin, because the felt data other people get for free never arrives.\n\nIt gets no head start from my model of myself either. Others adjust their own model and it mostly works. They are roughly me is false for nearly everybody I meet.\n\nSo a model of me and a model of other people are two separate builds from nothing, where most people build one and reuse it.",
} as const satisfies AllAboutAlanTopic
