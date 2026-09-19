import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonIMMovinOn = {
  id: "019ea4b0-10a2-7d21-96c6-bd8ddc1d8d36",
  type: "page-type/song",
  slug: "kelly-clarkson-i-m-movin-on",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ca38f867-8093-4458-bf28-0163edd20e7d",
      externalLink: "https://musicbrainz.org/work/ca38f867-8093-4458-bf28-0163edd20e7d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I'm Movin' On",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
