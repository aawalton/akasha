import type { parserWeights } from "akasha/domains/plain-language/parser-models/properties/parser-weights.file-property.ts"

export type ParserWeights = (typeof parserWeights.extensions)[number]
