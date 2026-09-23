import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverItsNiceToHaveAFriend = {
  id: "01a0ce86-706b-775d-a870-361796d7cb75",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-its-nice-to-have-a-friend",
  ownLength: 2.5073333333333334,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "It’s Nice To Have A Friend",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "itsnicetohaveafriend|06HL4z0CvFAxyc27GXpf02|150440",
  song: "song/taylor-swift-it-s-nice-to-have-a-friend",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 17,
      externalId: "1SmiQ65iSAbPto6gPFlBYm",
      externalLink: "https://open.spotify.com/track/1SmiQ65iSAbPto6gPFlBYm",
    },
  ],
} as const satisfies Track
