import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3InTheStarsInTheStars = {
  id: "01a0afa1-efd1-7897-8036-83184971a3da",
  type: "page-type/track",
  slug: "the-piano-guys-3-in-the-stars-in-the-stars",
  ownLength: 3.6346,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-in-the-stars"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zkLrc401RiE6YuekwE7Ju",
      externalLink: "https://open.spotify.com/track/4zkLrc401RiE6YuekwE7Ju",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "In The Stars",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "inthestars|0jW6R8CVyVohuUJVcuweDI|218076",
  song: "song/the-piano-guys-in-the-stars",
} as const satisfies Track
