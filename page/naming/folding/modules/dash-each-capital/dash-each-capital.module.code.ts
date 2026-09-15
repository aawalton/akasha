export function dashEachCapital(text: string): string {
  return text.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)
}
