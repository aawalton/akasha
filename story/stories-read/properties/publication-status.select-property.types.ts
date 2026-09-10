import type { publicationStatus } from "./publication-status.select-property.ts"

export type PublicationStatus = (typeof publicationStatus.values)[number]
