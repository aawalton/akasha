export type Reading = {
  readonly readersOweReading?: boolean
  readonly writerOwesReading?: boolean
}

export type Edit = Reading & {
  readonly kind?: undefined
  readonly path: string
  readonly was: string | null
  readonly body: string | null
  readonly from?: string
}

export type Adding = Reading & {
  readonly kind: "add"
  readonly path: string
  readonly content: string
}

export type Replacing = Reading & {
  readonly kind: "replace"
  readonly path: string
  readonly contentFrom: string
  readonly contentTo: string
}

export type Removing = Reading & {
  readonly kind: "remove"
  readonly path: string
}

export type Moving = Reading & {
  readonly kind: "move"
  readonly pathFrom: string
  readonly pathTo: string
}

export type Stated = Adding | Replacing | Removing | Moving

export type Answer = {
  readonly edits: readonly Edit[]
  readonly refused: string | null
}
