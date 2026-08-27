export function wordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length
}
