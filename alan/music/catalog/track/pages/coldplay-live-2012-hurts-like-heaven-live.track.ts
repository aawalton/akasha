import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012HurtsLikeHeavenLive = {
  id: "01a0b9ee-d9ad-759a-9e05-29eb0bb37e36",
  type: "page-type/track",
  slug: "coldplay-live-2012-hurts-like-heaven-live",
  ownLength: 4.272216666666667,
  ownProgress: 4.272216666666667,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hurts Like Heaven - Live",
  trackType: "live",
  explicit: true,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "hurtslikeheavenlive|4gzpq5DPGxSnKTe4SA8HAU|256333",
  song: "song/coldplay-hurts-like-heaven",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 2,
      externalId: "1mw50a4DGRhkdMX7nOoLE4",
      externalLink: "https://open.spotify.com/track/1mw50a4DGRhkdMX7nOoLE4",
    },
  ],
} as const satisfies Track
