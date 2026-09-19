import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayColourSpectrum = {
  id: "01a0ba5d-4417-761e-a226-6c7e6072c688",
  type: "page-type/song",
  slug: "coldplay-colour-spectrum",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ac550243-df3e-4a20-b7a9-ba238e01479f",
      externalLink: "https://musicbrainz.org/work/ac550243-df3e-4a20-b7a9-ba238e01479f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Colour Spectrum",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
