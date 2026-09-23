import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2WillowTheWitchCollectionWillowLonelyWitchVersion = {
  id: "01a0ce86-a50f-7452-b9bb-e17ab7966e06",
  type: "page-type/track",
  slug: "taylor-swift-2-willow-the-witch-collection-willow-lonely-witch-version",
  ownLength: 3.57755,
  ownProgress: 3.57755,
  partOfCollections: [
    "release/taylor-swift-2-willow-the-witch-collection",
    "release/taylor-swift-2-willow-lonely-witch-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "willow - lonely witch version",
  trackType: "version",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "willowlonelywitchversion|06HL4z0CvFAxyc27GXpf02|214653",
  song: "song/taylor-swift-willow",
  carriedBy: [
    {
      release: "release/taylor-swift-2-willow-lonely-witch-version",
      discNumber: 1,
      position: 1,
      externalId: "0U0etHtpARihOUUY8Akc7y",
      externalLink: "https://open.spotify.com/track/0U0etHtpARihOUUY8Akc7y",
    },
    {
      release: "release/taylor-swift-2-willow-the-witch-collection",
      discNumber: 1,
      position: 3,
      externalId: "77d7q9TNbsIDmRTDPkPv3L",
      externalLink: "https://open.spotify.com/track/77d7q9TNbsIDmRTDPkPv3L",
    },
  ],
} as const satisfies Track
