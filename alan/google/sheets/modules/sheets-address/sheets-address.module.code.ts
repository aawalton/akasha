import {
  DataError,
  InputError,
} from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"

const SHEET_ID_RE = /^[A-Za-z0-9_-]{20,}$/

const PATH_ID_RE = /\/spreadsheets\/d\/([A-Za-z0-9_-]+)/

const GID_RE = /(?:^|[#&?])gid=(\d+)/

const TAB_MARK = "!"

export interface SheetAddress {
  readonly spreadsheetId: string
  readonly gid: number | null
}

export interface SheetTab {
  readonly title: string
  readonly gid: number
  readonly rows: number
  readonly columns: number
}

function gidIn(url: URL): number | null {
  const said = url.hash.match(GID_RE) ?? url.search.match(GID_RE)
  const digits = said?.[1]
  return digits === undefined ? null : Number(digits)
}

function urlOf(raw: string): URL {
  try {
    return new URL(raw)
  } catch {
    throw new InputError(`\`${raw}\` is neither a sheet URL nor a sheet id`)
  }
}

export function sheetAddressOf(raw: string): SheetAddress {
  const trimmed = raw.trim()
  if (trimmed === "") throw new InputError("no sheet URL or id was said")
  if (!trimmed.includes("://")) {
    if (SHEET_ID_RE.test(trimmed)) return { spreadsheetId: trimmed, gid: null }
    throw new InputError(`\`${raw}\` is neither a sheet URL nor a sheet id`)
  }
  const url = urlOf(trimmed)
  const id = url.pathname.match(PATH_ID_RE)?.[1]
  if (id === undefined) {
    throw new InputError(`\`${raw}\` holds no sheet id after \`/spreadsheets/d/\``)
  }
  return { spreadsheetId: id, gid: gidIn(url) }
}

export function namesItsTab(range: string | undefined): boolean {
  return range?.includes(TAB_MARK) === true
}

function quotedTitle(title: string): string {
  return `'${title.replaceAll("'", "''")}'`
}

export function rangeOf(
  said: string | undefined,
  gid: number | null,
  tabs: readonly SheetTab[]
): string {
  if (said !== undefined && namesItsTab(said)) return said
  const tab = gid === null ? tabs[0] : tabs.find((one) => one.gid === gid)
  if (tab === undefined) {
    throw new DataError(
      gid === null ? "the sheet holds no tab" : `the sheet holds no tab whose gid is ${gid}`
    )
  }
  const title = quotedTitle(tab.title)
  return said === undefined ? title : `${title}${TAB_MARK}${said}`
}
