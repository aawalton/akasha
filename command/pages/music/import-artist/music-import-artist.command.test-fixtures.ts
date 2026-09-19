import type { LrclibRecord } from "akasha/alan/music/catalog/modules/lrclib-schema/lrclib-schema.module.code.ts"
import type {
  MbArtist,
  MbRecording,
  MbWork,
} from "akasha/alan/music/catalog/modules/musicbrainz-schema/musicbrainz-schema.module.code.ts"

export const MBID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"

export const ARTIST_NAME = "Probe Artist Nine"

export const ARTIST_SLUG = "probe-artist-nine"

export const TODAY = "2026-09-02"

export const ARTIST: MbArtist = {
  id: MBID,
  name: ARTIST_NAME,
  genres: [
    { name: "folk", count: 9 },
    { name: "ambient", count: 2 },
  ],
}

export function workOf(id: string, title: string): MbWork {
  return {
    id,
    title,
    relations: [
      { type: "writer", "target-type": "artist", artist: { id: MBID, name: ARTIST_NAME } },
    ],
  }
}

export function recordingOf(id: string, title: string, workId: string | null): MbRecording {
  return {
    id,
    title,
    relations:
      workId === null
        ? []
        : [{ type: "performance", "target-type": "work", work: { id: workId, title } }],
  }
}

export function lyricsOf(title: string): LrclibRecord {
  return {
    id: 1,
    trackName: title,
    artistName: ARTIST_NAME,
    instrumental: false,
    plainLyrics: `the words of ${title}\n`,
    syncedLyrics: `[00:01.00] the words of ${title}\n`,
  }
}
