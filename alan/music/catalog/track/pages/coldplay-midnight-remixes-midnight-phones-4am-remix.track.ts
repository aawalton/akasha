import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMidnightRemixesMidnightPhones4amRemix = {
  id: "01a0b9ee-f706-7ec5-acf6-f1e980ae8798",
  type: "page-type/track",
  slug: "coldplay-midnight-remixes-midnight-phones-4am-remix",
  ownLength: 10.936183333333334,
  ownProgress: 10.936183333333334,
  partOfCollections: ["release/coldplay-midnight-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight - Phones 4AM Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artist: "artist/coldplay" },
    { artistName: "Matt Wiggins" },
    { artistName: "Paul Epworth" },
  ],
  trackKey:
    "midnightphones4amremix|04ouBKIoUizgF9j6v6TWR8,3ziQfZn3PliWCCN8HgDPpS,4gzpq5DPGxSnKTe4SA8HAU|656171",
  song: "song/coldplay-midnight",
  carriedBy: [
    {
      release: "release/coldplay-midnight-remixes",
      discNumber: 1,
      position: 1,
      externalId: "3eU4DYI9j2zdzwrqJ9U3fk",
      externalLink: "https://open.spotify.com/track/3eU4DYI9j2zdzwrqJ9U3fk",
    },
  ],
} as const satisfies Track
