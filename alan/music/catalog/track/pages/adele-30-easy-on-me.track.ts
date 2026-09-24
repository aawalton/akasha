import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30EasyOnMe = {
  id: "01a0d52b-c25a-79ba-ac87-57ec49f290bf",
  type: "page-type/track",
  slug: "adele-30-easy-on-me",
  ownLength: 3.7449,
  ownProgress: 0,
  partOfCollections: ["release/adele-30", "release/adele-easy-on-me"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Easy On Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "easyonme|4dpARuHxo51G3z768sgnrY|224694",
  song: "song/adele-easy-on-me",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 2,
      externalId: "46IZ0fSY2mpAiktS3KOqds",
      externalLink: "https://open.spotify.com/track/46IZ0fSY2mpAiktS3KOqds",
    },
    {
      release: "release/adele-easy-on-me",
      discNumber: 1,
      position: 1,
      externalId: "0gplL1WMoJ6iYaPgMCL0gX",
      externalLink: "https://open.spotify.com/track/0gplL1WMoJ6iYaPgMCL0gX",
    },
  ],
} as const satisfies Track
