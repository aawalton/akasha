import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheFloodTheFlood = {
  id: "01a0b637-fecf-730d-9aae-ebd703859982",
  type: "page-type/track",
  slug: "aurora-the-flood-the-flood",
  ownLength: 4.495333333333333,
  ownProgress: 4.495333333333333,
  partOfCollections: [
    "release/aurora-the-flood",
    "release/aurora-what-happened-to-the-heart-deluxe",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Flood",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "theflood|1WgXqy2Dd70QQOU7Ay074N|269720",
  song: "song/aurora-the-flood",
  carriedBy: [
    {
      release: "release/aurora-the-flood",
      discNumber: 1,
      position: 1,
      externalId: "4wwpOIY2XXfYW2A8bS6djJ",
      externalLink: "https://open.spotify.com/track/4wwpOIY2XXfYW2A8bS6djJ",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 17,
      externalId: "2WxFBMZAyinR4y9s1MbRRn",
      externalLink: "https://open.spotify.com/track/2WxFBMZAyinR4y9s1MbRRn",
    },
  ],
} as const satisfies Track
