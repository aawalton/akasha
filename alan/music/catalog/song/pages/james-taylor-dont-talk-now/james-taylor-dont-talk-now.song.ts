import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDontTalkNow = {
  id: "01a0b72f-3035-7911-bca5-ff360c45e49f",
  type: "page-type/song",
  slug: "james-taylor-dont-talk-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dfbcc165-c3bb-49ca-8cc2-f2359848b69e",
      externalLink: "https://musicbrainz.org/work/dfbcc165-c3bb-49ca-8cc2-f2359848b69e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Talk Now",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
