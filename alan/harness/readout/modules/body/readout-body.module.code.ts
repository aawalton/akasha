export type RingScale = {
  readonly yellowAt?: number
  readonly orangeAt: number
  readonly redAt: number
  readonly blackAt: number
}

export type ReadoutWords = {
  readonly label?: string
  readonly unit?: string
}

export type RingCounts = ReadoutWords & {
  readonly unreviewed: number
  readonly scale?: RingScale
  readonly noneLeftWords?: string
  readonly noneLeftEmoji?: string
}
