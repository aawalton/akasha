import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanMiseEire = {
  id: "01a0b720-0b76-793e-9701-2ac7f4d14b85",
  type: "page-type/song",
  slug: "celtic-woman-mise-eire",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "442d1260-06e2-4616-a468-5d277ce97d6f",
      externalLink: "https://musicbrainz.org/work/442d1260-06e2-4616-a468-5d277ce97d6f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mise Éire",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
