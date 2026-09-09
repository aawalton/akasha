export type Reading = {
  readonly readersOweReading?: boolean
  readonly writerOwesReading?: boolean
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

export type FileChange = Adding | Replacing | Removing | Moving

export type Splice = {
  readonly from: number
  readonly to: number
  readonly put: string
}

export type NotText = { readonly notText: true }

export type Held = string | NotText

export type Bodies = ReadonlyMap<string, string | null>

export type Replayed = ReadonlyMap<string, Held | null>

export type Answer = {
  readonly edits: readonly FileChange[]
  readonly refused: string | null
}

export type Said = Answer
