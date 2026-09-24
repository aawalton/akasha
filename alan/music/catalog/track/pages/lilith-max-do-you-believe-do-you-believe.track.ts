import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxDoYouBelieveDoYouBelieve = {
  id: "01a0c95e-008d-7247-ae04-981496063ff2",
  type: "page-type/track",
  slug: "lilith-max-do-you-believe-do-you-believe",
  ownLength: 2.8685,
  ownProgress: 2.8685,
  partOfCollections: ["release/lilith-max-do-you-believe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Do You Believe",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/lilith-max" }],
  trackKey: "doyoubelieve|797SPxZf82IYq3XCM8c9AM|172110",
  song: "song/lilith-max-do-you-believe",
  carriedBy: [
    {
      release: "release/lilith-max-do-you-believe",
      discNumber: 1,
      position: 1,
      externalId: "7sgx8dfJJ2WUxdLjzwbdbN",
      externalLink: "https://open.spotify.com/track/7sgx8dfJJ2WUxdLjzwbdbN",
    },
  ],
} as const satisfies Track
