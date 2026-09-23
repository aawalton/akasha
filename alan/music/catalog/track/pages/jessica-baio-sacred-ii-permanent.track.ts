import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiPermanent = {
  id: "01a0c622-0f03-7de9-9fca-501f9c74ad87",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-permanent",
  ownLength: 2.14305,
  ownProgress: 2.14305,
  partOfCollections: ["release/jessica-baio-sacred-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "permanent",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "permanent|0VMFTqmv0hYlWruyBERT95|128583",
  song: "song/jessica-baio-permanent",
  carriedBy: [
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 1,
      position: 4,
      externalId: "1CQefC0JObshyfXzf2whhw",
      externalLink: "https://open.spotify.com/track/1CQefC0JObshyfXzf2whhw",
    },
  ],
} as const satisfies Track
