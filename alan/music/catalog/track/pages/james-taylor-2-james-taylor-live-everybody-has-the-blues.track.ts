import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveEverybodyHasTheBlues = {
  id: "01a0abeb-3c7b-7155-af8b-5dae208bb08f",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-everybody-has-the-blues",
  ownLength: 2.56555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1clezMVAmwn9KcXDEkTeq0",
      externalLink: "https://open.spotify.com/track/1clezMVAmwn9KcXDEkTeq0",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Everybody Has The Blues",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "everybodyhastheblues|0vn7UBvSQECKJm2817Yf1P|153933",
  song: "song/james-taylor-everybody-has-the-blues",
} as const satisfies Track
