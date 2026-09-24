import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxBornToDieBornToDie = {
  id: "01a0c95e-020b-71d2-a6c9-b200072f1607",
  type: "page-type/track",
  slug: "lilith-max-born-to-die-born-to-die",
  ownLength: 2.2774833333333335,
  ownProgress: 2.2774833333333335,
  partOfCollections: ["release/lilith-max-born-to-die"],
  status: "completed",
  unit: "unit/minutes",
  title: "Born to Die",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/lilith-max" }],
  trackKey: "borntodie|797SPxZf82IYq3XCM8c9AM|136649",
  song: "song/lilith-max-born-to-die",
  carriedBy: [
    {
      release: "release/lilith-max-born-to-die",
      discNumber: 1,
      position: 1,
      externalId: "2FOusdjeDRceOUbTuuJFzG",
      externalLink: "https://open.spotify.com/track/2FOusdjeDRceOUbTuuJFzG",
    },
  ],
} as const satisfies Track
