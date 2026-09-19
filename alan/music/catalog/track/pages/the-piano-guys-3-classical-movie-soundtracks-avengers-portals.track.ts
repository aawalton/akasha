import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ClassicalMovieSoundtracksAvengersPortals = {
  id: "01a0afa1-d352-7ae9-aecd-324ae687f49d",
  type: "page-type/track",
  slug: "the-piano-guys-3-classical-movie-soundtracks-avengers-portals",
  ownLength: 2.95,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-classical-movie-soundtracks"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0etevsX5XoKxi34X7dYHJN",
      externalLink: "https://open.spotify.com/track/0etevsX5XoKxi34X7dYHJN",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Avengers/Portals",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "avengersportals|0jW6R8CVyVohuUJVcuweDI|177000",
  song: "song/the-piano-guys-avengers-portals",
} as const satisfies Track
