import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const evynneHollensAThousandYears = {
  id: "019ea4cf-0d36-7d0b-a473-30436cf374ac",
  type: "page-type/song",
  slug: "evynne-hollens-a-thousand-years",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2cb8d852-60c7-4e63-88f0-487624de93bd",
      externalLink: "https://musicbrainz.org/work/2cb8d852-60c7-4e63-88f0-487624de93bd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Thousand Years",
  artist: "artist/evynne-hollens",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
