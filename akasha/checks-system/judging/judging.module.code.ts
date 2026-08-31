import type { Change } from "../../pages-system/change/change.module.code.ts"
import type { Shadow } from "../../pages-system/shadow/shadow.module.code.ts"

export type Judged = {
  readonly path: string
  readonly reason: string
}

export type Running = (change: Change, shadow: Shadow) => readonly Judged[]

export type Judging = {
  readonly named: readonly string[]
  readonly over: (change: Change) => readonly Judged[]
}
