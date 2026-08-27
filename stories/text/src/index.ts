export const SPEAKER_MARKER_RE = /^(\s*\[([a-z][a-z0-9-]*)\]\s*)/

export function stripLeadingSpeakerMarker(paragraph: string): string {
  return paragraph.replace(SPEAKER_MARKER_RE, "")
}

export function countChapterWords(text: string): number {
  return text
    .split(/\n\s*\n/)
    .map(stripLeadingSpeakerMarker)
    .join("\n")
    .split(/\s+/)
    .filter((token) => token.length > 0).length
}
