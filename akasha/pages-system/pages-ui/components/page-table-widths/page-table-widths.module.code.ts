import { formatTime12h } from "@akasha/design-forms/format-time"
import { formatRelativeTime } from "@akasha/design-primitives/format-relative-time"
import { formatAbsoluteInstant, instantToMillis } from "@akasha/pages-core/property-types/instant"
import { formatPropertyNumber, toNumber } from "@akasha/pages-core/property-types/number"
import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"
import { parseConfig } from "@akasha/pages-core/schema/pages"
import {
  type InstantConfig,
  instantConfigSchema,
  multiSelectConfigSchema,
  numberConfigSchema,
  selectConfigSchema,
} from "@akasha/pages-core/schema/property-config-schemas"
import type { PropertyDefinition, PropertyType } from "@akasha/pages-core/types"
import { formatSmartDate } from "@akasha/pages-core/view/format-smart-date"
import {
  type PageTableColumn,
  TITLE_COLUMN_ID,
} from "@akasha/pages-ui-components/page-table-shared"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import { assertNever } from "@akasha/utils-narrow/assert-never"

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

const MAX_IDEAL = 44
const CHAR_PX = 8
const CELL_PADDING_PX = 16
export const MIN_COLUMN_PX = 96

type JsonRecord = { readonly [key: string]: ReadonlyJSONValue | undefined }

function isJsonRecord(value: ReadonlyJSONValue): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function valueDisplayLength(value: ReadonlyJSONValue | undefined): number {
  if (value == null) return 0
  if (typeof value === "string") return value.length
  if (typeof value === "number" || typeof value === "boolean") return String(value).length
  if (Array.isArray(value)) {
    if (value.length === 0) return 0
    const elements = value.reduce<number>((sum, el) => sum + valueDisplayLength(el), 0)
    return elements + (value.length - 1) * 2
  }
  if (isJsonRecord(value)) {
    const title = value.title
    if (typeof title === "string") return title.length
  }
  return JSON.stringify(value).length
}

function columnValueKey(column: PageTableColumn): string {
  return column.id === TITLE_COLUMN_ID ? "title" : column.id
}

function instantDisplayLength(
  value: ReadonlyJSONValue | undefined,
  def: PropertyDefinition
): number {
  const ms = instantToMillis(value)
  if (ms == null) return 0
  const config: InstantConfig = parseConfig(instantConfigSchema, def.config, { format: "relative" })
  const { format } = config
  if (format === "relative") return (formatRelativeTime(ms) ?? "—").length
  return formatAbsoluteInstant(ms, format).length
}

function numberDisplayLength(
  value: ReadonlyJSONValue | undefined,
  def: PropertyDefinition
): number {
  if (value == null) return 0
  const n = toNumber(value)
  if (n == null) return 0
  const config = parseConfig(numberConfigSchema, def.config, { format: "number" })
  const body = formatPropertyNumber(n, config)
  const withPrefix = config.prefix != null ? `${config.prefix}${body}` : body
  return (config.units != null ? `${withPrefix} ${config.units}` : withPrefix).length
}

function selectDisplayLength(
  value: ReadonlyJSONValue | undefined,
  def: PropertyDefinition
): number {
  if (typeof value !== "string" || value === "") return 0
  const { options } = parseConfig(selectConfigSchema, def.config, { options: [] })
  return (options.find((o) => o.id === value)?.label ?? value).length
}

function multiSelectDisplayLength(
  value: ReadonlyJSONValue | undefined,
  def: PropertyDefinition
): number {
  if (!Array.isArray(value)) return 0
  const { options } = parseConfig(multiSelectConfigSchema, def.config, { options: [] })
  const labels = new Map(options.map((o) => [o.id, o.label]))
  const shown = value
    .filter((v): v is string => typeof v === "string")
    .map((id) => labels.get(id) ?? id)
  if (shown.length === 0) return 0
  return shown.reduce((sum, l) => sum + l.length, 0) + (shown.length - 1) * 2
}

export function propertyValueDisplayLength(
  value: ReadonlyJSONValue | undefined,
  def: PropertyDefinition
): number {
  const type: PropertyType = def.type
  switch (type) {
    case "instant":
      return instantDisplayLength(value, def)
    case "number":
      return numberDisplayLength(value, def)
    case "select":
      return selectDisplayLength(value, def)
    case "multi-select":
      return multiSelectDisplayLength(value, def)
    case "calendar-date":
      return typeof value === "string" && value !== "" ? formatSmartDate(value).length : 0
    case "calendar-time":
      return typeof value === "string" && TIME_REGEX.test(value) ? formatTime12h(value).length : 0
    case "rich-document":
    case "action-button":
      return 0
    case "text":
    case "markdown":
    case "url":
    case "json":
    case "boolean":
    case "path-select":
    case "relation":
    case "multi-relation":
    case "rollup":
    case "aggregate":
    case "formula":
    case "rrule":
    case "progress":
      return valueDisplayLength(value)
    default:
      return assertNever(type)
  }
}

export function withColumnWidths(
  columns: readonly PageTableColumn[],
  rows: readonly PageRow[]
): readonly PageTableColumn[] {
  if (columns.length === 0) return columns

  return columns.map((column) => {
    const key = columnValueKey(column)
    const { def } = column
    const cellLength = (row: PageRow): number =>
      def != null ? propertyValueDisplayLength(row[key], def) : valueDisplayLength(row[key])
    const meanLen =
      rows.length === 0 ? 0 : rows.reduce((sum, row) => sum + cellLength(row), 0) / rows.length
    const idealChars = Math.min(MAX_IDEAL, Math.max(column.label.length, meanLen))
    const contentPx = idealChars * CHAR_PX + CELL_PADDING_PX
    const width = Math.round(Math.max(MIN_COLUMN_PX, contentPx))
    return { ...column, width }
  })
}

export function tableMinWidthPx(columns: readonly PageTableColumn[]): number {
  return columns.reduce((sum, column) => sum + (column.width ?? MIN_COLUMN_PX), 0)
}
