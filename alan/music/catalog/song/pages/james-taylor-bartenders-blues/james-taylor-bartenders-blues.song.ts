import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBartendersBlues = {
  id: "01a0b72f-1fbf-7575-bbc5-ffd9bad9b55f",
  type: "page-type/song",
  slug: "james-taylor-bartenders-blues",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "09f11926-aa69-4259-89aa-3fe8a8d5585d",
      externalLink: "https://musicbrainz.org/work/09f11926-aa69-4259-89aa-3fe8a8d5585d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bartender’s Blues",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
