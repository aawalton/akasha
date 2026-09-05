const SPELT = /`[^`]*`/g

export function scanned(text: string): string {
  return text.replace(SPELT, (held) => `\`${"x".repeat(held.length - 2)}\``)
}
