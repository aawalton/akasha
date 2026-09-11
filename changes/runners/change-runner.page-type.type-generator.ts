import type { Adding } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { textOf } from "akasha/code-system/body-text/body-text.module.code.ts"
import { importedFrom } from "akasha/pages/body/page-body.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

const PAGE_TYPE = "page-type"

const RUNNER = "change-runner"

const REACHED = "reached"

const ADDRESSED = "addressed"

const CODE = "code"

const TS = "ts"

const SLUG = "slug"

const RUN_CHANGE = "runChange"

export type Address = {
  readonly address: string
  readonly spec: string
}

function declaresRun(text: string): boolean {
  return new RegExp(`export (async )?function ${RUN_CHANGE}\\b`).test(text)
}

function addressedOf(
  shadow: Shadow,
  kind: string,
  textAt: (path: string) => string | null
): readonly Address[] {
  const found: Address[] = []
  for (const listed of shadow.index.everyOfType(kind)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    const slug = value[SLUG]
    if (typeof slug !== "string") continue
    const code = besideAt(listed.path, CODE, TS)
    if (code === null) continue
    const text = textAt(code)
    if (text === null || !declaresRun(text)) continue
    found.push({ address: `${kind}/${slug}`, spec: importedFrom(code) })
  }
  return found
}

function kindIn(said: string): string {
  const cut = said.indexOf("/")
  return cut < 0 ? said : said.slice(cut + 1)
}

function addressesFor(
  shadow: Shadow,
  reached: string,
  textAt: (path: string) => string | null
): readonly Address[] {
  const found = [...shadow.index.kindsUnder(reached)].flatMap((kind) =>
    addressedOf(shadow, kind, textAt)
  )
  return [...found].sort((one, two) =>
    one.address < two.address ? -1 : one.address > two.address ? 1 : 0
  )
}

export function bodyFor(addresses: readonly Address[]): string {
  const lines = [
    "export type Changes = {",
    ...addresses.map(
      (one) => `  "${one.address}": Parameters<typeof import("${one.spec}")["${RUN_CHANGE}"]>[1]`
    ),
    "}",
  ]
  return `${lines.join("\n")}\n`
}

function runsIn(text: string | null): boolean {
  return text !== null && declaresRun(text)
}

export function couldTurn(change: Change): boolean {
  const wasRun = (path: string): boolean => runsIn(textOf(change.before(path)))
  const isRun = (path: string): boolean => runsIn(textOf(change.after(path)))
  for (const path of change.changed) {
    const said = partedIn(path)
    if (said === null || said.held !== TS) continue
    if (said.pageType === PAGE_TYPE || said.pageType === RUNNER) return true
    if (said.sections.length === 0) {
      const code = besideAt(path, CODE, TS)
      if (code !== null && (wasRun(code) || isRun(code))) return true
      continue
    }
    if (said.sections.length === 1 && said.sections[0] === CODE && wasRun(path) !== isRun(path)) {
      return true
    }
  }
  return false
}

export function generateTypes(_root: string, shadow: Shadow, change: Change): readonly Adding[] {
  const written: Adding[] = []
  const textAt = (path: string): string | null => textOf(change.after(path))
  for (const listed of shadow.index.everyOfType(RUNNER)) {
    const value = shadow.pageOf(listed.path)
    if (value === null || value[ADDRESSED] !== TS) continue
    const at = besideAt(listed.path, ADDRESSED, TS)
    if (at === null) continue
    const reached = value[REACHED]
    if (typeof reached !== "string") continue
    written.push({
      kind: "add",
      path: at,
      content: bodyFor(addressesFor(shadow, kindIn(reached), textAt)),
    })
  }
  return written
}
