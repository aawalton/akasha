import type { publicationStatus } from "akasha/story/stories-read/properties/publication-status.select-property.ts"

export type PublicationStatus = (typeof publicationStatus.values)[number]
