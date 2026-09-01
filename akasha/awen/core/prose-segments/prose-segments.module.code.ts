const BLOCK_SPLIT = /\n\n+/

const SYSTEM_MARKER = /^\{\{\s*system\s*\}\}$/

function looksLikeMarkerAttempt(block: string): boolean {
  return block.includes("{{") || block.includes("}}")
}

export type RawProseSegment =
  | { readonly kind: "prose"; readonly text: string }
  | { readonly kind: "marker" }

export class MalformedProseMarkerError extends Error {
  constructor(block: string) {
    const preview = block.length > 60 ? `${block.slice(0, 60)}…` : block
    super(
      `malformed system marker: a marker must be exactly "{{system}}" alone on its own line ` +
        `(a blank line above and below). Offending block: ${JSON.stringify(preview)}`
    )
    this.name = "MalformedProseMarkerError"
  }
}

function classifyBlock(block: string): "marker" | "prose" {
  if (SYSTEM_MARKER.test(block)) return "marker"
  if (looksLikeMarkerAttempt(block)) throw new MalformedProseMarkerError(block)
  return "prose"
}

export function parseProseIntoRawSegments(text: string): readonly RawProseSegment[] {
  const blocks = text
    .split(BLOCK_SPLIT)
    .map((b) => b.trim())
    .filter((b) => b !== "")
  const segments: RawProseSegment[] = []
  let proseRun: string[] = []
  const flush = (): undefined => {
    if (proseRun.length > 0) {
      segments.push({ kind: "prose", text: proseRun.join("\n\n") })
      proseRun = []
    }
  }
  for (const block of blocks) {
    if (classifyBlock(block) === "marker") {
      flush()
      segments.push({ kind: "marker" })
    } else {
      proseRun.push(block)
    }
  }
  flush()
  return segments
}

export function countProseMarkers(text: string): number {
  return parseProseIntoRawSegments(text).filter((s) => s.kind === "marker").length
}

export function assertProseMarkersWellFormed(text: string): undefined {
  parseProseIntoRawSegments(text)
}
