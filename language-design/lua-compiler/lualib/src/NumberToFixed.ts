export function __TS__NumberToFixed(this: number, fractionDigits?: number): string {
  if (Math.abs(this) >= 1e21 || this !== this) {
    return this.toString()
  }
  const f = Math.floor(fractionDigits ?? 0)
  if (f < 0 || f > 99) {
    throw "toFixed() digits argument must be between 0 and 99"
  }
  return string.format(`%.${f}f`, this)
}
