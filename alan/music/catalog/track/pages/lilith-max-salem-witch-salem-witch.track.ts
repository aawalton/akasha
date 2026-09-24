import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxSalemWitchSalemWitch = {
  id: "01a0c95d-fc20-790f-997b-3f474b699864",
  type: "page-type/track",
  slug: "lilith-max-salem-witch-salem-witch",
  ownLength: 2.876133333333333,
  ownProgress: 0,
  partOfCollections: ["release/lilith-max-salem-witch"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Salem Witch",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/lilith-max" }],
  trackKey: "salemwitch|797SPxZf82IYq3XCM8c9AM|172568",
  song: "song/lilith-max-salem-witch",
  carriedBy: [
    {
      release: "release/lilith-max-salem-witch",
      discNumber: 1,
      position: 1,
      externalId: "7wdkfKbiN3E8Q2ayMBgXLo",
      externalLink: "https://open.spotify.com/track/7wdkfKbiN3E8Q2ayMBgXLo",
    },
  ],
} as const satisfies Track
