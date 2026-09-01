import type { PropertyDefinition } from "@akasha/pages-core/types"

export const TITLE_COLUMN_ID = "__title__"

export const ACTIONS_COLUMN_PX = 48

export interface PageTableColumn {
  readonly id: string
  readonly label: string
  readonly def?: PropertyDefinition
  readonly width?: number
}
