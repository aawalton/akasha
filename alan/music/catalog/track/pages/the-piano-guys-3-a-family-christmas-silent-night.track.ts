import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasSilentNight = {
  id: "01a0afa2-187f-714d-ad34-dbff30a4a619",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-silent-night",
  ownLength: 3.5021166666666668,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "48O4tCMl9OJqyLLhd7u7hF",
      externalLink: "https://open.spotify.com/track/48O4tCMl9OJqyLLhd7u7hF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Silent Night",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "395Z91yDQ05pkMbRKik18y", artistName: "Franz Xaver Gruber" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey: "silentnight|0jW6R8CVyVohuUJVcuweDI,395Z91yDQ05pkMbRKik18y|210127",
  song: "song/celtic-woman-silent-night",
} as const satisfies Track
