import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersHome = {
  id: "01a0afa2-169b-7d02-a1f1-d68fcff03753",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-home",
  ownLength: 4.626,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1mdUTN1RtD2oOUIusIhium",
      externalLink: "https://open.spotify.com/track/1mdUTN1RtD2oOUIusIhium",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Home",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "home|0jW6R8CVyVohuUJVcuweDI|277560",
  song: "song/the-piano-guys-home",
} as const satisfies Track
