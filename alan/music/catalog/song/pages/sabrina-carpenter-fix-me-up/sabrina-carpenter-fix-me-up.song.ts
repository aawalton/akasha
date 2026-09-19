import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterFixMeUp = {
  id: "01a0b723-cf9c-7966-ad8d-7e116aff1c42",
  type: "page-type/song",
  slug: "sabrina-carpenter-fix-me-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f593871d-f35b-428e-833d-bdd7f09e6eca",
      externalLink: "https://musicbrainz.org/work/f593871d-f35b-428e-833d-bdd7f09e6eca",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fix Me Up",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
