import { readFile } from "node:fs/promises"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { uncommittedBesideAt } from "@akasha/pages-system/page-file-name"
import * as ort from "onnxruntime-node"
import {
  decodeTree,
  type ParsedSentence,
} from "../dependency-graph/dependency-graph.module.code.ts"
import { makeParseCache } from "../parse-cache/parse-cache.module.code.ts"
import {
  chunkForEncoder,
  encodeWordPieces,
  type SentenceTokens,
  splitSentences,
  tokenizeWords,
} from "../word-tokenizing/word-tokenizing.module.code.ts"

export type ParserDescriptor = {
  id: string
  version: string
  languages: readonly string[]
  capabilities: readonly string[]
  modelHash?: string
}

export type DependencyParser = {
  descriptor: ParserDescriptor
  parse: (text: string) => Promise<ParsedSentence[]>
}

export type OnnxParserOptions = {
  intraOpNumThreads?: number
  maxBatchSentences?: number
}

export type ModelFiles = {
  parserWeights: string
  relationWeights: string
  wordPieces: string
  modelManifest: string
}

type Manifest = {
  format?: string
  "source_checkpoint_sha256"?: string
  upos: string[]
  relations: string[]
}

type Vocabulary = {
  model: {
    vocab: Record<string, number>
  }
}

type Loaded = {
  parser: ort.InferenceSession
  relations: ort.InferenceSession
  manifest: Manifest
  vocab: Record<string, number>
  maxBatchSentences: number
}

const MODEL_PAGE = new URL("../parser-models/pages/compact-parser.parser-model.ts", import.meta.url)

const DEFAULT_MAX_BATCH_SENTENCES = 16

const OTHER_CLASS = "X"

const UNSPECIFIED_RELATION = "dep"

const PARSER_ID = "akasha/compact-onnx-parser"

const UNKNOWN_VERSION = "unknown"

const CAPABILITIES = ["sentence-boundaries", "tokens", "part-of-speech", "dependencies"]

const LANGUAGES = ["en"]

function modelFileAt(propertySlug: string, held: string): string {
  const at = uncommittedBesideAt(fileURLToPath(MODEL_PAGE), propertySlug, held)
  if (at === null) throw new Error(`no \`${propertySlug}\` sits beside the parser model page`)
  return at
}

export function bundledModel(): ModelFiles {
  return {
    parserWeights: modelFileAt("parser-weights", "onnx"),
    relationWeights: modelFileAt("relation-weights", "onnx"),
    wordPieces: modelFileAt("word-pieces", "json"),
    modelManifest: modelFileAt("model-manifest", "json"),
  }
}

function int64(values: readonly number[], dimensions: readonly number[]): ort.Tensor {
  return new ort.Tensor("int64", BigInt64Array.from(values, BigInt), dimensions)
}

function index3(row: number, item: number, width: number, items: number): number {
  return (row * items + item) * width
}

function bestOf(values: Float32Array, start: number, count: number): number {
  let best = 0
  for (let index = 1; index < count; index += 1) {
    const held = values[start + index] ?? Number.NEGATIVE_INFINITY
    if (held > (values[start + best] ?? Number.NEGATIVE_INFINITY)) best = index
  }
  return best
}

function floatsOf(held: ort.InferenceSession.ReturnType, name: string): Float32Array {
  const data = held[name]?.data
  if (!(data instanceof Float32Array)) throw new Error(`the model gave no \`${name}\` scores`)
  return data
}

function tensorOf(held: ort.InferenceSession.ReturnType, name: string): ort.Tensor {
  const value = held[name]
  if (!(value instanceof ort.Tensor)) throw new Error(`the model gave no \`${name}\` tensor`)
  return value
}

function tensorsIn(held: ort.InferenceSession.ReturnType | undefined): ort.Tensor[] {
  const found: ort.Tensor[] = []
  for (const value of Object.values(held ?? {})) {
    if (value instanceof ort.Tensor) found.push(value)
  }
  return found
}

function headsFor(
  arc: Float32Array,
  row: number,
  count: number,
  maxWords: number
): readonly number[] {
  const headWidth = maxWords + 1
  const scores: number[][] = []
  for (let dependent = 0; dependent < count; dependent += 1) {
    const at = index3(row, dependent, headWidth, maxWords)
    const line: number[] = []
    for (let head = 0; head <= count; head += 1) line.push(arc[at + head] ?? 0)
    scores.push(line)
  }
  return decodeTree(scores)
}

function builtSentence(
  manifest: Manifest,
  sentence: SentenceTokens,
  row: number,
  maxWords: number,
  heads: readonly number[],
  upos: Float32Array,
  relationScores: Float32Array
): ParsedSentence {
  const uposWidth = manifest.upos.length
  const relationWidth = manifest.relations.length
  return {
    text: sentence.text,
    start: sentence.start,
    end: sentence.end,
    tokens: sentence.words.map((word, index) => ({
      id: index + 1,
      form: word.form,
      lemma: word.form.toLowerCase(),
      upos:
        manifest.upos[bestOf(upos, index3(row, index, uposWidth, maxWords), uposWidth)] ??
        OTHER_CLASS,
      head: heads[row * maxWords + index] ?? 0,
      deprel:
        manifest.relations[
          bestOf(relationScores, index3(row, index, relationWidth, maxWords), relationWidth)
        ] ?? UNSPECIFIED_RELATION,
      start: word.start,
      end: word.end,
    })),
  }
}

function feedsFor(
  held: Loaded,
  sentences: readonly SentenceTokens[]
): { feeds: Record<string, ort.Tensor>; maxWords: number } {
  const encoded = sentences.map((sentence) => encodeWordPieces(sentence.words, held.vocab))
  const batch = sentences.length
  const maxSubwords = Math.max(...encoded.map((item) => item.inputIds.length))
  const maxWords = Math.max(...encoded.map((item) => item.wordStarts.length))
  const inputIds = new Array<number>(batch * maxSubwords).fill(0)
  const attentionMask = new Array<number>(batch * maxSubwords).fill(0)
  const wordStarts = new Array<number>(batch * maxWords).fill(0)
  const wordMask = new Uint8Array(batch * maxWords)
  for (let row = 0; row < batch; row += 1) {
    const item = encoded[row]
    if (item === undefined) continue
    item.inputIds.forEach((id, column) => {
      inputIds[row * maxSubwords + column] = id
      attentionMask[row * maxSubwords + column] = 1
    })
    item.wordStarts.forEach((start, column) => {
      wordStarts[row * maxWords + column] = start
      wordMask[row * maxWords + column] = 1
    })
  }
  return {
    feeds: {
      "input_ids": int64(inputIds, [batch, maxSubwords]),
      "attention_mask": int64(attentionMask, [batch, maxSubwords]),
      "word_starts": int64(wordStarts, [batch, maxWords]),
      "word_mask": new ort.Tensor("bool", wordMask, [batch, maxWords]),
    },
    maxWords,
  }
}

async function parsedBatch(
  held: Loaded,
  sentences: readonly SentenceTokens[]
): Promise<ParsedSentence[]> {
  const batch = sentences.length
  const { feeds, maxWords } = feedsFor(held, sentences)
  let output: ort.InferenceSession.ReturnType | undefined
  let relationOutput: ort.InferenceSession.ReturnType | undefined
  let selectedHeadsTensor: ort.Tensor | undefined
  try {
    output = await held.parser.run(feeds)
    const arc = floatsOf(output, "arc_logits")
    const selectedHeads = new Array<number>(batch * maxWords).fill(0)
    for (let row = 0; row < batch; row += 1) {
      const count = sentences[row]?.words.length ?? 0
      headsFor(arc, row, count, maxWords).forEach((head, dependent) => {
        selectedHeads[row * maxWords + dependent] = head
      })
    }
    selectedHeadsTensor = int64(selectedHeads, [batch, maxWords])
    relationOutput = await held.relations.run({
      "relation_dependent": tensorOf(output, "relation_dependent"),
      "relation_heads": tensorOf(output, "relation_heads"),
      "selected_heads": selectedHeadsTensor,
    })
    const upos = floatsOf(output, "upos_logits")
    const relationScores = floatsOf(relationOutput, "relation_logits")
    return sentences.map((sentence, row) =>
      builtSentence(held.manifest, sentence, row, maxWords, selectedHeads, upos, relationScores)
    )
  } finally {
    const held = new Set<ort.Tensor>(Object.values(feeds))
    for (const tensor of tensorsIn(output)) held.add(tensor)
    for (const tensor of tensorsIn(relationOutput)) held.add(tensor)
    if (selectedHeadsTensor !== undefined) held.add(selectedHeadsTensor)
    for (const tensor of held) tensor.dispose()
  }
}

async function parsedText(held: Loaded, text: string): Promise<ParsedSentence[]> {
  const sentences = splitSentences(text)
    .map(tokenizeWords)
    .filter((sentence) => sentence.words.length > 0)
    .flatMap((sentence) => chunkForEncoder(sentence, held.vocab))
  if (sentences.length === 0) return []
  const found: ParsedSentence[] = []
  for (let start = 0; start < sentences.length; start += held.maxBatchSentences) {
    const batch = sentences.slice(start, start + held.maxBatchSentences)
    found.push(...(await parsedBatch(held, batch)))
  }
  return found
}

export async function loadOnnxParser(options: OnnxParserOptions = {}): Promise<DependencyParser> {
  const maxBatchSentences = options.maxBatchSentences ?? DEFAULT_MAX_BATCH_SENTENCES
  if (!Number.isInteger(maxBatchSentences) || maxBatchSentences < 1) {
    throw new Error("a batch holds a whole number of sentences, one or more")
  }
  const files = bundledModel()
  const [manifestText, vocabularyText] = await Promise.all([
    readFile(files.modelManifest, "utf8"),
    readFile(files.wordPieces, "utf8"),
  ])
  const manifest = JSON.parse(manifestText) as Manifest
  const vocab = (JSON.parse(vocabularyText) as Vocabulary).model.vocab
  const sessionOptions: ort.InferenceSession.SessionOptions = {
    executionProviders: ["cpu"],
    graphOptimizationLevel: "all",
  }
  if (options.intraOpNumThreads !== undefined) {
    sessionOptions.intraOpNumThreads = options.intraOpNumThreads
  }
  const [parser, relations] = await Promise.all([
    ort.InferenceSession.create(files.parserWeights, sessionOptions),
    ort.InferenceSession.create(files.relationWeights, sessionOptions),
  ])
  const held: Loaded = { parser, relations, manifest, vocab, maxBatchSentences }
  const descriptor: ParserDescriptor = {
    id: PARSER_ID,
    version: manifest.format ?? UNKNOWN_VERSION,
    languages: LANGUAGES,
    capabilities: CAPABILITIES,
    modelHash: manifest["source_checkpoint_sha256"],
  }
  const cache = makeParseCache(descriptor.modelHash, dirname(fileURLToPath(import.meta.url)))
  return {
    descriptor,
    parse: async (text: string) => {
      const already = cache.read(text)
      if (already !== null) return already
      const found = await parsedText(held, text)
      cache.write(text, found)
      return found
    },
  }
}

let cached: Promise<DependencyParser> | undefined

export function loadParser(options: OnnxParserOptions = {}): Promise<DependencyParser> {
  cached ??= loadOnnxParser(options)
  return cached
}
