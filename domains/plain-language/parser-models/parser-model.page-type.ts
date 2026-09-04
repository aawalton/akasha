import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
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

export const parserModel = {
  id: "01a06d3b-743e-7d49-b8e6-3703a4b4fbfb",
  pageTypeSlug: "page-type",
  slug: "parser-model",
  definition: "a trained parser the code loads to read a sentence",
  pluralSlug: "parser-models",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "file-property/model-manifest",
    "file-property/parser-weights",
    "file-property/relation-weights",
    "file-property/word-pieces",
  ],
  properties: [
    {
      pagePropertySlug: "parser-weights",
      required: false,
      many: false,
      uncommitted: true,
      default: "onnx",
    },
    {
      pagePropertySlug: "relation-weights",
      required: false,
      many: false,
      uncommitted: true,
      default: "onnx",
    },
    {
      pagePropertySlug: "word-pieces",
      required: false,
      many: false,
      uncommitted: true,
      default: "json",
    },
    {
      pagePropertySlug: "model-manifest",
      required: false,
      many: false,
      uncommitted: true,
      default: "json",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page is committed and the model files beside it are not.",
    },
    {
      invariantKind: "departure",
      statement: "A model file is put in place before the parser is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A page's type is what puts the model files beside the page.",
    },
    {
      invariantKind: "absence",
      statement: "No page states a model file.",
    },
  ],
} as const satisfies PageType
