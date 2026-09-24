import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenAprilSkies = {
  id: "01a0b4c8-4bec-7c7d-9281-ca4387dc3161",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-april-skies",
  ownLength: 3.580216666666667,
  ownProgress: 3.580216666666667,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "April Skies",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "aprilskies|7FQRbf8gbKw8KZQZAJWxH2|214813",
  song: "song/paul-cardall-april-skies",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 20,
      externalId: "7xKPDPFctjCX7ATFNkuwa8",
      externalLink: "https://open.spotify.com/track/7xKPDPFctjCX7ATFNkuwa8",
    },
  ],
} as const satisfies Track
