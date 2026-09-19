import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysNearerMyGodToThee = {
  id: "01a0b71e-9f55-7f60-9819-df922511960c",
  type: "page-type/song",
  slug: "the-piano-guys-nearer-my-god-to-thee",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f0be02e5-a2b5-35f3-b53f-7d3175e76e9b",
      externalLink: "https://musicbrainz.org/work/f0be02e5-a2b5-35f3-b53f-7d3175e76e9b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nearer, My God, to Thee",
  artist: "artist/the-piano-guys",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
