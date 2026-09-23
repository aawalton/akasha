import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989TaylorSVersionDeluxeStyleTaylorsVersion = {
  id: "01a0ce86-430b-71e9-b2cf-b5f13ffd67bd",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-taylor-s-version-deluxe-style-taylors-version",
  ownLength: 3.85,
  ownProgress: 3.85,
  partOfCollections: [
    "release/taylor-swift-2-1989-taylor-s-version-deluxe",
    "release/taylor-swift-2-1989-taylor-s-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Style (Taylor's Version)",
  trackType: "version",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "styletaylorsversion|06HL4z0CvFAxyc27GXpf02|231000",
  song: "song/taylor-swift-style",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989-taylor-s-version",
      discNumber: 1,
      position: 3,
      externalId: "1hjRhYpWyqDpPahmSlUTlc",
      externalLink: "https://open.spotify.com/track/1hjRhYpWyqDpPahmSlUTlc",
    },
    {
      release: "release/taylor-swift-2-1989-taylor-s-version-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "3Vpk1hfMAQme8VJ0SNRSkd",
      externalLink: "https://open.spotify.com/track/3Vpk1hfMAQme8VJ0SNRSkd",
    },
  ],
} as const satisfies Track
