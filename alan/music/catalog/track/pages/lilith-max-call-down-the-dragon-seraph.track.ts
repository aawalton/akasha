import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxCallDownTheDragonSeraph = {
  id: "01a0c95d-ff0d-7be9-b44a-2ebba2783377",
  type: "page-type/track",
  slug: "lilith-max-call-down-the-dragon-seraph",
  ownLength: 3.1921666666666666,
  ownProgress: 3.1921666666666666,
  partOfCollections: [
    "release/lilith-max-call-down-the-dragon",
    "release/lilith-max-maiden-s-night",
    "release/lilith-max-seraph",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Seraph",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "seraph|797SPxZf82IYq3XCM8c9AM|191530",
  song: "song/lilith-max-seraph",
  carriedBy: [
    {
      release: "release/lilith-max-call-down-the-dragon",
      discNumber: 1,
      position: 1,
      externalId: "1zninNFLaqBM8fZzGzXXZx",
      externalLink: "https://open.spotify.com/track/1zninNFLaqBM8fZzGzXXZx",
    },
    {
      release: "release/lilith-max-maiden-s-night",
      discNumber: 1,
      position: 2,
      externalId: "6768xRW5qPpWKgg5rDFDa8",
      externalLink: "https://open.spotify.com/track/6768xRW5qPpWKgg5rDFDa8",
    },
    {
      release: "release/lilith-max-seraph",
      discNumber: 1,
      position: 1,
      externalId: "0jYe8QsvajczC2QV6utU2i",
      externalLink: "https://open.spotify.com/track/0jYe8QsvajczC2QV6utU2i",
    },
  ],
} as const satisfies Track
