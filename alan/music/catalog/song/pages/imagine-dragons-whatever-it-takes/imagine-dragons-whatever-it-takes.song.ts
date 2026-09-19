import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsWhateverItTakes = {
  id: "019ea49b-7f94-76e8-882b-fdd85ed8a814",
  type: "page-type/song",
  slug: "imagine-dragons-whatever-it-takes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "15b7431d-2b91-4e66-9c38-9a1fe2a5fb7f",
      externalLink: "https://musicbrainz.org/work/15b7431d-2b91-4e66-9c38-9a1fe2a5fb7f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Whatever It Takes",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
