import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiMeetUThereMeetUThere = {
  id: "01a0b112-9bf4-72f5-b7b3-742b09ec1875",
  type: "page-type/track",
  slug: "vinny-marchi-meet-u-there-meet-u-there",
  ownLength: 2.8,
  ownProgress: 2.8,
  partOfCollections: ["release/vinny-marchi-meet-u-there"],
  status: "completed",
  unit: "unit/minutes",
  title: "meet U there",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "meetuthere|5USAMqcbMAzF3HBmeD5pJF|168000",
  song: "song/vinny-marchi-meet-u-there",
  carriedBy: [
    {
      release: "release/vinny-marchi-meet-u-there",
      discNumber: 1,
      position: 1,
      externalId: "0EalDy2yJzKpjUfIxlcXgS",
      externalLink: "https://open.spotify.com/track/0EalDy2yJzKpjUfIxlcXgS",
    },
  ],
} as const satisfies Track
