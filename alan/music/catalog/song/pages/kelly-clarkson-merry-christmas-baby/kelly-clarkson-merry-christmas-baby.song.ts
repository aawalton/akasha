import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMerryChristmasBaby = {
  id: "019ea4ad-440c-759e-a501-62f05e885008",
  type: "page-type/song",
  slug: "kelly-clarkson-merry-christmas-baby",
  title: "Merry Christmas Baby",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2131259f-ae81-434d-a37f-8cd8130a2cc3",
      externalLink: "https://musicbrainz.org/work/2131259f-ae81-434d-a37f-8cd8130a2cc3",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
