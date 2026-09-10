import type { Page } from "../../../pages/page.page-type.types.ts"
import type { ModelManifest } from "./properties/model-manifest.file-property.ts"
import type { ParserWeights } from "./properties/parser-weights.file-property.ts"
import type { RelationWeights } from "./properties/relation-weights.file-property.ts"
import type { WordPieces } from "./properties/word-pieces.file-property.ts"

export type ParserModel = Page & {
  parserWeights?: ParserWeights
  relationWeights?: RelationWeights
  wordPieces?: WordPieces
  modelManifest?: ModelManifest
}
