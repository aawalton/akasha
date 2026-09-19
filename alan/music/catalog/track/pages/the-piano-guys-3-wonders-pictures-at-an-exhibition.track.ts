import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersPicturesAtAnExhibition = {
  id: "01a0afa2-16fd-799b-a51e-e0b2681557a8",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-pictures-at-an-exhibition",
  ownLength: 4.038,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6dqDzxkK6QVjRIogGJo9U9",
      externalLink: "https://open.spotify.com/track/6dqDzxkK6QVjRIogGJo9U9",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Pictures at an Exhibition",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "picturesatanexhibition|0jW6R8CVyVohuUJVcuweDI|242280",
  song: "song/the-piano-guys-pictures-at-an-exhibition",
} as const satisfies Track
