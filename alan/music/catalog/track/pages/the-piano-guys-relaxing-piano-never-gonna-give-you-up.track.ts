import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoNeverGonnaGiveYouUp = {
  id: "01a0afa1-cacb-72d6-8e0a-ae5c229dc7c3",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-never-gonna-give-you-up",
  ownLength: 3.04385,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6AAlGtVKyXWrEMkpSpuaD3",
      externalLink: "https://open.spotify.com/track/6AAlGtVKyXWrEMkpSpuaD3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Never Gonna Give You Up",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "nevergonnagiveyouup|0jW6R8CVyVohuUJVcuweDI|182631",
} as const satisfies Track
