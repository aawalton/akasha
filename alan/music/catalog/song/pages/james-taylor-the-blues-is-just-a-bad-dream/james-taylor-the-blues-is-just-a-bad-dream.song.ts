import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheBluesIsJustABadDream = {
  id: "01a0b72f-4f02-7537-8510-27bcc0c75f9b",
  type: "page-type/song",
  slug: "james-taylor-the-blues-is-just-a-bad-dream",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "82de2ffd-ca4a-4928-8ea0-bc578fa91be4",
      externalLink: "https://musicbrainz.org/work/82de2ffd-ca4a-4928-8ea0-bc578fa91be4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Blues Is Just a Bad Dream",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
