import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsMagicCircles = {
  id: "01a0b4c8-228c-7a51-a4d2-fab7dadc85a2",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-magic-circles",
  ownLength: 4.713883333333333,
  ownProgress: 4.713883333333333,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Magic Circles",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "magiccircles|7FQRbf8gbKw8KZQZAJWxH2|282833",
  song: "song/paul-cardall-magic-circles",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 14,
      externalId: "1cDmkJbbiCPQERoYlZG141",
      externalLink: "https://open.spotify.com/track/1cDmkJbbiCPQERoYlZG141",
    },
  ],
} as const satisfies Track
