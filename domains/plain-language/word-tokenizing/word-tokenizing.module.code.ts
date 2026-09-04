export type WordToken = {
  form: string
  start: number
  end: number
}

export type SentenceSpan = {
  text: string
  start: number
  end: number
}

export type SentenceTokens = SentenceSpan & {
  words: WordToken[]
}

export type EncodedWords = {
  inputIds: number[]
  wordStarts: number[]
}

const TERMINAL = /[.!?]/u

const CLOSER = /["'”’»)\]}]/u

const SPACE = /\s/u

const MARKS = /\p{M}/gu

const RAW_WORD =
  /(?:https?:\/\/|www\.)[^\s]+|[\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*|\p{N}+(?:[.,:]\p{N}+)*|[^\s]/gu

const CONTRACTIONS = /^(.*?)(n't|'s|'re|'ve|'ll|'d|'m)$/iu

const PARAGRAPH_SEPARATOR = " "

const CANNOT = "cannot"

const CANNOT_STEM = 3

const CLS_ID = 101

const UNK_ID = 100

const SEP_ID = 102

const LONGEST_WORD = 100

const MAXIMUM_SUBWORDS = 256

const ROOM_FOR_MARKERS = 2

function trimmed(text: string, from: number, to: number): SentenceSpan | null {
  let left = from
  let right = to
  while (left < right && SPACE.test(text[left] ?? "")) left += 1
  while (right > left && SPACE.test(text[right - 1] ?? "")) right -= 1
  if (left >= right) return null
  return { text: text.slice(left, right), start: left, end: right }
}

export function splitSentences(text: string): SentenceSpan[] {
  const found: SentenceSpan[] = []
  let start = 0
  const push = (rawEnd: number): undefined => {
    const held = trimmed(text, start, rawEnd)
    if (held !== null) found.push(held)
    start = rawEnd
  }
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index] ?? ""
    if (character === PARAGRAPH_SEPARATOR) {
      push(index + 1)
      continue
    }
    if (character === "\n") {
      if (text[index + 1] === "\n") push(index + 1)
      continue
    }
    if (!TERMINAL.test(character)) continue
    let end = index + 1
    while (end < text.length && TERMINAL.test(text[end] ?? "")) end += 1
    while (end < text.length && CLOSER.test(text[end] ?? "")) end += 1
    if (end === text.length || SPACE.test(text[end] ?? "")) {
      push(end)
      index = end - 1
    }
  }
  push(text.length)
  return found
}

export function tokenizeWords(sentence: SentenceSpan): SentenceTokens {
  const words: WordToken[] = []
  for (const match of sentence.text.matchAll(RAW_WORD)) {
    const form = match[0]
    const at = sentence.start + (match.index ?? 0)
    if (form.toLowerCase() === CANNOT) {
      words.push({ form: form.slice(0, CANNOT_STEM), start: at, end: at + CANNOT_STEM })
      words.push({ form: form.slice(CANNOT_STEM), start: at + CANNOT_STEM, end: at + form.length })
      continue
    }
    const stem = form.replaceAll("’", "'").match(CONTRACTIONS)?.[1] ?? ""
    if (stem !== "") {
      words.push({ form: form.slice(0, stem.length), start: at, end: at + stem.length })
      words.push({ form: form.slice(stem.length), start: at + stem.length, end: at + form.length })
      continue
    }
    words.push({ form, start: at, end: at + form.length })
  }
  return { text: sentence.text, start: sentence.start, end: sentence.end, words }
}

function folded(value: string): string {
  return value.normalize("NFD").replace(MARKS, "").toLowerCase()
}

function vocabId(vocab: Readonly<Record<string, number>>, piece: string): number | undefined {
  return Object.hasOwn(vocab, piece) ? vocab[piece] : undefined
}

function piecesOf(said: string, vocab: Readonly<Record<string, number>>): number[] {
  const pieces: number[] = []
  let start = 0
  while (start < said.length) {
    let end = said.length
    let id: number | undefined
    while (end > start) {
      const piece = `${start === 0 ? "" : "##"}${said.slice(start, end)}`
      id = vocabId(vocab, piece)
      if (id !== undefined) break
      end -= 1
    }
    if (id === undefined) return [vocabId(vocab, "[UNK]") ?? UNK_ID]
    pieces.push(id)
    start = end
  }
  return pieces
}

export function encodeWordPieces(
  words: readonly WordToken[],
  vocab: Readonly<Record<string, number>>
): EncodedWords {
  const inputIds = [vocabId(vocab, "[CLS]") ?? CLS_ID]
  const wordStarts: number[] = []
  for (const word of words) {
    wordStarts.push(inputIds.length)
    const said = folded(word.form)
    if ([...said].length > LONGEST_WORD) {
      inputIds.push(vocabId(vocab, "[UNK]") ?? UNK_ID)
      continue
    }
    inputIds.push(...piecesOf(said, vocab))
  }
  inputIds.push(vocabId(vocab, "[SEP]") ?? SEP_ID)
  return { inputIds, wordStarts }
}

function chunkedWords(
  sentence: SentenceTokens,
  vocab: Readonly<Record<string, number>>,
  ceiling: number
): WordToken[][] {
  const chunks: WordToken[][] = []
  let words: WordToken[] = []
  let pieces = 0
  const push = (): undefined => {
    if (words.length > 0) chunks.push(words)
    words = []
    pieces = 0
  }
  for (const word of sentence.words) {
    const held = encodeWordPieces([word], vocab).inputIds.length - ROOM_FOR_MARKERS
    if (words.length > 0 && pieces + held > ceiling) push()
    words.push(word)
    pieces += held
  }
  push()
  return chunks
}

export function chunkForEncoder(
  sentence: SentenceTokens,
  vocab: Readonly<Record<string, number>>,
  maximumSubwords: number = MAXIMUM_SUBWORDS
): SentenceTokens[] {
  if (maximumSubwords < ROOM_FOR_MARKERS + 1) {
    throw new Error("a chunk leaves room for an opening marker, a token and a closing marker")
  }
  if (encodeWordPieces(sentence.words, vocab).inputIds.length <= maximumSubwords) return [sentence]
  const found: SentenceTokens[] = []
  for (const chunk of chunkedWords(sentence, vocab, maximumSubwords - ROOM_FOR_MARKERS)) {
    const first = chunk[0]
    const last = chunk[chunk.length - 1]
    if (first === undefined || last === undefined) continue
    found.push({
      text: sentence.text.slice(first.start - sentence.start, last.end - sentence.start),
      start: first.start,
      end: last.end,
      words: chunk,
    })
  }
  return found
}
