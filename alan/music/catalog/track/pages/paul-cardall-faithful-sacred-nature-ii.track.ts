import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulSacredNatureIi = {
  id: "01a0b4c8-5a92-7f87-a01b-1efed011a5c7",
  type: "page-type/track",
  slug: "paul-cardall-faithful-sacred-nature-ii",
  ownLength: 3.933333333333333,
  ownProgress: 3.933333333333333,
  partOfCollections: ["release/paul-cardall-faithful", "release/paul-cardall-saving-tiny-hearts"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sacred Nature II",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sacrednatureii|7FQRbf8gbKw8KZQZAJWxH2|236000",
  song: "song/paul-cardall-sacred-nature-ii",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 10,
      externalId: "0IfYPxpBGDvJz4BHSNyr5Y",
      externalLink: "https://open.spotify.com/track/0IfYPxpBGDvJz4BHSNyr5Y",
    },
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 12,
      externalId: "0TWchb60HAhwj0Gs5V60No",
      externalLink: "https://open.spotify.com/track/0TWchb60HAhwj0Gs5V60No",
    },
  ],
} as const satisfies Track
