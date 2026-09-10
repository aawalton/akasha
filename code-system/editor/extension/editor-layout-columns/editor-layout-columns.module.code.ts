import type { ColumnNumber } from "../editor-group/editor-group.module.code.ts"

export type TabKind = "terminal" | "text" | "notebook" | "diff" | "webview" | "other"

export interface LayoutTab {
  readonly kind: TabKind
  readonly label: string
  readonly uri?: string
  readonly seat?: string
  readonly process?: string
  readonly active: boolean
}

export interface LayoutGroup {
  readonly column: ColumnNumber
  readonly active: boolean
  readonly tabs: readonly LayoutTab[]
}
