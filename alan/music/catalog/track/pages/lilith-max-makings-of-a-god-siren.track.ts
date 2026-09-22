import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxMakingsOfAGodSiren = {
  id: "01a0c95d-fd04-76a1-9229-c22444d87084",
  type: "page-type/track",
  slug: "lilith-max-makings-of-a-god-siren",
  ownLength: 2.9277166666666665,
  ownProgress: 0,
  partOfCollections: ["release/lilith-max-makings-of-a-god"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Siren",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "siren|797SPxZf82IYq3XCM8c9AM|175663",
  song: "song/lilith-max-siren",
  carriedBy: [
    {
      release: "release/lilith-max-makings-of-a-god",
      discNumber: 1,
      position: 5,
      externalId: "38fksr6k9XZEgh3Epdud4Z",
      externalLink: "https://open.spotify.com/track/38fksr6k9XZEgh3Epdud4Z",
    },
  ],
} as const satisfies Track
