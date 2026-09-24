import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanSomeday = {
  id: "01a0abea-7940-712b-ace4-e9d7459cf327",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-someday",
  ownLength: 4.337983333333334,
  ownProgress: 4.337983333333334,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Someday",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "someday|6NWtt9pNOL2Gx7kBykdE5x|260279",
  song: "song/celtic-woman-someday",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 10,
      externalId: "0QWsU7rdcjFrsVw2O2uC0J",
      externalLink: "https://open.spotify.com/track/0QWsU7rdcjFrsVw2O2uC0J",
    },
  ],
} as const satisfies Track
