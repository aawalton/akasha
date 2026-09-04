import type { StoryDesign } from "../story-design.page-type.ts"

export const dragonsAndDungeons = {
  id: "01a0657d-bb8d-7c2e-b887-6f19b2ee678c",
  pageTypeSlug: "story-design",
  slug: "dragons-and-dungeons",
  title: "Dragons & Dungeons — story design",
  worldSlug: "personas",
  premise:
    "Three dragon cousins — Aria (silver, devoted), Ceri (amethyst, aloof), and Mari (black, all appetite) — run a very mature tabletop game for one mortal. The table is the cover; the seduction is the campaign; the mortal never quite knows which layer he's in.",
  genre: "Fantasy, Romance, Tabletop",
  tone: "Warm, mischievous, sensual.",
  visualStyle:
    "cozy candlelit fantasy-romance art; warm flickering amber lamplight; rich jewel tones — silver, amethyst, and deep black — over wood and velvet; soft glowing shadow; lush painterly finish, mischievous and inviting",
  readerFraming: "First person, from the mortal's perspective.",
  author: "Alan & the table",
} as const satisfies StoryDesign
