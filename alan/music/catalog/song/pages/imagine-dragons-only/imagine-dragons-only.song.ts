import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsOnly = {
  id: "019ea497-c55b-79dd-8bcc-9a1e271d4d91",
  type: "page-type/song",
  slug: "imagine-dragons-only",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "46680f5f-59b3-4875-9b87-3cad595b1606",
      externalLink: "https://musicbrainz.org/work/46680f5f-59b3-4875-9b87-3cad595b1606",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
