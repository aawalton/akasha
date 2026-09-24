import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalk2Talk = {
  id: "01a0b9ee-fe3d-7bb4-8b6b-bf154cf26a1b",
  type: "page-type/track",
  slug: "coldplay-talk-2-talk",
  ownLength: 4.426433333333334,
  ownProgress: 4.426433333333334,
  partOfCollections: ["release/coldplay-talk-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Talk",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "talk|4gzpq5DPGxSnKTe4SA8HAU|265586",
  song: "song/coldplay-talk",
  carriedBy: [
    {
      release: "release/coldplay-talk-2",
      discNumber: 1,
      position: 1,
      externalId: "07TzXoUAtflCfeipNNXFtk",
      externalLink: "https://open.spotify.com/track/07TzXoUAtflCfeipNNXFtk",
    },
  ],
} as const satisfies Track
