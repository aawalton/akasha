export type Rgb = readonly [number, number, number]

const BYTE = 255

export function srgbOf(hex: string): Rgb {
  const channel = (at: number): number =>
    Number.parseInt(hex.slice(1 + at * 2, 3 + at * 2), 16) / BYTE
  return [channel(0), channel(1), channel(2)]
}
