import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2Unstoppable = {
  id: "01a0afa1-d9fa-78f0-9417-f3de7ac442b8",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-unstoppable",
  ownLength: 2.5229833333333334,
  ownProgress: 2.5229833333333334,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Unstoppable",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "unstoppable|0jW6R8CVyVohuUJVcuweDI|151379",
  song: "song/the-piano-guys-unstoppable",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-unstoppable-2",
      discNumber: 1,
      position: 1,
      externalId: "090f42AlEUVacfstqTmYCh",
      externalLink: "https://open.spotify.com/track/090f42AlEUVacfstqTmYCh",
    },
  ],
} as const satisfies Track
