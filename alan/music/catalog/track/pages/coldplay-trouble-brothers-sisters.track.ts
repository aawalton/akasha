import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTroubleBrothersSisters = {
  id: "01a0b9ef-0344-7741-b03b-aaabf2f79cf9",
  type: "page-type/track",
  slug: "coldplay-trouble-brothers-sisters",
  ownLength: 4.816666666666666,
  ownProgress: 4.816666666666666,
  partOfCollections: ["release/coldplay-trouble"],
  status: "completed",
  unit: "unit/minutes",
  title: "Brothers & Sisters",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "brotherssisters|4gzpq5DPGxSnKTe4SA8HAU|289000",
  song: "song/coldplay-brothers-sisters",
  carriedBy: [
    {
      release: "release/coldplay-trouble",
      discNumber: 1,
      position: 2,
      externalId: "4E1puwynQif5GJqPEXj35p",
      externalLink: "https://open.spotify.com/track/4E1puwynQif5GJqPEXj35p",
    },
  ],
} as const satisfies Track
