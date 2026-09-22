import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxAmIFreeAmIFree = {
  id: "01a0c95e-005b-7013-a8aa-e6a547007d76",
  type: "page-type/track",
  slug: "lilith-max-am-i-free-am-i-free",
  ownLength: 2.3807666666666667,
  ownProgress: 2.3807666666666667,
  partOfCollections: ["release/lilith-max-am-i-free"],
  status: "completed",
  unit: "unit/minutes",
  title: "Am I Free",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "amifree|797SPxZf82IYq3XCM8c9AM|142846",
  song: "song/lilith-max-am-i-free",
  carriedBy: [
    {
      release: "release/lilith-max-am-i-free",
      discNumber: 1,
      position: 1,
      externalId: "6criMCLtN1J7EffWJG8CWV",
      externalLink: "https://open.spotify.com/track/6criMCLtN1J7EffWJG8CWV",
    },
  ],
} as const satisfies Track
