import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodLetItGo = {
  id: "01a0afa2-1baf-7f2d-bad3-2d986ffc58d5",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-let-it-go",
  ownLength: 4.062666666666667,
  ownProgress: 4.062666666666667,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Let It Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "letitgo|0jW6R8CVyVohuUJVcuweDI|243760",
  song: "song/the-piano-guys-let-it-go",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 7,
      externalId: "3QOelbDFgwXiagpUHBxARi",
      externalLink: "https://open.spotify.com/track/3QOelbDFgwXiagpUHBxARi",
    },
  ],
} as const satisfies Track
