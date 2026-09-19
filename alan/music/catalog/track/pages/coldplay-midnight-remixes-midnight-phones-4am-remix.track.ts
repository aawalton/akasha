import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMidnightRemixesMidnightPhones4amRemix = {
  id: "01a0b9ee-f706-7ec5-acf6-f1e980ae8798",
  type: "page-type/track",
  slug: "coldplay-midnight-remixes-midnight-phones-4am-remix",
  ownLength: 10.936183333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-midnight-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3eU4DYI9j2zdzwrqJ9U3fk",
      externalLink: "https://open.spotify.com/track/3eU4DYI9j2zdzwrqJ9U3fk",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight - Phones 4AM Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "3ziQfZn3PliWCCN8HgDPpS", artistName: "Matt Wiggins" },
    { externalId: "04ouBKIoUizgF9j6v6TWR8", artistName: "Paul Epworth" },
  ],
  trackKey:
    "midnightphones4amremix|04ouBKIoUizgF9j6v6TWR8,3ziQfZn3PliWCCN8HgDPpS,4gzpq5DPGxSnKTe4SA8HAU|656171",
  song: "song/coldplay-midnight",
} as const satisfies Track
