import type { ModelManifest } from "akasha/domain/plain-language/parser-model/properties/model-manifest.file-property.types.ts"
import type { ParserWeights } from "akasha/domain/plain-language/parser-model/properties/parser-weights.file-property.types.ts"
import type { RelationWeights } from "akasha/domain/plain-language/parser-model/properties/relation-weights.file-property.types.ts"
import type { WordPieces } from "akasha/domain/plain-language/parser-model/properties/word-pieces.file-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type ParserModel = Page & {
  parserWeights?: ParserWeights
  relationWeights?: RelationWeights
  wordPieces?: WordPieces
  modelManifest?: ModelManifest
}
