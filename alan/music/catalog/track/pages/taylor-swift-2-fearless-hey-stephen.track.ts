import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessHeyStephen = {
  id: "01a0ce86-8f8b-7dc6-a11d-777d9cff88db",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-hey-stephen",
  ownLength: 4.238433333333333,
  ownProgress: 4.238433333333333,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hey Stephen",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "heystephen|06HL4z0CvFAxyc27GXpf02|254306",
  song: "song/taylor-swift-hey-stephen",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 4,
      externalId: "4WXzzCof26KJLTK5kK53dS",
      externalLink: "https://open.spotify.com/track/4WXzzCof26KJLTK5kK53dS",
    },
  ],
} as const satisfies Track
