import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessAMillionDreams = {
  id: "01a0afa2-0e46-78cb-bba1-5b57e0466e85",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-a-million-dreams",
  ownLength: 4.76395,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4v6EUO6tC8RlZDvJ3DBV86",
      externalLink: "https://open.spotify.com/track/4v6EUO6tC8RlZDvJ3DBV86",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Million Dreams",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "amilliondreams|0jW6R8CVyVohuUJVcuweDI|285837",
  song: "song/evynne-hollens-a-million-dreams",
} as const satisfies Track
