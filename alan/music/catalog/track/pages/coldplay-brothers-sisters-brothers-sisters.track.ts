import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayBrothersSistersBrothersSisters = {
  id: "01a0b9ef-0556-7163-9d79-02820eebc294",
  type: "page-type/track",
  slug: "coldplay-brothers-sisters-brothers-sisters",
  ownLength: 4.092216666666666,
  ownProgress: 4.092216666666666,
  partOfCollections: ["release/coldplay-brothers-sisters"],
  status: "completed",
  unit: "unit/minutes",
  title: "Brothers & Sisters",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "brotherssisters|4gzpq5DPGxSnKTe4SA8HAU|245533",
  song: "song/coldplay-brothers-sisters",
  carriedBy: [
    {
      release: "release/coldplay-brothers-sisters",
      discNumber: 1,
      position: 1,
      externalId: "6BMIgTmZAihjW5MKEo7gvV",
      externalLink: "https://open.spotify.com/track/6BMIgTmZAihjW5MKEo7gvV",
    },
  ],
} as const satisfies Track
