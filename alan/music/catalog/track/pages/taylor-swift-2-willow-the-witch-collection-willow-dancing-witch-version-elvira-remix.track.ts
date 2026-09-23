import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2WillowTheWitchCollectionWillowDancingWitchVersionElviraRemix = {
  id: "01a0ce86-a539-7845-8d45-75874ed30750",
  type: "page-type/track",
  slug: "taylor-swift-2-willow-the-witch-collection-willow-dancing-witch-version-elvira-remix",
  ownLength: 3.0803166666666666,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-willow-the-witch-collection",
    "release/taylor-swift-2-willow-dancing-witch-version-elvira-remix",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "willow - dancing witch version (Elvira remix)",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "4nhsQ3u12To27WM6rqNEa1", artistName: "ELVIRA" },
  ],
  trackKey:
    "willowdancingwitchversionelviraremix|06HL4z0CvFAxyc27GXpf02,4nhsQ3u12To27WM6rqNEa1|184819",
  song: "song/taylor-swift-willow",
  carriedBy: [
    {
      release: "release/taylor-swift-2-willow-dancing-witch-version-elvira-remix",
      discNumber: 1,
      position: 1,
      externalId: "2NnrAdjE9cPdMklonMBuAv",
      externalLink: "https://open.spotify.com/track/2NnrAdjE9cPdMklonMBuAv",
    },
    {
      release: "release/taylor-swift-2-willow-the-witch-collection",
      discNumber: 1,
      position: 2,
      externalId: "2Ta5c5Z6DvM8GX0U1polSo",
      externalLink: "https://open.spotify.com/track/2Ta5c5Z6DvM8GX0U1polSo",
    },
  ],
} as const satisfies Track
