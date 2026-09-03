import type { Row } from "../page-derive-shape/page-derive-shape.module.code.ts"

export const UNREACHED = "names no page type whose pages are files"

export interface Test {
  readonly key: string
  readonly is?: string
  readonly in?: readonly string[]
  readonly notIn?: readonly string[]
  readonly has?: string
  readonly contains?: readonly string[]
  readonly endsWith?: string
  readonly empty?: boolean
  readonly atOrAfter?: string
  readonly before?: string
}

export type Reduction = "sum" | "mean"

export interface PageQuery {
  readonly pageType: string
  readonly takes?: Readonly<Record<string, string>>
  readonly where?: readonly Test[]
  readonly countBy?: readonly string[]
  readonly function?: Reduction
  readonly target?: string
  readonly sortBy?: string
  readonly descending?: boolean
  readonly limit?: number
  readonly offset?: number
  readonly keys?: readonly string[]
  readonly unreadable?: readonly string[]
}

export interface Group {
  readonly by: Readonly<Record<string, string | null>>
  readonly n: number
}

export interface Answer {
  readonly n: number
  readonly rows: readonly Row[]
  readonly groups: readonly Group[]
  readonly value: number | null
  readonly over: number | null
  readonly absent: readonly string[]
  readonly faults: readonly string[]
  readonly omitted: readonly string[]
  readonly unfound: readonly string[]
}
