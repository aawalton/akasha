export const MAX_SPEECH_CHARS = 800

export const MAX_SPEECH_SEGMENTS = 500

export const CONTINUOUS_CHUNK_CHARS = 1500

function flatten(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " (code omitted) ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
}

export function splitSentences(text: string): readonly string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

function hardWrap(sentence: string, budget: number = MAX_SPEECH_CHARS): readonly string[] {
  const out: string[] = []
  let current = ""
  for (const word of sentence.split(" ")) {
    if (word.length > budget) {
      if (current.length > 0) {
        out.push(current)
        current = ""
      }
      for (let i = 0; i < word.length; i += budget) {
        out.push(word.slice(i, i + budget))
      }
      continue
    }
    const candidate = current.length === 0 ? word : `${current} ${word}`
    if (candidate.length > budget) {
      out.push(current)
      current = word
    } else {
      current = candidate
    }
  }
  if (current.length > 0) out.push(current)
  return out
}

export function packSegments(
  sentences: readonly string[],
  budget: number = MAX_SPEECH_CHARS
): readonly string[] {
  const segments: string[] = []
  let current = ""
  for (const sentence of sentences) {
    if (sentence.length > budget) {
      if (current.length > 0) {
        segments.push(current)
        current = ""
      }
      segments.push(...hardWrap(sentence, budget))
      continue
    }
    const candidate = current.length === 0 ? sentence : `${current} ${sentence}`
    if (candidate.length > budget) {
      segments.push(current)
      current = sentence
    } else {
      current = candidate
    }
  }
  if (current.length > 0) segments.push(current)
  return segments
}

export function formatForSpeech(
  content: string,
  opts?: { readonly fromSentenceIndex?: number }
): readonly string[] {
  const flattened = flatten(content)
  if (flattened.length === 0) return []
  const sentences = splitSentences(flattened)
  const from = Math.max(0, Math.trunc(opts?.fromSentenceIndex ?? 0))
  const sliced = from > 0 ? sentences.slice(from) : sentences
  const segments = packSegments(sliced)
  return segments.slice(0, MAX_SPEECH_SEGMENTS)
}

export type SegmentPlan = {
  readonly id: string
  readonly text: string
  readonly label: string
}

export function planSpeechSegments(
  messageId: string,
  segments: readonly string[]
): readonly SegmentPlan[] {
  const total = segments.length
  const plans: SegmentPlan[] = []
  for (let i = 0; i < total; i++) {
    const text = segments[i] ?? ""
    if (text.length === 0) continue
    const id = total === 1 ? messageId : `${messageId}-seg${i}`
    const label =
      total === 1 ? `message ${messageId}` : `message ${messageId} segment ${i + 1}/${total}`
    plans.push({ id, text, label })
  }
  return plans
}

const PARAGRAPH_MARKER_RE = /^\s*\[[a-z][a-z0-9-]*\]\s*/

export function buildKokoroSpeechSegments(
  rawText: string,
  opts?: { readonly fromSentenceIndex?: number }
): readonly string[] {
  const stripped = rawText
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(PARAGRAPH_MARKER_RE, ""))
    .join("\n\n")
  return formatForSpeech(stripped, opts)
}

export function buildKokoroSpeechInput(rawText: string): string {
  return buildKokoroSpeechSegments(rawText).join(" ")
}

export type ContinuousChunk = {
  readonly text: string
  readonly startsParagraph: boolean
}

export function chunkForContinuousRenderWithFlags(
  content: string,
  opts?: { readonly maxChars?: number }
): readonly ContinuousChunk[] {
  const budget = opts?.maxChars ?? CONTINUOUS_CHUNK_CHARS
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((paragraph) => flatten(paragraph))
    .filter((paragraph) => paragraph.length > 0)
  const chunks: ContinuousChunk[] = []
  let current = ""
  for (const paragraph of paragraphs) {
    if (paragraph.length > budget) {
      if (current.length > 0) {
        chunks.push({ text: current, startsParagraph: true })
        current = ""
      }
      const packed = packSegments(splitSentences(paragraph), budget)
      for (let i = 0; i < packed.length; i++) {
        chunks.push({ text: packed[i] ?? "", startsParagraph: i === 0 })
      }
      continue
    }
    const candidate = current.length === 0 ? paragraph : `${current} ${paragraph}`
    if (candidate.length > budget) {
      chunks.push({ text: current, startsParagraph: true })
      current = paragraph
    } else {
      current = candidate
    }
  }
  if (current.length > 0) chunks.push({ text: current, startsParagraph: true })
  return chunks.slice(0, MAX_SPEECH_SEGMENTS)
}

export function chunkForContinuousRender(
  content: string,
  opts?: { readonly maxChars?: number }
): readonly string[] {
  return chunkForContinuousRenderWithFlags(content, opts).map((chunk) => chunk.text)
}
