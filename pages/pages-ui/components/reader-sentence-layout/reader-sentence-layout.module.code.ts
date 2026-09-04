import { parseProseBlocks, splitInlineEmphasis } from "@akasha/pages-ui-components/reader-prose"
import { buildKokoroSpeechInput, splitSentences } from "@akasha/voice-core/voice/speech"

export interface SentenceRun {
  readonly kind: "text" | "em"
  readonly text: string
  readonly sentenceIndex: number
}

export interface BlockSentenceLayout {
  readonly runs: readonly SentenceRun[]
}

export interface SentenceLayout {
  readonly blocks: readonly BlockSentenceLayout[]
  readonly sentenceCount: number
  readonly firstBlockForSentence: readonly number[]
}

function isAlnum(ch: string): boolean {
  return (ch >= "0" && ch <= "9") || (ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")
}

const CODE_OMITTED_ALNUM = "codeomitted".length

interface Cursor {
  readonly canonChars: readonly string[]
  readonly canonIdx: readonly number[]
  ptr: number
  lastIdx: number
}

function layoutParagraph(text: string, cursor: Cursor): readonly SentenceRun[] {
  const runs: SentenceRun[] = []
  for (const segment of splitInlineEmphasis(text)) {
    let buf = ""
    let bufIdx = cursor.lastIdx
    for (const ch of segment.text) {
      let idx = cursor.lastIdx
      if (isAlnum(ch)) {
        const canonCh = cursor.canonChars[cursor.ptr]
        if (canonCh !== undefined && canonCh.toLowerCase() === ch.toLowerCase()) {
          idx = cursor.canonIdx[cursor.ptr] ?? cursor.lastIdx
          cursor.ptr += 1
          cursor.lastIdx = idx
        }
      }
      if (buf.length > 0 && idx !== bufIdx) {
        runs.push({ kind: segment.kind, text: buf, sentenceIndex: bufIdx })
        buf = ""
      }
      bufIdx = idx
      buf += ch
    }
    if (buf.length > 0) runs.push({ kind: segment.kind, text: buf, sentenceIndex: bufIdx })
  }
  return runs
}

export function layoutSentenceSpans(body: string): SentenceLayout {
  const blocks = parseProseBlocks(body)
  const canonical = splitSentences(buildKokoroSpeechInput(body))
  const sentenceCount = canonical.length

  const noRuns: readonly SentenceRun[] = []

  if (sentenceCount === 0) {
    return {
      blocks: blocks.map(() => ({ runs: noRuns })),
      sentenceCount: 0,
      firstBlockForSentence: [],
    }
  }

  const canonChars: string[] = []
  const canonIdx: number[] = []
  for (let s = 0; s < canonical.length; s++) {
    for (const ch of canonical[s] ?? "") {
      if (isAlnum(ch)) {
        canonChars.push(ch)
        canonIdx.push(s)
      }
    }
  }

  const cursor: Cursor = { canonChars, canonIdx, ptr: 0, lastIdx: 0 }
  const firstBlock: number[] = new Array(sentenceCount).fill(-1)
  const out: BlockSentenceLayout[] = []

  for (let b = 0; b < blocks.length; b++) {
    const block = blocks[b]
    if (block === undefined) continue
    if (block.kind === "paragraph") {
      const runs = layoutParagraph(block.text, cursor)
      for (const run of runs) {
        if (run.sentenceIndex >= 0 && firstBlock[run.sentenceIndex] === -1) {
          firstBlock[run.sentenceIndex] = b
        }
      }
      out.push({ runs })
    } else if (block.kind === "fence") {
      cursor.ptr = Math.min(cursor.ptr + CODE_OMITTED_ALNUM, canonChars.length)
      if (cursor.ptr > 0) cursor.lastIdx = canonIdx[cursor.ptr - 1] ?? cursor.lastIdx
      out.push({ runs: noRuns })
    } else {
      out.push({ runs: noRuns })
    }
  }

  return { blocks: out, sentenceCount, firstBlockForSentence: firstBlock }
}
