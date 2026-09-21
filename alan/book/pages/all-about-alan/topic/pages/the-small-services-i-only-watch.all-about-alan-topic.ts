import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theSmallServicesIOnlyWatch = {
  id: "01a0c59f-19c8-7bdf-b2e0-9afe90e9546d",
  type: "page-type/all-about-alan-topic",
  slug: "the-small-services-i-only-watch",
  title: "The Small Services I Only Watch",
  definition: "the low-exposure services I have not graded one by one",
  parents: ["all-about-alan-topic/the-software-i-pay-for-every-month"],
  settled:
    "GitHub, where I keep a mirror and nothing more, because the git I actually use is my own. ScraperAPI, which scrapes my Kindle library. The Spotify and Trakt APIs, which keep my music and my shows in step. Notion, which my collections get written into.\n\nNone of them is graded on its own, because what I have exposed to each is small.\n\nSeveral have owners worth watching. Trakt went to something private-equity shaped. Notion has taken funding and moved its prices. ScraperAPI is a startup out to make money.\n\nSo they sit as convenience, watched.",
} as const satisfies AllAboutAlanTopic
