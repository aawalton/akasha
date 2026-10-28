import type { diagnosedBy } from "akasha/person/properties/diagnosed-by.select-property.ts"

export type DiagnosedBy = (typeof diagnosedBy.values)[number]
