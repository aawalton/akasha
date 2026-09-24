import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalkTalkFrancoisKDub = {
  id: "01a0b9ee-fdec-70cd-99c3-aa5c7678a176",
  type: "page-type/track",
  slug: "coldplay-talk-talk-francois-k-dub",
  ownLength: 9.060216666666667,
  ownProgress: 9.060216666666667,
  partOfCollections: ["release/coldplay-talk"],
  status: "completed",
  unit: "unit/minutes",
  title: "Talk - Francois K Dub",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "talkfrancoiskdub|4gzpq5DPGxSnKTe4SA8HAU|543613",
  song: "song/coldplay-talk-francois-k-dub",
  carriedBy: [
    {
      release: "release/coldplay-talk",
      discNumber: 1,
      position: 2,
      externalId: "34vsOHBZ1iMFANaeXaRF1Q",
      externalLink: "https://open.spotify.com/track/34vsOHBZ1iMFANaeXaRF1Q",
    },
  ],
} as const satisfies Track
