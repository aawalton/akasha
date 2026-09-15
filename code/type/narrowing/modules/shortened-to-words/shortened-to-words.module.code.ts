export function shortenedToWords(whole: string, ceiling: number): string {
  if (whole.length <= ceiling) return whole
  const words = whole.split("-")
  let out = words[0] ?? ""
  for (const word of words.slice(1)) {
    if (out.length + 1 + word.length > ceiling) break
    out = `${out}-${word}`
  }
  return out.length <= ceiling ? out : out.slice(0, ceiling).replace(/-+$/, "")
}
