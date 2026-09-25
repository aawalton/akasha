export type RingScale = {
  readonly yellowAt?: number
  readonly orangeAt: number
  readonly redAt: number
  readonly blackAt: number
}

export type ReadoutWords = {
  readonly label?: string
  readonly unit?: string
  readonly noneLeftWords?: string
  readonly minuteUnit?: string
}

export type RingCounts = ReadoutWords & {
  readonly unreviewed: number
  readonly scale?: RingScale
  readonly noneLeftEmoji?: string
}
