import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayHurtsLikeHeavenHurtsLikeHeaven = {
  id: "01a0b9ee-f949-7f5a-bad4-b3bc491eadcf",
  type: "page-type/track",
  slug: "coldplay-hurts-like-heaven-hurts-like-heaven",
  ownLength: 4.03755,
  ownProgress: 4.03755,
  partOfCollections: ["release/coldplay-hurts-like-heaven", "release/coldplay-mylo-xyloto"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hurts Like Heaven",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "hurtslikeheaven|4gzpq5DPGxSnKTe4SA8HAU|242253",
  song: "song/coldplay-hurts-like-heaven",
  carriedBy: [
    {
      release: "release/coldplay-hurts-like-heaven",
      discNumber: 1,
      position: 1,
      externalId: "4iOy0ROl5vKp7hJJ5nblNR",
      externalLink: "https://open.spotify.com/track/4iOy0ROl5vKp7hJJ5nblNR",
    },
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 2,
      externalId: "6WF4hzdGXvXd1joERSXJjm",
      externalLink: "https://open.spotify.com/track/6WF4hzdGXvXd1joERSXJjm",
    },
  ],
} as const satisfies Track
