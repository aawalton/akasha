import { proseWindowSegmentsIn } from "akasha/story/engine/core/modules/prose-windows/prose-windows.module.code.ts"

const PARAGRAPH_BREAK = /\n\n+/

const PROSE = "prose"

export function proseBlocksOf(text: string): readonly string[] {
  return text
    .split(PARAGRAPH_BREAK)
    .map((one) => one.trim())
    .filter((one) => one !== "")
}

export function drawnParagraphsIn(text: string): number {
  let counted = 0
  for (const one of proseWindowSegmentsIn(text)) {
    if (one.kind === PROSE) counted += proseBlocksOf(one.text).length
  }
  return counted
}
