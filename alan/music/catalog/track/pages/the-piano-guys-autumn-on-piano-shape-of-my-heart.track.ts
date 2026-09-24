import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoShapeOfMyHeart = {
  id: "01a0afa1-bfc4-7297-b523-b9146dcf9d22",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-shape-of-my-heart",
  ownLength: 5.093633333333333,
  ownProgress: 0,
  partOfCollections: [
    "release/the-piano-guys-autumn-on-piano",
    "release/the-piano-guys-classical-for-studying",
    "release/the-piano-guys-peaceful-summer-nights",
    "release/the-piano-guys-relaxing-piano",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Shape Of My Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "shapeofmyheart|0jW6R8CVyVohuUJVcuweDI|305618",
  song: "song/the-piano-guys-shape-of-my-heart",
  carriedBy: [
    {
      release: "release/the-piano-guys-autumn-on-piano",
      discNumber: 1,
      position: 4,
      externalId: "5LcMQmnppDuTGIUzPIIDLm",
      externalLink: "https://open.spotify.com/track/5LcMQmnppDuTGIUzPIIDLm",
    },
    {
      release: "release/the-piano-guys-classical-for-studying",
      discNumber: 1,
      position: 13,
      externalId: "3yqkxelLeIqbCPAIqlhpcN",
      externalLink: "https://open.spotify.com/track/3yqkxelLeIqbCPAIqlhpcN",
    },
    {
      release: "release/the-piano-guys-peaceful-summer-nights",
      discNumber: 1,
      position: 13,
      externalId: "0t0vfptUP7qYfFEIiATjcO",
      externalLink: "https://open.spotify.com/track/0t0vfptUP7qYfFEIiATjcO",
    },
    {
      release: "release/the-piano-guys-relaxing-piano",
      discNumber: 1,
      position: 8,
      externalId: "0wWsp2yaL72U4aD9tDaCPf",
      externalLink: "https://open.spotify.com/track/0wWsp2yaL72U4aD9tDaCPf",
    },
  ],
} as const satisfies Track
