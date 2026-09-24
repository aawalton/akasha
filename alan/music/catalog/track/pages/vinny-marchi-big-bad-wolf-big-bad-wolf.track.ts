import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBigBadWolfBigBadWolf = {
  id: "01a0b112-956e-7c24-b7f7-93d14c1566c3",
  type: "page-type/track",
  slug: "vinny-marchi-big-bad-wolf-big-bad-wolf",
  ownLength: 2.352533333333333,
  ownProgress: 2.352533333333333,
  partOfCollections: ["release/vinny-marchi-big-bad-wolf"],
  status: "completed",
  unit: "unit/minutes",
  title: "Big Bad Wolf",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "bigbadwolf|5USAMqcbMAzF3HBmeD5pJF|141152",
  song: "song/vinny-marchi-big-bad-wolf",
  carriedBy: [
    {
      release: "release/vinny-marchi-big-bad-wolf",
      discNumber: 1,
      position: 1,
      externalId: "3IsEapFmPMrn3lSOyayXhr",
      externalLink: "https://open.spotify.com/track/3IsEapFmPMrn3lSOyayXhr",
    },
  ],
} as const satisfies Track
