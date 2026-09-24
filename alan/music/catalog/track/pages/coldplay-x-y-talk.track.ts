import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYTalk = {
  id: "01a0b9ee-e476-7658-938f-bfaa63743c21",
  type: "page-type/track",
  slug: "coldplay-x-y-talk",
  ownLength: 5.188183333333333,
  ownProgress: 5.188183333333333,
  partOfCollections: ["release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "Talk",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "talk|4gzpq5DPGxSnKTe4SA8HAU|311291",
  song: "song/coldplay-talk",
  carriedBy: [
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 5,
      externalId: "4wzt5Rrk3W98pHXAqutuJw",
      externalLink: "https://open.spotify.com/track/4wzt5Rrk3W98pHXAqutuJw",
    },
  ],
} as const satisfies Track
