import { dirname, join, relative } from "node:path"
import { formattedBody } from "@akasha/code/code-format"
import type { Change } from "@akasha/pages/change"
import { besideAt, partedIn } from "@akasha/pages/page-file-name"
import type { Shadow } from "@akasha/pages/shadow"
import { shadowFor } from "@akasha/pages/shadow"
import { textOnDisk } from "@akasha/utils-fs/text-on-disk"
import type { FileEdit } from "../landing/landing.module.code.ts"
import { baseOf, changeOf } from "../landing/landing.module.code.ts"

const RUNNER = "change-runner"

const REACHED = "change-mechanical"

const ADDRESSED = "addressed"

const CODE = "code"

const TS = "ts"

const HOLDS = "ts"

const SLUG = "slug"

const RUN_CHANGE = "runChange"

export type Address = {
  readonly address: string
  readonly spec: string
}

export type Mapped = {
  readonly edits: readonly FileEdit[]
  readonly said: readonly string[]
}

const NOTHING_MAPPED: Mapped = { edits: [], said: [] }

function specifierFor(from: string, to: string): string {
  const said = relative(dirname(from), to)
  return said.startsWith(".") ? said : `./${said}`
}

function declaresRun(text: string): boolean {
  return new RegExp(`export (async )?function ${RUN_CHANGE}\\b`).test(text)
}

export function textOver(root: string, change: Change): (path: string) => string | null {
  const carried = new Set(change.changed)
  return (path) => {
    if (!carried.has(path)) return textOnDisk(join(root, path))
    const after = change.after(path)
    return after === null ? null : new TextDecoder().decode(after)
  }
}

function addressedOf(
  shadow: Shadow,
  kind: string,
  at: string,
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
    found.push({ address: `${kind}/${slug}`, spec: specifierFor(at, code) })
  }
  return found
}

export function addressesFor(
  shadow: Shadow,
  at: string,
  textAt: (path: string) => string | null
): readonly Address[] {
  const found = [...shadow.index.kindsUnder(REACHED)].flatMap((kind) =>
    addressedOf(shadow, kind, at, textAt)
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

export function writtenAgain(path: string): boolean {
  const said = partedIn(path)
  if (said === null || said.pageType !== RUNNER) return false
  return said.sections.length === 1 && said.sections[0] === ADDRESSED
}

export function mappedOver(
  root: string,
  shadow: Shadow,
  textAt: (path: string) => string | null
): Mapped {
  const edits: FileEdit[] = []
  const said: string[] = []
  for (const listed of shadow.index.everyOfType(RUNNER)) {
    const value = shadow.pageOf(listed.path)
    if (value === null || value[ADDRESSED] !== HOLDS) continue
    const at = besideAt(listed.path, ADDRESSED, TS)
    if (at === null) continue
    const addresses = addressesFor(shadow, at, textAt)
    const raw = new TextEncoder().encode(bodyFor(addresses))
    const body = formattedBody(root, at, raw).body
    const was = textAt(at)
    if (was !== null && was === new TextDecoder().decode(body)) continue
    edits.push({ path: at, body })
    said.push(`\`${at}\` was written again from the ${addresses.length} addresses reached`)
  }
  return edits.length === 0 ? NOTHING_MAPPED : { edits, said }
}

export function mappedFor(root: string, changes: readonly FileEdit[]): Mapped {
  try {
    const change = changeOf(root, { base: baseOf(root), edits: changes })
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING_MAPPED
    return mappedOver(root, cast.shadow, textOver(root, change))
  } catch (thrown) {
    return {
      edits: [],
      said: [
        `no address map was written again — ${thrown instanceof Error ? thrown.message : String(thrown)}`,
      ],
    }
  }
}
