import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoBedtimeStoryLullaby = {
  id: "01a0b4c8-3323-72eb-8d7a-365d7531ce5c",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-bedtime-story-lullaby",
  ownLength: 2.518,
  ownProgress: 2.518,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bedtime Story Lullaby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "bedtimestorylullaby|7FQRbf8gbKw8KZQZAJWxH2|151080",
  song: "song/paul-cardall-bedtime-story-lullaby",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 15,
      externalId: "48J6WaPuGaXbR3nfPgDkWf",
      externalLink: "https://open.spotify.com/track/48J6WaPuGaXbR3nfPgDkWf",
    },
  ],
} as const satisfies Track
