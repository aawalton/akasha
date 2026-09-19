import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanDannyBoy = {
  id: "01a0b720-148f-7911-a09b-f42483f9df13",
  type: "page-type/song",
  slug: "celtic-woman-danny-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d62b3bf6-226f-3580-ab1c-7676aa2d93a9",
      externalLink: "https://musicbrainz.org/work/d62b3bf6-226f-3580-ab1c-7676aa2d93a9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Danny Boy",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
