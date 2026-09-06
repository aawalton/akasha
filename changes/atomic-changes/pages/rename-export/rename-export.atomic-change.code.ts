import { typed } from "@akasha/code-system/code-typing"
import { respelled } from "../../../../code-system/export-respelling/export-respelling.module.code.ts"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"

const NAMED = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const BESIDE = [".code.ts", ".code.tsx", ".test.ts", ".test.tsx", ".test-fixtures.ts"]

export type Asked = {
  readonly at: string
  readonly of: string
  readonly to: string
}

export type Renamed = {
  readonly bodies: ReadonlyMap<string, string> | null
  readonly refused: string | null
}

function refusing(why: string): Renamed {
  return { bodies: null, refused: why }
}

function besideAPage(at: string): boolean {
  return BESIDE.some((one) => at.endsWith(one))
}

function whyNot(given: Asked): string | null {
  if (!typed(given.at)) return `\`${given.at}\` names no TypeScript body`
  if (!besideAPage(given.at)) return `\`${given.at}\` is a page, and a page's export is its slug`
  if (!NAMED.test(given.of)) return `\`${given.of}\` is no name a body carries`
  if (!NAMED.test(given.to)) return `\`${given.to}\` is no name a body carries`
  if (given.of === given.to) return `\`${given.to}\` is the name it already carries`
  return null
}

export function renameExport(
  root: string,
  given: Asked,
  textOf: (path: string) => string | null
): Renamed {
  const why = whyNot(given)
  if (why !== null) return refusing(why)
  const reading = importingOf(root, new Map([[given.at, given.at]]))
  if ("unread" in reading) return refusing(reading.unread)
  const over = [given.at, ...reading.importers]
  return respelled(root, given.at, over, given.of, given.to, textOf)
}
