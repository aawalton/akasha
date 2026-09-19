import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIMHappy = {
  id: "019ea49a-59e9-7ff1-b561-9600de385b64",
  type: "page-type/song",
  slug: "imagine-dragons-i-m-happy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c0bfa305-0705-4b83-a10e-96cd2baef8e9",
      externalLink: "https://musicbrainz.org/work/c0bfa305-0705-4b83-a10e-96cd2baef8e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’m Happy",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
