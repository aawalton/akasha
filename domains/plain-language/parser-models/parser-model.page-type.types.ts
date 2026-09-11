import type { ModelManifest } from "akasha/domains/plain-language/parser-models/properties/model-manifest.file-property.ts"
import type { ParserWeights } from "akasha/domains/plain-language/parser-models/properties/parser-weights.file-property.ts"
import type { RelationWeights } from "akasha/domains/plain-language/parser-models/properties/relation-weights.file-property.ts"
import type { WordPieces } from "akasha/domains/plain-language/parser-models/properties/word-pieces.file-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type ParserModel = Page & {
  parserWeights?: ParserWeights
  relationWeights?: RelationWeights
  wordPieces?: WordPieces
  modelManifest?: ModelManifest
}
