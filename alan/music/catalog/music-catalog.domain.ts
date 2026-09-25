import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const musicCatalog = {
  id: "01a06238-8d2c-7f24-81f1-c8b7232268d3",
  type: "page-type/domain",
  slug: "music-catalog",
  definition: "songs and their artists",
  parts: [
    "module/catalogue-held",
    "module/lrclib-client",
    "module/lrclib-map",
    "module/lrclib-schema",
    "module/musicbrainz-client",
    "module/musicbrainz-map",
    "module/musicbrainz-schema",
    "module/catalogue-slug",
    "module/release-syncing",
    "module/song-filing",
    "module/song-matching",
    "module/song-words",
    "module/track-syncing",
    "module/track-typing",
    "page-type/artist",
    "page-type/artist-collection",
    "page-type/release",
    "page-type/release-collection",
    "page-type/song",
    "page-type/track",
    "service-workstation/spotify-sync",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "MusicBrainz names an artist and the songs MusicBrainz holds a record of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "LRCLIB states the words of a song.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify states the releases an artist put out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No song waits on a record in MusicBrainz to be filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A release reads its listening off the tracks it carries rather than holding its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One recording is one track page, whatever releases carry that recording.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track carries the grade Alan gives the recording he heard.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No grade a track carries is read up into the song that track records.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song carries no grade, because Alan grades the recording he heard.",
    },
  ],
} as const satisfies Domain
