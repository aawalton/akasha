import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenAFalseModelLooksTrue = {
  id: "01a0c5e8-640a-7b43-8896-d844599dc119",
  type: "page-type/all-about-alan-topic",
  slug: "when-a-false-model-looks-true",
  title: "When A False Model Looks True",
  definition: "compactness read over narrow data, and two false models of mine that flipped",
  parents: ["all-about-alan-topic/why-a-true-model-is-smaller"],
  related: [
    "all-about-alan-topic/what-i-take-in",
    "all-about-alan-topic/believing-things-i-cannot-trace",
  ],
  settled:
    "Compression can seduce me into a false model. I have been through several conspiracy-theory phases, each because the false theory genuinely was more compact for a while.\n\nA false theory is more compact only as long as I collect no data outside it. Over a narrow set it explains everything cleanly. Then out-of-theory data arrives, the model bolts on a special case for each contrary point, and it collapses.\n\nIn elementary school I read every book the library had on Bigfoot, Nessie, Yetis and Atlantis and believed most of it. It broke gradually, with no trigger I can name, and was gone by high school.\n\nIn my early twenties I watched Glenn Beck and got into far-right activism. He pushed a gold company hard, five minutes of research showed it was the worst in the market, and I thought: if he is lying about this, how can I trust him on anything. It all came down at once.\n\nSame mechanism, and I see no deep cause for the different tempo. One arrived as a trickle and the other as a lump.",
} as const satisfies AllAboutAlanTopic
