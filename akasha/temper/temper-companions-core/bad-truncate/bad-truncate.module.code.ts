export function badTruncate(value: number, sigFigs: number = 4): number {
  if (value === 0 || sigFigs <= 0) return 0
  const sign = value < 0 ? -1 : 1
  const intPart = Math.trunc(value)
  const fracPart = (value - intPart) * sign
  const fracStr = fracPart.toFixed(20)

  const absInt = Math.abs(intPart)
  const intStr = absInt.toString()
  const dotIndex = fracStr.indexOf(".")
  const fracDigits = dotIndex === -1 ? "" : fracStr.slice(dotIndex + 1)
  const allDigits = intStr + fracDigits

  let firstSig = -1
  for (let i = 0; i < allDigits.length; i++) {
    if (allDigits[i] !== "0") {
      firstSig = i
      break
    }
  }
  if (firstSig === -1) return 0

  const kept = allDigits.slice(0, firstSig + sigFigs)
  const intDigits = intStr.length
  if (kept.length <= intDigits) {
    const trailingZeros = intDigits - kept.length
    return sign * Number(kept + "0".repeat(trailingZeros))
  }
  const truncatedIntStr = kept.slice(0, intDigits)
  const truncatedFracStr = kept.slice(intDigits)
  return (
    sign * (absInt === 0 ? 0 : Number(truncatedIntStr)) + sign * Number("0." + truncatedFracStr)
  )
}
