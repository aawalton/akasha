import { __TS__MathModf } from "./MathModf"

const radixChars = "0123456789abcdefghijklmnopqrstuvwxyz"

export function __TS__NumberToString(this: number, radix?: number): string {
  if (
    radix === undefined ||
    radix === 10 ||
    this === Infinity ||
    this === -Infinity ||
    this !== this
  ) {
    return this.toString()
  }

  radix = Math.floor(radix)
  if (radix < 2 || radix > 36) {
    throw "toString() radix argument must be between 2 and 36"
  }

  let [integer, fraction] = __TS__MathModf(Math.abs(this))

  let result = ""
  if (radix === 8) {
    result = string.format("%o", integer)
  } else if (radix === 16) {
    result = string.format("%x", integer)
  } else {
    do {
      result = radixChars[integer % radix] + result
      integer = Math.floor(integer / radix)
    } while (integer !== 0)
  }

  if (fraction !== 0) {
    result += "."
    let delta = 1e-16
    do {
      fraction *= radix
      delta *= radix
      const digit = Math.floor(fraction)
      result += radixChars[digit]
      fraction -= digit
    } while (fraction >= delta)
  }

  if (this < 0) {
    result = "-" + result
  }

  return result
}
