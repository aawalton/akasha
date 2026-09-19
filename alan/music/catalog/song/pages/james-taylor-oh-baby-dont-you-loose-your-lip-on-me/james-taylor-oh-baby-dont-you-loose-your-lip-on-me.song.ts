import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOhBabyDontYouLooseYourLipOnMe = {
  id: "01a0b72f-3b01-708b-9cb1-fb2954c46cf8",
  type: "page-type/song",
  slug: "james-taylor-oh-baby-dont-you-loose-your-lip-on-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "919119c4-1f07-39ed-aebe-36af76b3f240",
      externalLink: "https://musicbrainz.org/work/919119c4-1f07-39ed-aebe-36af76b3f240",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oh Baby, Don't You Loose Your Lip on Me",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
