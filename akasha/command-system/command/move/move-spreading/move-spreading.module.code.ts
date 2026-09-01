import { existsSync, statSync } from "node:fs"
import { join } from "node:path"
import { besideOf } from "@akasha/pages-system/page-beside"
import { said as saying } from "@akasha/utils-run/running"
import { counted } from "../../../asking/asking.module.code.ts"
import { trackedUnder } from "../../remove/remove.command.code.ts"
import { pathInside } from "../../write/write.command.code.ts"

export type Pair = {
  readonly from: string
  readonly to: string
}

export type Spread = {
  readonly pairs: readonly Pair[]
  readonly under: ReadonlySet<string>
  readonly folders: readonly Pair[]
}

export type Spreading = Spread | { readonly refusals: readonly string[] }

type Held = { readonly held: readonly string[] } | { readonly refusal: string }

export function othersUnder(root: string, path: string): readonly string[] | null {
  try {
    const said = saying([
      "git",
      "-C",
      root,
      "ls-files",
      "-z",
      "--others",
      "--exclude-standard",
      "--",
      path,
    ])
    return said.split("\0").filter((one) => one !== "")
  } catch {
    return null
  }
}

function heldUnder(root: string, from: string, to: string): Held {
  if (existsSync(join(root, to))) {
    return {
      refusal: `${to} is already there, and a folder names the path it becomes rather than a parent to arrive inside`,
    }
  }
  const held = trackedUnder(root, from)
  if (held === null) {
    return {
      refusal: `git could not say which files it holds under ${from}, so nothing was judged`,
    }
  }
  if (held.length === 0) {
    return { refusal: `${from} is a folder git holds no file under, so this would carry nothing` }
  }
  const loose = othersUnder(root, from)
  if (loose === null) {
    return {
      refusal: `git could not say what it does not track under ${from}, so nothing was judged`,
    }
  }
  if (loose.length === 0) return { held }
  const said = loose.join(", ")
  return {
    refusal: `${from} holds ${counted(loose.length, "file")} git does not track — ${said} — and the folder moving away would leave them behind`,
  }
}

function sidecarsIn(root: string, held: readonly string[]): ReadonlySet<string> {
  const beside = new Set<string>()
  for (const path of held) {
    for (const other of besideOf(root, path)) {
      if (other !== path) beside.add(other)
    }
  }
  return beside
}

function folderIn(root: string, one: Pair): { readonly from: string; readonly to: string } | null {
  const from = pathInside(root, one.from)
  const to = pathInside(root, one.to)
  if (from === null || to === null) return null
  const at = join(root, from)
  if (!existsSync(at) || statSync(at).isFile()) return null
  return { from, to }
}

export function expandedIn(root: string, pairs: readonly Pair[]): Spreading {
  const refusals: string[] = []
  const out: Pair[] = []
  const under = new Set<string>()
  const folders: Pair[] = []
  for (const one of pairs) {
    const folder = folderIn(root, one)
    if (folder === null) {
      out.push(one)
      continue
    }
    const said = heldUnder(root, folder.from, folder.to)
    if ("refusal" in said) {
      refusals.push(said.refusal)
      continue
    }
    const beside = sidecarsIn(root, said.held)
    folders.push(folder)
    for (const path of said.held) {
      under.add(path)
      if (beside.has(path)) continue
      out.push({ from: path, to: `${folder.to}${path.slice(folder.from.length)}` })
    }
  }
  if (refusals.length > 0) return { refusals }
  return { pairs: out, under, folders }
}

export function spreadSaid(
  spread: Spread,
  held: number,
  cleared: readonly string[],
  dry: boolean
): readonly string[] {
  const report = spread.folders.map(
    (one) => `${one.from} ${dry ? "would move to" : "moved to"} ${one.to}`
  )
  if (held > 0) {
    report.push(
      dry
        ? `${counted(held, "file")} under a folder you named would go with it`
        : `${counted(held, "file")} under a folder you named went with it`
    )
  }
  if (cleared.length > 0) {
    const said = cleared.join(", ")
    report.push(
      dry
        ? `these would be left empty and would go, since git holds no empty folder — ${said}`
        : `these were left empty and went, since git holds no empty folder — ${said}`
    )
  }
  return report
}
