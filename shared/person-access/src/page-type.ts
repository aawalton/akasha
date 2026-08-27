export const PERSON_ACCESS_SLUG = "person-access"

export const ACCESS_KINDS = ["page-type", "database-row", "domain", "route"] as const

export type AccessKind = (typeof ACCESS_KINDS)[number]

export const ROUTE_TARGETS = {
  DEVICE_SECRET_MINT: "device-secret-mint",
  READOUT_FEED: "readout-feed",
} as const
