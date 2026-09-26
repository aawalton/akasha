const ALIGNMENT_PATTERN: readonly (readonly number[])[] = [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170],
]

const TYPE_INFO: readonly (readonly string[])[] = [
  [
    "111111111111111",
    "111011111000100",
    "111001011110011",
    "111110110101010",
    "111100010011101",
    "110011000101111",
    "110001100011000",
    "110110001000001",
    "110100101110110",
  ],
  [
    "111111111111111",
    "101010000010010",
    "101000100100101",
    "101111001111100",
    "101101101001011",
    "100010111111001",
    "100000011001110",
    "100111110010111",
    "100101010100000",
  ],
  [
    "111111111111111",
    "011010101011111",
    "011000001101000",
    "011111100110001",
    "011101000000110",
    "010010010110100",
    "010000110000011",
    "010111011011010",
    "010101111101101",
  ],
  [
    "111111111111111",
    "001011010001001",
    "001001110111110",
    "001110011100111",
    "001100111010000",
    "000011101100010",
    "000001001010101",
    "000110100001100",
    "000100000111011",
  ],
]

const VERSION_INFORMATION: readonly string[] = [
  "001010010011111000",
  "001111011010000100",
  "100110010101100100",
  "110010110010010100",
  "011011111101110100",
  "010001101110001100",
  "111000100001101100",
  "101100000110011100",
  "000101001001111100",
  "000111101101000010",
  "101110100010100010",
  "111010000101010010",
  "010011001010110010",
  "011001011001001010",
  "110000010110101010",
  "100100110001011010",
  "001101111110111010",
  "001000110111000110",
  "100001111000100110",
  "110101011111010110",
  "011100010000110110",
  "010110000011001110",
  "111111001100101110",
  "101011101011011110",
  "000010100100111110",
  "101010111001000001",
  "000011110110100001",
  "010111010001010001",
  "111110011110110001",
  "110100001101001001",
  "011101000010101001",
  "001001100101011001",
  "100000101010111001",
  "100101100011000101",
]

function put(this: void, matrix: number[][], x: number, y: number, value: number): undefined {
  const column = matrix[x - 1]
  if (column !== undefined) column[y - 1] = value
}

function fillMatrixPosition(
  this: void,
  matrix: number[][],
  bit: string,
  x: number,
  y: number
): undefined {
  put(matrix, x, y, bit === "1" ? 2 : -2)
}

function addPositionDetectionPatterns(this: void, tab: number[][]): undefined {
  const size = tab.length
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      put(tab, i, j, -2)
      put(tab, size - 8 + i, j, -2)
      put(tab, i, size - 8 + j, -2)
    }
  }
  for (let i = 1; i <= 7; i++) {
    put(tab, 1, i, 2)
    put(tab, 7, i, 2)
    put(tab, i, 1, 2)
    put(tab, i, 7, 2)
    put(tab, size, i, 2)
    put(tab, size - 6, i, 2)
    put(tab, size - i + 1, 1, 2)
    put(tab, size - i + 1, 7, 2)
    put(tab, 1, size - i + 1, 2)
    put(tab, 7, size - i + 1, 2)
    put(tab, i, size - 6, 2)
    put(tab, i, size, 2)
  }
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      put(tab, 2 + j, i + 2, 2)
      put(tab, size - j - 1, i + 2, 2)
      put(tab, 2 + j, size - i - 1, 2)
    }
  }
}

function addTimingPattern(this: void, tab: number[][]): undefined {
  const line = 7
  const col = 9
  for (let i = col; i <= tab.length - 8; i++) put(tab, i, line, i % 2 === 1 ? 2 : -2)
  for (let i = col; i <= tab.length - 8; i++) put(tab, line, i, i % 2 === 1 ? 2 : -2)
}

const ALIGNMENT_CELLS: readonly (readonly [number, number, number])[] = [
  [0, 0, 2],
  [1, 0, -2],
  [-1, 0, -2],
  [2, 0, 2],
  [-2, 0, 2],
  [0, -2, 2],
  [1, -2, 2],
  [-1, -2, 2],
  [2, -2, 2],
  [-2, -2, 2],
  [0, 2, 2],
  [1, 2, 2],
  [-1, 2, 2],
  [2, 2, 2],
  [-2, 2, 2],
  [0, -1, -2],
  [1, -1, -2],
  [-1, -1, -2],
  [2, -1, 2],
  [-2, -1, 2],
  [0, 1, -2],
  [1, 1, -2],
  [-1, 1, -2],
  [2, 1, 2],
  [-2, 1, 2],
]

function addAlignmentPattern(this: void, tab: number[][]): undefined {
  const version = (tab.length - 17) / 4
  const ap = ALIGNMENT_PATTERN[version - 1] ?? []
  for (let x = 1; x <= ap.length; x++) {
    for (let y = 1; y <= ap.length; y++) {
      const corner =
        (x === 1 && y === 1) || (x === ap.length && y === 1) || (x === 1 && y === ap.length)
      if (!corner) {
        const posX = (ap[x - 1] ?? 0) + 1
        const posY = (ap[y - 1] ?? 0) + 1
        for (const [dx, dy, value] of ALIGNMENT_CELLS) put(tab, posX + dx, posY + dy, value)
      }
    }
  }
}

function addTypeInfoToMatrix(
  this: void,
  matrix: number[][],
  ecLevel: number,
  mask: number
): undefined {
  const ecMaskType = (TYPE_INFO[ecLevel - 1] ?? [])[mask + 1] ?? ""
  const bit = (i: number): string => ecMaskType.substring(i - 1, i)
  for (let i = 1; i <= 7; i++) fillMatrixPosition(matrix, bit(i), 9, matrix.length - i + 1)
  for (let i = 8; i <= 9; i++) fillMatrixPosition(matrix, bit(i), 9, 17 - i)
  for (let i = 10; i <= 15; i++) fillMatrixPosition(matrix, bit(i), 9, 16 - i)
  for (let i = 1; i <= 6; i++) fillMatrixPosition(matrix, bit(i), i, 9)
  fillMatrixPosition(matrix, bit(7), 8, 9)
  for (let i = 8; i <= 15; i++) fillMatrixPosition(matrix, bit(i), matrix.length - 15 + i, 9)
}

function addVersionInformation(this: void, matrix: number[][], version: number): undefined {
  if (version < 7) return
  const size = matrix.length
  const bitstring = VERSION_INFORMATION[version - 7] ?? ""
  for (let i = 1; i <= bitstring.length; i++) {
    const bit = bitstring.substring(i - 1, i)
    fillMatrixPosition(matrix, bit, size - 10 + ((i - 1) % 3), 1 + Math.floor((i - 1) / 3))
  }
  for (let i = 1; i <= bitstring.length; i++) {
    const bit = bitstring.substring(i - 1, i)
    fillMatrixPosition(matrix, bit, 1 + Math.floor((i - 1) / 3), size - 10 + ((i - 1) % 3))
  }
}

export function prepareMatrixWithMask(
  this: void,
  version: number,
  ecLevel: number,
  mask: number
): number[][] {
  const size = version * 4 + 17
  const tab: number[][] = []
  for (let i = 1; i <= size; i++) {
    const column: number[] = []
    for (let j = 1; j <= size; j++) column.push(0)
    tab.push(column)
  }
  addPositionDetectionPatterns(tab)
  addTimingPattern(tab)
  addVersionInformation(tab, version)
  put(tab, 9, size - 7, 2)
  addAlignmentPattern(tab)
  addTypeInfoToMatrix(tab, ecLevel, mask)
  return tab
}
