import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theSongAboutAWarIDoNotHave = {
  id: "01a0c5fc-76e8-7945-a13f-87e00e7dea14",
  type: "page-type/all-about-alan-topic",
  slug: "the-song-about-a-war-i-do-not-have",
  title: "The Song About A War I Do Not Have",
  definition: "the song I read my own war off, and what it turned out to run between",
  parents: ["all-about-alan-topic/the-three-parts-of-me"],
  related: [
    "all-about-alan-topic/how-a-song-reaches-me",
    "all-about-alan-topic/the-two-medicines-a-song-can-carry",
  ],
  settled:
    "My take on Em Beihold's Egg In The Backseat is that she is talking about being cracked by attraction, and that she is attracted to someone she thinks is a bad idea. That is the war between the emotions and the mind.\n\nI live almost entirely in my mind, so that is not a war I really experience.\n\nMy war is between the mind and the body instead, with my limited access to emotions taking the body's side.",
} as const satisfies AllAboutAlanTopic
