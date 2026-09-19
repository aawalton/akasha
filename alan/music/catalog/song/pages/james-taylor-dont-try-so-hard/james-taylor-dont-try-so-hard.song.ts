import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDontTrySoHard = {
  id: "01a0b72f-2e07-7b9a-8086-a91148f9d8ee",
  type: "page-type/song",
  slug: "james-taylor-dont-try-so-hard",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bff50213-9162-4b47-9ed8-fb4c13443e2b",
      externalLink: "https://musicbrainz.org/work/bff50213-9162-4b47-9ed8-fb4c13443e2b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don't Try So Hard",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
