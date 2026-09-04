import { oldGraphGone } from "../old-graph-gone/old-graph-gone.module.code.ts"
import type { Graph } from "../old-graph-types/old-graph-types.module.code.ts"

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>

export type Asked<T> =
  | { readonly ok: true; readonly held: T }
  | { readonly ok: false; readonly why: string }

export const askingAt: (origin: string) => Fetcher = () => oldGraphGone("askingAt")
export const graphOrigin: (root: string) => string = () => oldGraphGone("graphOrigin")
export const askGraph: (commit: string, fetcher?: Fetcher) => Promise<Asked<Graph>> = () =>
  oldGraphGone("askGraph")
