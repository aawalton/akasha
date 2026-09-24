import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoNaturesAfternoon = {
  id: "01a0b4c8-3362-7b93-a9a5-d4ded7d44176",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-natures-afternoon",
  ownLength: 3.0691,
  ownProgress: 3.0691,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Nature's Afternoon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "naturesafternoon|7FQRbf8gbKw8KZQZAJWxH2|184146",
  song: "song/paul-cardall-natures-afternoon",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 17,
      externalId: "6cXVYNqcoEvYXtJmxFSsh9",
      externalLink: "https://open.spotify.com/track/6cXVYNqcoEvYXtJmxFSsh9",
    },
  ],
} as const satisfies Track
