import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGracieSThemeLiveGraciesThemeLive = {
  id: "01a0b4c8-6c89-7b22-ab1d-cac889d89bac",
  type: "page-type/track",
  slug: "paul-cardall-gracie-s-theme-live-gracies-theme-live",
  ownLength: 5.018233333333334,
  ownProgress: 5.018233333333334,
  partOfCollections: [
    "release/paul-cardall-gracie-s-theme-live",
    "release/paul-cardall-the-celebrate-life-concert-live",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Gracie's Theme - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "graciesthemelive|7FQRbf8gbKw8KZQZAJWxH2|301094",
  song: "song/paul-cardall-gracies-theme",
  carriedBy: [
    {
      release: "release/paul-cardall-gracie-s-theme-live",
      discNumber: 1,
      position: 1,
      externalId: "7jBwOpAeFIiJTfNCX2evJf",
      externalLink: "https://open.spotify.com/track/7jBwOpAeFIiJTfNCX2evJf",
    },
    {
      release: "release/paul-cardall-the-celebrate-life-concert-live",
      discNumber: 1,
      position: 14,
      externalId: "279qN4iAxK9FFOVFteOa5V",
      externalLink: "https://open.spotify.com/track/279qN4iAxK9FFOVFteOa5V",
    },
  ],
} as const satisfies Track
