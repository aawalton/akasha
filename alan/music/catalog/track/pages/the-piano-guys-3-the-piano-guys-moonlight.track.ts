import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysMoonlight = {
  id: "01a0afa2-1995-7ca7-af68-5984db57407c",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-moonlight",
  ownLength: 3.475,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5CY78JEFsq8TkwxCI5MZbn",
      externalLink: "https://open.spotify.com/track/5CY78JEFsq8TkwxCI5MZbn",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Moonlight",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "moonlight|0jW6R8CVyVohuUJVcuweDI|208500",
  song: "song/the-piano-guys-moonlight",
} as const satisfies Track
