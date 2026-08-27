import type { Beat, ChapterEntry } from "@alanwalton/tower-core/state-schema"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { countChapterWords } from "@stories/text"

export type RenderedChapter = {
  text: string
  wordCount: number
}

export function countWords(text: string): number {
  return countChapterWords(text)
}

function renderNarrative(beat: Beat): string {
  return (beat.text ?? "").trim()
}

function renderSystem(beat: Beat): string {
  const title = (beat.title ?? "").trim()
  const lines = beat.lines ?? []
  const body = lines.join("\n")
  const heading = title.length > 0 ? `**${title}**` : "**System**"
  return `${heading}\n\n\`\`\`\n${body}\n\`\`\``
}

function renderBeat(beat: Beat): string {
  switch (beat.type) {
    case "narrative":
      return renderNarrative(beat)
    case "system":
      return renderSystem(beat)
    default:
      return assertNever(beat.type)
  }
}

export function renderChapter(chapter: ChapterEntry, beats: readonly Beat[]): RenderedChapter {
  const heading = `# ${chapter.title}`
  const rendered = beats.map(renderBeat).filter((block) => block.length > 0)
  const text = [heading, ...rendered].join("\n\n").concat("\n")
  return { text, wordCount: countWords(text) }
}
