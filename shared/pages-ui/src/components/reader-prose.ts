export type ProseBlock =
  | { readonly kind: "paragraph"; readonly text: string }
  | { readonly kind: "scene-break" }
  | { readonly kind: "fence"; readonly text: string }

const FENCE_RE = /^\s*```/

export function isSceneBreak(line: string): boolean {
  const compact = line.replace(/[ \t]/g, "")
  if (compact.length < 3) return false
  const marker = compact[0]
  if (marker !== "*" && marker !== "-" && marker !== "_") return false
  for (const ch of compact) {
    if (ch !== marker) return false
  }
  return true
}

export function parseProseBlocks(body: string): readonly ProseBlock[] {
  const lines = body.split("\n")
  const blocks: ProseBlock[] = []
  let inFence = false
  let fenceLines: string[] = []

  for (const line of lines) {
    if (inFence) {
      if (FENCE_RE.test(line)) {
        blocks.push({ kind: "fence", text: fenceLines.join("\n") })
        fenceLines = []
        inFence = false
      } else {
        fenceLines.push(line)
      }
      continue
    }
    if (FENCE_RE.test(line)) {
      inFence = true
      fenceLines = []
      continue
    }
    if (line.trim() === "") continue
    if (isSceneBreak(line)) {
      blocks.push({ kind: "scene-break" })
      continue
    }
    blocks.push({ kind: "paragraph", text: line })
  }
  if (inFence) blocks.push({ kind: "fence", text: fenceLines.join("\n") })
  return blocks
}

export type InlineSegment =
  | { readonly kind: "text"; readonly text: string }
  | { readonly kind: "em"; readonly text: string }

export function splitInlineEmphasis(text: string): readonly InlineSegment[] {
  const segments: InlineSegment[] = []
  let last = 0
  for (const match of text.matchAll(/\*([^*\n]+)\*/g)) {
    const index = match.index ?? 0
    if (index > last) segments.push({ kind: "text", text: text.slice(last, index) })
    segments.push({ kind: "em", text: match[1] ?? "" })
    last = index + match[0].length
  }
  if (last < text.length) segments.push({ kind: "text", text: text.slice(last) })
  return segments
}

const CHARS_PER_LINE = 68
const PROSE_LINE_HEIGHT_PX = 31
const FENCE_LINE_HEIGHT_PX = 21
const FENCE_PADDING_PX = 24
const SCENE_BREAK_HEIGHT_PX = 20

export function estimateProseBlockHeight(block: ProseBlock): number {
  if (block.kind === "scene-break") return SCENE_BREAK_HEIGHT_PX
  if (block.kind === "fence") {
    const lineCount = block.text.split("\n").length
    return lineCount * FENCE_LINE_HEIGHT_PX + FENCE_PADDING_PX
  }
  const wrapped = Math.max(1, Math.ceil(block.text.length / CHARS_PER_LINE))
  return wrapped * PROSE_LINE_HEIGHT_PX
}

export function proseBlockSource(block: ProseBlock): string {
  if (block.kind === "scene-break") return "***"
  return block.text
}
