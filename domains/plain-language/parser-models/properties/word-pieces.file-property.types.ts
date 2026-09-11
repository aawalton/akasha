import type { wordPieces } from "akasha/domains/plain-language/parser-models/properties/word-pieces.file-property.ts"

export type WordPieces = (typeof wordPieces.extensions)[number]
