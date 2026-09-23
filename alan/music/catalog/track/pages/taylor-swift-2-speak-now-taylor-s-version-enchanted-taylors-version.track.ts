import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowTaylorSVersionEnchantedTaylorsVersion = {
  id: "01a0ce86-4705-7320-beae-a83eb81b6acc",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-taylor-s-version-enchanted-taylors-version",
  ownLength: 5.88755,
  ownProgress: 5.88755,
  partOfCollections: ["release/taylor-swift-2-speak-now-taylor-s-version"],
  status: "completed",
  unit: "unit/minutes",
  title: "Enchanted (Taylor's Version)",
  trackType: "version",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "enchantedtaylorsversion|06HL4z0CvFAxyc27GXpf02|353253",
  song: "song/taylor-swift-enchanted",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now-taylor-s-version",
      discNumber: 1,
      position: 9,
      externalId: "3sW3oSbzsfecv9XoUdGs7h",
      externalLink: "https://open.spotify.com/track/3sW3oSbzsfecv9XoUdGs7h",
    },
  ],
} as const satisfies Track
