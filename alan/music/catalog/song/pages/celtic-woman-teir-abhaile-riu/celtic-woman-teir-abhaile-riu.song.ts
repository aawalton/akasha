import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTeirAbhaileRiu = {
  id: "01a0b720-0a59-72bb-ab26-9a909ce4aba3",
  type: "page-type/song",
  slug: "celtic-woman-teir-abhaile-riu",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "30e67368-f8ba-4f45-8f46-621c93a8cb8f",
      externalLink: "https://musicbrainz.org/work/30e67368-f8ba-4f45-8f46-621c93a8cb8f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Téir abhaile Riú",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
