export interface ColumnLayout {
  1: readonly (readonly number[])[]
  2: readonly (readonly number[])[]
  3: readonly (readonly number[])[]
}

const STANDARD_CARD_HEIGHT = 232
const CARDS_PER_COLUMN = 2

export function createGenericLayout(): ColumnLayout {
  return {
    1: [Array(CARDS_PER_COLUMN).fill(STANDARD_CARD_HEIGHT)],
    2: Array.from({ length: 2 }, () => Array(CARDS_PER_COLUMN).fill(STANDARD_CARD_HEIGHT)),
    3: Array.from({ length: 3 }, () => Array(CARDS_PER_COLUMN).fill(STANDARD_CARD_HEIGHT)),
  }
}

export function createGenericEditorLayout(): ColumnLayout {
  const col = Array(CARDS_PER_COLUMN).fill(STANDARD_CARD_HEIGHT)
  return {
    1: [col],
    2: [col, col],
    3: [col, col, col],
  }
}
