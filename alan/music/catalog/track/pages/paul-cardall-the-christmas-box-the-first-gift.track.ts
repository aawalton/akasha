import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheFirstGift = {
  id: "01a0b4c8-66db-7edc-a099-b096a3896fdd",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-first-gift",
  ownLength: 2.2622166666666668,
  ownProgress: 2.2622166666666668,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "The First Gift",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thefirstgift|7FQRbf8gbKw8KZQZAJWxH2|135733",
  song: "song/paul-cardall-the-first-gift",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 16,
      externalId: "2Obpswn9eT5D6ueJH84kBu",
      externalLink: "https://open.spotify.com/track/2Obpswn9eT5D6ueJH84kBu",
    },
  ],
} as const satisfies Track
