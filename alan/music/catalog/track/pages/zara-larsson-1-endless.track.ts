import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1Endless = {
  id: "01a0aa7c-3570-71ce-91cb-272bf0793f9b",
  type: "page-type/track",
  slug: "zara-larsson-1-endless",
  ownLength: 2.7791,
  ownProgress: 2.7791,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Endless",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "endless|1Xylc3o4UrD53lo9CvFvVg|166746",
  song: "song/zara-larsson-endless",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 10,
      externalId: "381rMzk1u46CsMKmrlWoss",
      externalLink: "https://open.spotify.com/track/381rMzk1u46CsMKmrlWoss",
    },
  ],
} as const satisfies Track
