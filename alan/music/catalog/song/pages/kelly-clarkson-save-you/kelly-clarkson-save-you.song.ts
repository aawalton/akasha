import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSaveYou = {
  id: "019ea4b2-34cf-74fc-8c31-fdd6e884542c",
  type: "page-type/song",
  slug: "kelly-clarkson-save-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4b2bd486-4ad9-37ac-a1fc-c780d5f166c0",
      externalLink: "https://musicbrainz.org/work/4b2bd486-4ad9-37ac-a1fc-c780d5f166c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Save You",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
