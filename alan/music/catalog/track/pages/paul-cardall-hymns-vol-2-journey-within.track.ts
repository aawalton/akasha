import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsVol2JourneyWithin = {
  id: "01a0b4c8-6019-7651-8b77-1fda1c994b8b",
  type: "page-type/track",
  slug: "paul-cardall-hymns-vol-2-journey-within",
  ownLength: 4.763333333333334,
  ownProgress: 4.763333333333334,
  partOfCollections: ["release/paul-cardall-hymns-vol-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Journey Within",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "journeywithin|7FQRbf8gbKw8KZQZAJWxH2|285800",
  song: "song/paul-cardall-journey-within",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns-vol-2",
      discNumber: 1,
      position: 13,
      externalId: "7B5pEcUL4UgQVsUhFPYusU",
      externalLink: "https://open.spotify.com/track/7B5pEcUL4UgQVsUhFPYusU",
    },
  ],
} as const satisfies Track
