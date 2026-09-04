import { wordCount } from "../word-count/word-count.module.code.ts"

const SPEAKER_MARKER = /^\s*\[[a-z][a-z0-9-]*\]\s*/

function withoutSpeakerMarker(paragraph: string): string {
  return paragraph.replace(SPEAKER_MARKER, "")
}

export function chapterWords(text: string): number {
  return wordCount(
    text
      .split(/\n\s*\n/)
      .map(withoutSpeakerMarker)
      .join("\n")
  )
}
