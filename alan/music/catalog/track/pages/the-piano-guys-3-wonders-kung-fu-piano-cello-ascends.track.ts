import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersKungFuPianoCelloAscends = {
  id: "01a0afa2-1619-7ec0-9bed-3ba8a9e52ec7",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-kung-fu-piano-cello-ascends",
  ownLength: 4.041333333333333,
  ownProgress: 4.041333333333333,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7aOZjw0y61VZwTHQhzBe6v",
      externalLink: "https://open.spotify.com/track/7aOZjw0y61VZwTHQhzBe6v",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Kung Fu Piano: Cello Ascends",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "kungfupianocelloascends|0jW6R8CVyVohuUJVcuweDI|242480",
  song: "song/the-piano-guys-kung-fu-piano-cello-ascends",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-wonders",
      discNumber: 1,
      position: 5,
      externalId: "7aOZjw0y61VZwTHQhzBe6v",
      externalLink: "https://open.spotify.com/track/7aOZjw0y61VZwTHQhzBe6v",
    },
  ],
} as const satisfies Track
