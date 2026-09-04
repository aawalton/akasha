import { readdirSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { onDisk } from "@akasha/checks/change-walking"
import { foundIn, rootsOf } from "@akasha/checks/typecheck"
import { compiled } from "@akasha/code-system/code-typing"
import type { Change } from "@akasha/pages-system/change"
import { shadowAsked } from "@akasha/pages-system/shadow"
import { counted } from "../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { oneLine, whyOf } from "../../command-system/fault-saying/fault-saying.module.code.ts"
import { ANSWER_CEILING, heldTo } from "../audit/audit.command.code.ts"
import { aiming } from "../test/test.command.code.ts"

const FILE_PATH = "--file-path"

const SEEDED = "--seeded"

const AUDIT = "`akasha audit --check typecheck`"

export const FAULT =
  '\nconst seededFault: number = "a fault akasha typecheck seeded"\nexport { seededFault }\n'

export const NOT_THE_FOLDER =
  "this judged the files named and the files importing them, and says nothing about the rest " +
  `of the folder — ${AUDIT} is what says the folder compiles`

export const REACHED = "reached from a file named rather than named"

type Meant = {
  readonly paths: readonly string[]
  readonly seeded: boolean
  readonly refusal: string | null
}

export function meaning(argv: readonly string[]): Meant {
  const refused = (said: string): Meant => ({ paths: [], seeded: false, refusal: said })
  const paths: string[] = []
  let seeded = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    if (one === SEEDED) {
      seeded = true
      continue
    }
    if (one !== FILE_PATH) {
      return refused(
        `\`${one}\` is not an argument this takes — it takes \`${FILE_PATH} <path>\` and \`${SEEDED}\``
      )
    }
    const value = argv[at + 1]
    if (value === undefined) return refused(`${FILE_PATH} names a path, and nothing followed it`)
    paths.push(value)
    at += 1
  }
  if (paths.length === 0) {
    return refused(
      `${FILE_PATH} names nothing, and this judges only what is named — ${AUDIT} judges the folder`
    )
  }
  return { paths, seeded, refusal: null }
}

export function filesUnder(root: string, named: readonly string[]): readonly string[] {
  const found = new Set<string>()
  for (const one of named) {
    const at = join(root, one)
    if (!statSync(at).isDirectory()) {
      found.add(one)
      continue
    }
    for (const entry of readdirSync(at, { recursive: true, withFileTypes: true })) {
      if (!entry.isFile()) continue
      const path = relative(root, join(entry.parentPath, entry.name))
      if (compiled(path)) found.add(path)
    }
  }
  return [...found].sort()
}

export function seededOver(
  files: readonly string[],
  disk: (path: string) => Uint8Array | null
): (path: string) => Uint8Array | null {
  const named = new Set(files)
  return (path) => {
    const held = disk(path)
    if (held === null || !named.has(path)) return held
    return new TextEncoder().encode(new TextDecoder().decode(held) + FAULT)
  }
}

export function changeOver(root: string, files: readonly string[], seeded: boolean): Change {
  const disk = onDisk(root)
  return { root, changed: files, before: disk, after: seeded ? seededOver(files, disk) : disk }
}

function judgedLine(roots: readonly string[], files: readonly string[]): string {
  const reached = roots.length - files.length
  return (
    `typecheck judged ${counted(roots.length, "file")}, the ${counted(files.length, "file")} ` +
    `named and ${counted(reached, "file")} importing them`
  )
}

function seededOf(files: readonly string[], found: ReadonlyMap<string, number>): Answer {
  const report: string[] = []
  const refusals: string[] = []
  for (const one of files) {
    const held = found.get(one) ?? 0
    if (held > 0) {
      report.push(`${one} — seen: ${counted(held, "diagnostic")} with a fault seeded into it`)
      continue
    }
    refusals.push(
      `${one} — drew no diagnostic with a fault seeded into it, so a clean answer over it means nothing`
    )
  }
  report.push("nothing was written — the fault stood in memory alone")
  return { report, refusals, code: refusals.length === 0 ? 0 : 3 }
}

export function typecheck(argv: readonly string[], given: Given): Answer {
  const meant = meaning(argv)
  if (meant.refusal !== null) return { report: [], refusals: [meant.refusal], code: 1 }
  const root = resolve(given.root)
  const aimed = aiming(meant.paths, given)
  if (aimed.refusals.length > 0) return { report: [], refusals: aimed.refusals, code: 1 }
  const files = filesUnder(root, aimed.named)
  const uncompiled = files.filter((one) => !compiled(one))
  if (uncompiled.length > 0) {
    return {
      report: [],
      refusals: uncompiled.map(
        (one) => `${one} is no file the folder compiles, so nothing judges it`
      ),
      code: 1,
    }
  }
  if (files.length === 0) {
    return {
      report: [],
      refusals: [`no file the folder compiles stands under \`${aimed.named.join("`, `")}\``],
      code: 1,
    }
  }
  const change = changeOver(root, files, meant.seeded)
  let roots: readonly string[]
  let found: readonly { readonly path: string; readonly reason: string }[]
  try {
    const shadow = shadowAsked(change)
    roots = rootsOf(change, shadow.index)
    found = foundIn(change, shadow)
  } catch (thrown) {
    return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
  }
  const judged = new Set(roots)
  const unjudged = files.filter((one) => !judged.has(one))
  if (unjudged.length > 0) {
    return {
      report: [],
      refusals: unjudged.map(
        (one) =>
          `${one} was not judged — a router app's own compile judges its routes, and this does not`
      ),
      code: 3,
    }
  }
  if (meant.seeded) {
    const seen = new Map<string, number>()
    for (const one of found) seen.set(one.path, (seen.get(one.path) ?? 0) + 1)
    return seededOf(files, seen)
  }
  const named = new Set(files)
  const lines: string[] = []
  const seen = new Set<string>()
  for (const one of found) {
    const said = `${one.path} — ${oneLine(one.reason)}`
    if (seen.has(said)) continue
    seen.add(said)
    lines.push(named.has(one.path) ? said : `${said} — ${REACHED}`)
  }
  if (lines.length === 0) {
    return {
      report: [`${judgedLine(roots, files)}, and none refused`, NOT_THE_FOLDER],
      refusals: [],
      code: 0,
    }
  }
  return {
    report: [
      `${judgedLine(roots, files)}, and ${counted(lines.length, "refusal")} in all`,
      NOT_THE_FOLDER,
    ],
    refusals: heldTo(lines, ANSWER_CEILING),
    code: 2,
  }
}
