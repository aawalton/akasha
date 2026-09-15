import type { publicationStatus } from "akasha/story/read/properties/publication-status.select-property.ts"

export type PublicationStatus = (typeof publicationStatus.values)[number]
