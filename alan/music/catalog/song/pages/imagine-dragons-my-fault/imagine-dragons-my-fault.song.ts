import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsMyFault = {
  id: "019ea499-19de-7f87-b533-deeb4b4c32d5",
  type: "page-type/song",
  slug: "imagine-dragons-my-fault",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79b86689-a222-4a13-811c-3f8d3877e773",
      externalLink: "https://musicbrainz.org/work/79b86689-a222-4a13-811c-3f8d3877e773",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Fault",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
