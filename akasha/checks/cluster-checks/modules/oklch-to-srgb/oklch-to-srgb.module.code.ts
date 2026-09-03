function gammaEncode(linear: number): number {
  const sign = linear < 0 ? -1 : 1
  const abs = Math.abs(linear)
  const encoded = abs <= 0.0031308 ? 12.92 * abs : 1.055 * abs ** (1 / 2.4) - 0.055
  return sign * encoded
}

function clamp01(x: number): number {
  if (x < 0) return 0
  if (x > 1) return 1
  return x
}

export function oklchToSrgb(l: number, c: number, h: number): readonly [number, number, number] {
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)

  const lCbrt = l + 0.3963377774 * a + 0.2158037573 * b
  const mCbrt = l - 0.1055613458 * a - 0.0638541728 * b
  const sCbrt = l - 0.0894841775 * a - 1.291485548 * b

  const lLms = lCbrt ** 3
  const mLms = mCbrt ** 3
  const sLms = sCbrt ** 3

  const rLin = 4.0767416621 * lLms - 3.3077115913 * mLms + 0.2309699292 * sLms
  const gLin = -1.2684380046 * lLms + 2.6097574011 * mLms - 0.3413193965 * sLms
  const bLin = -0.0041960863 * lLms - 0.7034186147 * mLms + 1.707614701 * sLms

  return [clamp01(gammaEncode(rLin)), clamp01(gammaEncode(gLin)), clamp01(gammaEncode(bLin))]
}

export function oklchToSrgbBytes(
  l: number,
  c: number,
  h: number
): readonly [number, number, number] {
  const [r, g, b] = oklchToSrgb(l, c, h)
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}
