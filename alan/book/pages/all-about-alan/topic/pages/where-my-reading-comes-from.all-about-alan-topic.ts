import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereMyReadingComesFrom = {
  id: "01a0c5a4-7bac-7bdc-bef3-4512c9c385bf",
  type: "page-type/all-about-alan-topic",
  slug: "where-my-reading-comes-from",
  title: "Where My Reading Comes From",
  definition: "the books, writers, search and feeds I actually use, and how far I trust each",
  parents: ["all-about-alan-topic/which-organisations-i-trust"],
  related: [
    "all-about-alan-topic/what-i-take-in",
    "all-about-alan-topic/the-same-company-at-two-grades",
  ],
  settled:
    "Kindle is where my ebooks come from, at D. Audible does the audiobooks, at D. Amazon owns both.\n\nGoogle Search is my default, at D. Ads sit above the results now, the generated summaries push publishers down the page, and anything that is not commercial comes back worse than it used to.\n\nInstagram is at D. I use it for the occasional bit of ambient news and to see what my own people are doing, never as a source. I could drop it without losing much.\n\nRoyal Road is at B, free to read, where the serialised web fiction is.\n\nSubstack is at B, where the independent writers I read publish.\n\nThat is the whole of it. No newspaper, no news app, no podcasts, no Reddit, no HackerNews, no Mastodon, no X, and no Discord for information.",
} as const satisfies AllAboutAlanTopic
