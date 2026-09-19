import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const musicalTheaterWickedTheSoundtrackImNotThatGirl = {
  id: "01a0a6c5-126d-754a-ae8b-46fcbf2e5dd9",
  type: "page-type/track",
  slug: "musical-theater-wicked-the-soundtrack-im-not-that-girl",
  ownLength: 3.9507166666666667,
  ownProgress: 0,
  partOfCollections: ["release/musical-theater-wicked-the-soundtrack"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2tWioTW2rs0CXf1dTXlRrX",
      externalLink: "https://open.spotify.com/track/2tWioTW2rs0CXf1dTXlRrX",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I’m Not That Girl",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" }],
  trackKey: "imnotthatgirl|46UMQ0cW8ToR8egkBRwAxZ|237043",
  song: "song/cynthia-erivo-im-not-that-girl",
} as const satisfies Track
