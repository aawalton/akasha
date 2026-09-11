import type { relationWeights } from "akasha/domains/plain-language/parser-models/properties/relation-weights.file-property.ts"

export type RelationWeights = (typeof relationWeights.extensions)[number]
