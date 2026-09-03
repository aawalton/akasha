const ANY = "*"

export function fileNameOf(pathish: string): string {
  const cut = pathish.lastIndexOf("/")
  return cut === -1 ? pathish : pathish.slice(cut + 1)
}

function tailOf(pattern: string): string | null {
  return pattern.startsWith(ANY) ? pattern.slice(ANY.length) : null
}

export function patternMatches(pattern: string, fileName: string): boolean {
  const tail = tailOf(pattern)
  if (tail === null) return pattern === fileName
  return fileName.length > tail.length && fileName.endsWith(tail)
}

function literalLengthOf(pattern: string): number {
  const tail = tailOf(pattern)
  return tail === null ? pattern.length + 1 : tail.length
}

export function claimedAt<T>(fileName: string, claims: Iterable<readonly [string, T]>): T | null {
  let held: T | null = null
  let longest = -1
  for (const [pattern, claimed] of claims) {
    if (!patternMatches(pattern, fileName)) continue
    const length = literalLengthOf(pattern)
    if (length <= longest) continue
    longest = length
    held = claimed
  }
  return held
}
