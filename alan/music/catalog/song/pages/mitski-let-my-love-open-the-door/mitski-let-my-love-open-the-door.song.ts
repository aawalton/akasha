import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiLetMyLoveOpenTheDoor = {
  id: "019f0ea8-4571-7ffe-932d-7af6d35b962a",
  type: "page-type/song",
  slug: "mitski-let-my-love-open-the-door",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f1a6e60e-1189-40de-9d92-729d19f66cc3",
      externalLink: "https://musicbrainz.org/work/f1a6e60e-1189-40de-9d92-729d19f66cc3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let My Love Open the Door",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
