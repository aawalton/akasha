import { prepareMatrixWithMask } from "akasha/temper/addon/pages/characters/modules/qr-code-patterns/qr-code-patterns.module.code.ts"

function pixelWithMask(this: void, mask: number, px: number, py: number, value: string): number {
  const x = px - 1
  const y = py - 1
  let invert = false
  if (mask === 0) invert = (x + y) % 2 === 0
  else if (mask === 1) invert = y % 2 === 0
  else if (mask === 2) invert = x % 3 === 0
  else if (mask === 3) invert = (x + y) % 3 === 0
  else if (mask === 4) invert = (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0
  else if (mask === 5) invert = ((x * y) % 2) + ((x * y) % 3) === 0
  else if (mask === 6) invert = (((x * y) % 2) + ((x * y) % 3)) % 2 === 0
  else if (mask === 7) invert = (((x * y) % 3) + ((x + y) % 2)) % 2 === 0
  else if (mask !== -1) throw "This can't happen (mask must be <= 7)"
  const bit = value === "1" ? 1 : 0
  return invert ? 1 - 2 * bit : -1 + 2 * bit
}

type Walk = {
  readonly positions: readonly (readonly [number, number])[]
  readonly x: number
  readonly y: number
  readonly dir: string
}

function cell(this: void, matrix: readonly (readonly number[])[], x: number, y: number): number {
  return (matrix[x - 1] ?? [])[y - 1] ?? 0
}

function nextFreePositions(
  this: void,
  matrix: readonly (readonly number[])[],
  startX: number,
  startY: number,
  startDir: string,
  byteLength: number
): Walk {
  const positions: (readonly [number, number])[] = []
  let x = startX
  let y = startY
  let dir = startDir
  let count = 1
  let mode = "right"
  while (count <= byteLength) {
    let step = true
    if (mode === "right" && cell(matrix, x, y) === 0) {
      positions.push([x, y])
      mode = "left"
      count += 1
      step = false
    } else if (mode === "left" && cell(matrix, x - 1, y) === 0) {
      positions.push([x - 1, y])
      mode = "right"
      count += 1
    } else if (mode === "right" && cell(matrix, x - 1, y) === 0) {
      positions.push([x - 1, y])
      count += 1
    }
    if (step) y = dir === "up" ? y - 1 : y + 1
    if (y < 1 || y > matrix.length) {
      x -= 2
      if (x === 7) x = 6
      if (dir === "up") {
        dir = "down"
        y = 1
      } else {
        dir = "up"
        y = matrix.length
      }
    }
  }
  return { positions, x, y, dir }
}

function addDataToMatrix(this: void, matrix: number[][], data: string, mask: number): undefined {
  let x = matrix.length
  let y = matrix.length
  let dir = "up"
  for (let at = 0; at < data.length; at += 8) {
    const byte = data.substring(at, at + 8)
    const walk = nextFreePositions(matrix, x, y, dir, byte.length)
    x = walk.x
    y = walk.y
    dir = walk.dir
    for (let i = 1; i <= byte.length; i++) {
      const [px, py] = walk.positions[i - 1] ?? [0, 0]
      const column = matrix[px - 1]
      if (column !== undefined) {
        column[py - 1] = pixelWithMask(mask, px, py, byte.substring(i - 1, i))
      }
    }
  }
}

function runPenalty(this: void, run: number): number {
  return run >= 5 ? run - 2 : 0
}

function consecutivePenalty(this: void, matrix: readonly (readonly number[])[]): number {
  const size = matrix.length
  let penalty = 0
  for (let x = 1; x <= size; x++) {
    let run = 0
    let lastBlank: boolean | undefined
    for (let y = 1; y <= size; y++) {
      const isBlank = !(cell(matrix, x, y) > 0)
      if (lastBlank === isBlank) run += 1
      else {
        penalty += runPenalty(run)
        run = 1
      }
      lastBlank = isBlank
    }
    penalty += runPenalty(run)
  }
  for (let y = 1; y <= size; y++) {
    let run = 0
    let lastBlank: boolean | undefined
    for (let x = 1; x <= size; x++) {
      const isBlank = cell(matrix, x, y) < 0
      if (lastBlank === isBlank) run += 1
      else {
        penalty += runPenalty(run)
        run = 1
      }
      lastBlank = isBlank
    }
    penalty += runPenalty(run)
  }
  return penalty
}

function blockPenalty(this: void, m: readonly (readonly number[])[], x: number, y: number): number {
  const size = m.length
  if (!(y < size - 1 && x < size - 1)) return 0
  const a = cell(m, x, y)
  const b = cell(m, x + 1, y)
  const c = cell(m, x, y + 1)
  const e = cell(m, x + 1, y + 1)
  if ((a < 0 && b < 0 && c < 0 && e < 0) || (a > 0 && b > 0 && c > 0 && e > 0)) return 3
  return 0
}

function finderLike(
  this: void,
  at: (offset: number) => number,
  first: number,
  lastOffset: number
): boolean {
  if (!(first + 6 <= lastOffset)) return false
  if (!(at(0) > 0 && at(1) < 0 && at(2) > 0 && at(3) > 0 && at(4) > 0)) return false
  if (!(at(5) < 0 && at(6) > 0)) return false
  const after = first + 10 <= lastOffset && at(7) < 0 && at(8) < 0 && at(9) < 0 && at(10) < 0
  const before = first - 4 >= 1 && at(-1) < 0 && at(-2) < 0 && at(-3) < 0 && at(-4) < 0
  return after || before
}

function patternPenalty(this: void, m: readonly (readonly number[])[]): number {
  const size = m.length
  let penalty = 0
  for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) {
      penalty += blockPenalty(m, x, y)
      if (finderLike((offset) => cell(m, x, y + offset), y, size - 1)) penalty += 40
      if (finderLike((offset) => cell(m, x + offset, y), x, size)) penalty += 40
    }
  }
  return penalty
}

function darkPenalty(this: void, matrix: readonly (readonly number[])[]): number {
  const size = matrix.length
  let dark = 0
  for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) if (cell(matrix, x, y) > 0) dark += 1
  }
  const darkRatio = dark / (size * size)
  return Math.floor(Math.abs(darkRatio * 100 - 50)) * 2
}

function penaltyOf(this: void, matrix: readonly (readonly number[])[]): number {
  return consecutivePenalty(matrix) + patternPenalty(matrix) + darkPenalty(matrix)
}

function matrixAndPenalty(
  this: void,
  version: number,
  ecLevel: number,
  data: string,
  mask: number
): { readonly tab: number[][]; readonly penalty: number } {
  const tab = prepareMatrixWithMask(version, ecLevel, mask)
  addDataToMatrix(tab, data, mask)
  return { tab, penalty: penaltyOf(tab) }
}

export function matrixWithLowestPenalty(
  this: void,
  version: number,
  ecLevel: number,
  data: string
): number[][] {
  let best = matrixAndPenalty(version, ecLevel, data, 0)
  for (let mask = 1; mask <= 7; mask++) {
    const tried = matrixAndPenalty(version, ecLevel, data, mask)
    if (tried.penalty < best.penalty) best = tried
  }
  return best.tab
}
