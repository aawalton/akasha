import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysCelloWars = {
  id: "01a0afa2-194f-7156-b895-d752feb09a32",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-cello-wars",
  ownLength: 3.53255,
  ownProgress: 3.53255,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cello Wars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "cellowars|0jW6R8CVyVohuUJVcuweDI|211953",
  song: "song/the-piano-guys-cello-wars",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 6,
      externalId: "5D6L6znBkFeIixyoOpWmH6",
      externalLink: "https://open.spotify.com/track/5D6L6znBkFeIixyoOpWmH6",
    },
  ],
} as const satisfies Track
