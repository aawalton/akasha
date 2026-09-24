import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003PolitikLiveInSydney = {
  id: "01a0b9ee-e5cc-714c-8e1f-a8744f123247",
  type: "page-type/track",
  slug: "coldplay-live-2003-politik-live-in-sydney",
  ownLength: 6.607766666666667,
  ownProgress: 6.607766666666667,
  partOfCollections: ["release/coldplay-live-2003"],
  status: "completed",
  unit: "unit/minutes",
  title: "Politik - Live in Sydney",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "politikliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|396466",
  song: "song/coldplay-politik",
  carriedBy: [
    {
      release: "release/coldplay-live-2003",
      discNumber: 1,
      position: 1,
      externalId: "110a2YFVoGswehZi2kkVpp",
      externalLink: "https://open.spotify.com/track/110a2YFVoGswehZi2kkVpp",
    },
  ],
} as const satisfies Track
