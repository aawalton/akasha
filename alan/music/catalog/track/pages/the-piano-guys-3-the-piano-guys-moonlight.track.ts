import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysMoonlight = {
  id: "01a0afa2-1995-7ca7-af68-5984db57407c",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-moonlight",
  ownLength: 3.475,
  ownProgress: 3.475,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  title: "Moonlight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "moonlight|0jW6R8CVyVohuUJVcuweDI|208500",
  song: "song/the-piano-guys-moonlight",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 8,
      externalId: "5CY78JEFsq8TkwxCI5MZbn",
      externalLink: "https://open.spotify.com/track/5CY78JEFsq8TkwxCI5MZbn",
    },
  ],
} as const satisfies Track
