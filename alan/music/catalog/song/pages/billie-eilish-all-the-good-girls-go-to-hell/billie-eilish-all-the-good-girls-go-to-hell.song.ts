import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishAllTheGoodGirlsGoToHell = {
  id: "019ea4a8-7956-7e87-af31-2e5dee77514a",
  type: "page-type/song",
  slug: "billie-eilish-all-the-good-girls-go-to-hell",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "13f586cd-e412-4b71-a2c0-c2a53fc4c1f8",
      externalLink: "https://musicbrainz.org/work/13f586cd-e412-4b71-a2c0-c2a53fc4c1f8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "all the good girls go to hell",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
