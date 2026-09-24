import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxe23 = {
  id: "01a0caa9-0d58-7a95-8f5b-632f7c5d782f",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-23",
  ownLength: 3.37235,
  ownProgress: 3.37235,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "23",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "23|2hUYKu1x0UZQXvzCmggvSn|202341",
  song: "song/renee-rapp-23",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 12,
      externalId: "4exkbsVLr1BnyJPbClEyOG",
      externalLink: "https://open.spotify.com/track/4exkbsVLr1BnyJPbClEyOG",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 12,
      externalId: "46MRqEBwGxfguFfNH2Dbzi",
      externalLink: "https://open.spotify.com/track/46MRqEBwGxfguFfNH2Dbzi",
    },
  ],
} as const satisfies Track
