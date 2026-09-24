import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalk2SleepingSun = {
  id: "01a0b9ee-fe65-7d11-9beb-cf1b95b58270",
  type: "page-type/track",
  slug: "coldplay-talk-2-sleeping-sun",
  ownLength: 3.1893333333333334,
  ownProgress: 3.1893333333333334,
  partOfCollections: ["release/coldplay-talk-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sleeping Sun",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "sleepingsun|4gzpq5DPGxSnKTe4SA8HAU|191360",
  song: "song/coldplay-sleeping-sun",
  carriedBy: [
    {
      release: "release/coldplay-talk-2",
      discNumber: 1,
      position: 2,
      externalId: "0xkcOfbk2pyukCmMVTTauh",
      externalLink: "https://open.spotify.com/track/0xkcOfbk2pyukCmMVTTauh",
    },
  ],
} as const satisfies Track
