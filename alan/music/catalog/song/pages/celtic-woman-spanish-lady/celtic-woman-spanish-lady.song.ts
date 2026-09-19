import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSpanishLady = {
  id: "01a0b720-0c38-73df-ab6b-f9fff04e242f",
  type: "page-type/song",
  slug: "celtic-woman-spanish-lady",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "568c0a9d-17a2-4051-a8f4-94adfd5c6471",
      externalLink: "https://musicbrainz.org/work/568c0a9d-17a2-4051-a8f4-94adfd5c6471",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Spanish Lady",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
