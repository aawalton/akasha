import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PicturesAtAnExhibitionPicturesAtAnExhibition = {
  id: "01a0afa2-1ce4-72d1-9e77-9947178ad23c",
  type: "page-type/track",
  slug: "the-piano-guys-3-pictures-at-an-exhibition-pictures-at-an-exhibition",
  ownLength: 4.004166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pictures-at-an-exhibition"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "38v6v6pstbCepnNydKEiee",
      externalLink: "https://open.spotify.com/track/38v6v6pstbCepnNydKEiee",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Pictures at an Exhibition",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "picturesatanexhibition|0jW6R8CVyVohuUJVcuweDI|240250",
  song: "song/the-piano-guys-pictures-at-an-exhibition",
} as const satisfies Track
