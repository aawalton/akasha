import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiAtmosphereAtmosphere = {
  id: "01a0b112-9743-7977-86af-19717e94089e",
  type: "page-type/track",
  slug: "vinny-marchi-atmosphere-atmosphere",
  ownLength: 3.4151833333333332,
  ownProgress: 3.4151833333333332,
  partOfCollections: ["release/vinny-marchi-atmosphere"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6FAz7xrWdeXGentftxyqd5",
      externalLink: "https://open.spotify.com/track/6FAz7xrWdeXGentftxyqd5",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Atmosphere",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "atmosphere|5USAMqcbMAzF3HBmeD5pJF|204911",
  song: "song/vinny-marchi-atmosphere",
  carriedBy: [
    {
      release: "release/vinny-marchi-atmosphere",
      discNumber: 1,
      position: 1,
      externalId: "6FAz7xrWdeXGentftxyqd5",
      externalLink: "https://open.spotify.com/track/6FAz7xrWdeXGentftxyqd5",
    },
  ],
} as const satisfies Track
