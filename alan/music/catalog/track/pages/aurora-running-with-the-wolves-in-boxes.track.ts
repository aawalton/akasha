import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunningWithTheWolvesInBoxes = {
  id: "01a0b638-11b1-72fe-9dfc-baa9c5c44a13",
  type: "page-type/track",
  slug: "aurora-running-with-the-wolves-in-boxes",
  ownLength: 3.394433333333333,
  ownProgress: 3.394433333333333,
  partOfCollections: ["release/aurora-running-with-the-wolves"],
  status: "completed",
  unit: "unit/minutes",
  title: "In Boxes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "inboxes|1WgXqy2Dd70QQOU7Ay074N|203666",
  song: "song/aurora-in-boxes",
  carriedBy: [
    {
      release: "release/aurora-running-with-the-wolves",
      discNumber: 1,
      position: 3,
      externalId: "3MwSRWz6R18tOMXsNveaBV",
      externalLink: "https://open.spotify.com/track/3MwSRWz6R18tOMXsNveaBV",
    },
  ],
} as const satisfies Track
