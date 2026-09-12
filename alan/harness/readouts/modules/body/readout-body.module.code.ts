export type RingScale = {
  readonly yellowAt?: number
  readonly orangeAt: number
  readonly redAt: number
  readonly blackAt: number
}

export type RingCounts = {
  readonly unreviewed: number
  readonly scale?: RingScale
  readonly noneLeftWords?: string
  readonly noneLeftEmoji?: string
}
