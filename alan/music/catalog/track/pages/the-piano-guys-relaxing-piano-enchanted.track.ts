import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoEnchanted = {
  id: "01a0afa1-ca6b-725d-a22c-7a001c882f70",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-enchanted",
  ownLength: 4.9833,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6PulXDg8st2rGQa5jSjZ03",
      externalLink: "https://open.spotify.com/track/6PulXDg8st2rGQa5jSjZ03",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Enchanted",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "enchanted|0jW6R8CVyVohuUJVcuweDI|298998",
  song: "song/the-piano-guys-enchanted",
} as const satisfies Track
