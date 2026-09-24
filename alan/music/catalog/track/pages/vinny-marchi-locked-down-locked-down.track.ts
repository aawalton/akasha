import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiLockedDownLockedDown = {
  id: "01a0b112-9aca-7608-8d8c-5369baca10bc",
  type: "page-type/track",
  slug: "vinny-marchi-locked-down-locked-down",
  ownLength: 2.38645,
  ownProgress: 2.38645,
  partOfCollections: ["release/vinny-marchi-locked-down"],
  status: "completed",
  unit: "unit/minutes",
  title: "LOCKED DOWN",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "lockeddown|5USAMqcbMAzF3HBmeD5pJF|143187",
  song: "song/vinny-marchi-locked-down",
  carriedBy: [
    {
      release: "release/vinny-marchi-locked-down",
      discNumber: 1,
      position: 1,
      externalId: "6Zcfkqfod1trj4MQ8Rvsac",
      externalLink: "https://open.spotify.com/track/6Zcfkqfod1trj4MQ8Rvsac",
    },
  ],
} as const satisfies Track
