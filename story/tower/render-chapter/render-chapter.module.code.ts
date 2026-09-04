import { chapterWords } from "@akasha/story-engine-core/chapter-words"
import type { Beat, ChapterEntry } from "@akasha/story-tower-core/tower-state"
import { assertNever } from "@akasha/utils-narrow/assert-never"

export type RenderedChapter = {
  text: string
  wordCount: number
}

export function countWords(text: string): number {
  return chapterWords(text)
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
