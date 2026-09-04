import type { Season } from "../season.page-type.ts"

export const marvelZombiesMiniseries = {
  id: "01a06802-b8ba-7053-84ea-4e64fcb8892a",
  pageTypeSlug: "season",
  slug: "marvel-zombies-miniseries",
  title: "Marvel Zombies Miniseries",
  partOfSlugs: ["marvel-zombies"],
  position: 1,
  ownLength: 136.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2025-09-24",
  externalId: "trakt-season-279654",
  externalLink: "https://trakt.tv/shows/marvel-zombies/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
