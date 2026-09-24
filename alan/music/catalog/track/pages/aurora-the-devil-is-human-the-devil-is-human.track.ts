import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheDevilIsHumanTheDevilIsHuman = {
  id: "01a0b638-0333-7cdc-b2a4-ddc099452d01",
  type: "page-type/track",
  slug: "aurora-the-devil-is-human-the-devil-is-human",
  ownLength: 3.0102166666666665,
  ownProgress: 3.0102166666666665,
  partOfCollections: ["release/aurora-the-devil-is-human"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Devil is Human",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "thedevilishuman|1WgXqy2Dd70QQOU7Ay074N|180613",
  song: "song/aurora-the-devil-is-human",
  carriedBy: [
    {
      release: "release/aurora-the-devil-is-human",
      discNumber: 1,
      position: 1,
      externalId: "2nLEh1IAezKeXKCGfYULmX",
      externalLink: "https://open.spotify.com/track/2nLEh1IAezKeXKCGfYULmX",
    },
  ],
} as const satisfies Track
