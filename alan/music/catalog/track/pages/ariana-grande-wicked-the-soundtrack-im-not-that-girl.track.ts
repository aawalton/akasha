import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackImNotThatGirl = {
  id: "01a0a6c5-4cc6-71a4-a7ef-b3377aad8cfc",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-im-not-that-girl",
  ownLength: 3.9507166666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3po5ujYfFlbil6fHwUdh9n",
      externalLink: "https://open.spotify.com/track/3po5ujYfFlbil6fHwUdh9n",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I’m Not That Girl",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" }],
  trackKey: "imnotthatgirl|46UMQ0cW8ToR8egkBRwAxZ|237043",
  song: "song/ariana-grande-i-m-not-that-girl",
} as const satisfies Track
