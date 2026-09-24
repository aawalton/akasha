import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassQuayesTheme = {
  id: "01a0b4c8-6154-7f54-943e-836bcbd2a618",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-quayes-theme",
  ownLength: 3.7771,
  ownProgress: 3.7771,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Quaye's Theme",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "quayestheme|7FQRbf8gbKw8KZQZAJWxH2|226626",
  song: "song/paul-cardall-quayes-theme",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 9,
      externalId: "29Hnf236RAcKaL9pUaryDB",
      externalLink: "https://open.spotify.com/track/29Hnf236RAcKaL9pUaryDB",
    },
  ],
} as const satisfies Track
