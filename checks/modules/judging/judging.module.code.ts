import type { Change } from "@akasha/pages-system/change"
import type { Shadow } from "@akasha/pages-system/shadow"

export type Judged = {
  readonly path: string
  readonly reason: string
  readonly threw?: boolean
}

export type Running = (change: Change, shadow: Shadow) => readonly Judged[]

export type RunningAsync = (change: Change, shadow: Shadow) => Promise<readonly Judged[]>

export type AnyRunning = Running | RunningAsync

export type Judging = {
  readonly named: readonly string[]
  readonly checksFor: (change: Change) => readonly string[]
  readonly over: (change: Change) => Promise<readonly Judged[]>
}
