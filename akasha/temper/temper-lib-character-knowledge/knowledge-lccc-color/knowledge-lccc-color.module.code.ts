function i2c(this: void, n: number, pos: number): number {
  return BitAnd(BitRShift(n, pos), 0xff) / 255
}

function c2i(this: void, n: number, pos: number): number {
  return BitLShift(BitAnd(n * 255, 0xff), pos)
}

export function int24ToRgb(this: void, rgb: number): LuaMultiReturn<[number, number, number]> {
  return $multi(i2c(rgb, 16), i2c(rgb, 8), i2c(rgb, 0))
}

export function int24ToRgba(
  this: void,
  rgb: number
): LuaMultiReturn<[number, number, number, number]> {
  return $multi(i2c(rgb, 16), i2c(rgb, 8), i2c(rgb, 0), 1)
}

export function int32ToRgba(
  this: void,
  rgba: number
): LuaMultiReturn<[number, number, number, number]> {
  return $multi(i2c(rgba, 24), i2c(rgba, 16), i2c(rgba, 8), i2c(rgba, 0))
}

export function rgbToInt24(this: void, r: number, g: number, b: number): number {
  return c2i(r, 16) + c2i(g, 8) + c2i(b, 0)
}

export function rgbaToInt32(this: void, r: number, g: number, b: number, a: number): number {
  return c2i(r, 24) + c2i(g, 16) + c2i(b, 8) + c2i(a, 0)
}

export function int24ToInt32(this: void, rgb: number, a?: number): number {
  return BitOr(BitLShift(rgb, 8), a ?? 0xff)
}

export function int32ToInt24(this: void, rgba: number): number {
  return BitRShift(rgba, 8)
}

function h2c(this: void, p: number, q: number, t: number): number {
  t = t - zo_floor(t)
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t
  }
  if (t < 1 / 2) {
    return q
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6
  }
  return p
}

export function hslToRgb(
  this: void,
  h: number,
  s: number,
  l: number,
  a?: number
): LuaMultiReturn<[number, number, number, number?]> {
  if (s === 0) {
    return $multi(l, l, l, a)
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return $multi(h2c(p, q, h + 1 / 3), h2c(p, q, h), h2c(p, q, h - 1 / 3), a)
}

export function int24ToHsl(this: void, rgb: number): LuaMultiReturn<[number, number, number]> {
  const [r, g, b] = int24ToRgb(rgb)
  return ConvertRGBToHSL(r, g, b)
}

export function int32ToHsla(
  this: void,
  rgba: number
): LuaMultiReturn<[number, number, number, number]> {
  const [r, g, b, a] = int32ToRgba(rgba)
  const [h, s, l] = ConvertRGBToHSL(r, g, b)
  return $multi(h, s, l, a)
}
