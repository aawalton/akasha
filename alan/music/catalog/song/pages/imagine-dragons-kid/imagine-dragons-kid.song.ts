import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsKid = {
  id: "019ea49a-c9bd-7e52-845a-78e1330c862c",
  type: "page-type/song",
  slug: "imagine-dragons-kid",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e200fea5-c3df-4e38-8754-2545b979c55c",
      externalLink: "https://musicbrainz.org/work/e200fea5-c3df-4e38-8754-2545b979c55c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Kid",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
