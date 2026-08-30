import type { Change } from "../../pages-system/change/change.module.code.ts"

export type Judged = {
  readonly path: string
  readonly reason: string
}

export type Judging = {
  readonly named: readonly string[]
  readonly over: (change: Change) => readonly Judged[]
}
