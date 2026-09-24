import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPassingTimeHappierTimes = {
  id: "01a0b4c8-6c11-7905-843c-87d42f75340a",
  type: "page-type/track",
  slug: "paul-cardall-passing-time-happier-times",
  ownLength: 1.46895,
  ownProgress: 1.46895,
  partOfCollections: ["release/paul-cardall-passing-time"],
  status: "completed",
  unit: "unit/minutes",
  title: "Happier Times",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "happiertimes|7FQRbf8gbKw8KZQZAJWxH2|88137",
  song: "song/paul-cardall-happier-times",
  carriedBy: [
    {
      release: "release/paul-cardall-passing-time",
      discNumber: 1,
      position: 3,
      externalId: "5kGWSULTUdLHiIGraVpybl",
      externalLink: "https://open.spotify.com/track/5kGWSULTUdLHiIGraVpybl",
    },
  ],
} as const satisfies Track
