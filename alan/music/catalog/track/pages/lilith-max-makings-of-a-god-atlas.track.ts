import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxMakingsOfAGodAtlas = {
  id: "01a0c95d-fc51-7e56-a251-bf78f4ce5dc5",
  type: "page-type/track",
  slug: "lilith-max-makings-of-a-god-atlas",
  ownLength: 3.11865,
  ownProgress: 3.11865,
  partOfCollections: ["release/lilith-max-makings-of-a-god"],
  status: "completed",
  unit: "unit/minutes",
  title: "Atlas",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/lilith-max" }],
  trackKey: "atlas|797SPxZf82IYq3XCM8c9AM|187119",
  song: "song/lilith-max-atlas",
  carriedBy: [
    {
      release: "release/lilith-max-makings-of-a-god",
      discNumber: 1,
      position: 1,
      externalId: "51ySe8dpEIZWhelmYyBOgg",
      externalLink: "https://open.spotify.com/track/51ySe8dpEIZWhelmYyBOgg",
    },
  ],
} as const satisfies Track
