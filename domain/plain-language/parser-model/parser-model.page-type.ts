import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const parserModel = {
  id: "01a06d3b-743e-7d49-b8e6-3703a4b4fbfb",
  type: "page-type/page-type",
  slug: "parser-model",
  definition: "a trained parser the code loads to read a sentence",
  extends: ["page-type/page"],
  parts: [
    "file-property/model-manifest",
    "file-property/parser-weights",
    "file-property/relation-weights",
    "file-property/word-pieces",
  ],
  properties: [
    {
      pageProperty: "file-property/parser-weights",
      required: false,
      many: false,
      uncommitted: true,
      default: "onnx",
    },
    {
      pageProperty: "file-property/relation-weights",
      required: false,
      many: false,
      uncommitted: true,
      default: "onnx",
    },
    {
      pageProperty: "file-property/word-pieces",
      required: false,
      many: false,
      uncommitted: true,
      default: "json",
    },
    {
      pageProperty: "file-property/model-manifest",
      required: false,
      many: false,
      uncommitted: true,
      default: "json",
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page is committed and the model files beside that page are not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A model file is put in place before the parser is loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's type puts the model files beside the page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page states a model file.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The model files are an export of a parser trained outside akasha.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing in akasha trains a parser or writes the model files beside its page.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A checkout that is not this workstation's reaches the model files.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
