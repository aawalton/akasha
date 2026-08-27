export const summary = "Move one workspace package to the place its name states, manifests and all"

import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { landMoves } from "../../../move/move.ts"
import { fail, valueOf } from "../../../patches/patch.ts"
import { land, LandingRefused } from "../../../repo/land/land.ts"
import { rootsHere, targetRoot } from "../../../repo/roots/roots.ts"
import { type How, manifestWorkspaces } from "../../../workspace-package/manifest-workspaces.ts"
import { movesForPackage, namesTsconfig } from "../../../workspace-package/package-move.ts"
import { landedFor, type Placing, placeOf } from "../../../workspace-package/package-place.ts"
import type { Landed } from "../../../workspace-package/relocated-path.ts"
import { tsconfigRelocated } from "../../../workspace-package/tsconfig-relocated.ts"
import { addressOf, type Addressed, rejectUnknownFlags, relPathIn } from "../../global/address.ts"
import { DESCRIPTION, DRY_RUN, EXITS, FLAGS, FROM, INTO, MESSAGE, MESSAGE_FILE, PLAN, TO } from "./move-help.ts"

const VALUE_FLAGS = [FROM, TO, INTO, PLAN, MESSAGE, MESSAGE_FILE]

const BARE_FLAGS = [DRY_RUN, "--help", "-h"]

const MANIFEST = "package.json"

export const help = {
  description: `${summary}.\n\n${DESCRIPTION}`,
  flags: FLAGS,
  positionals: [],
  exits: EXITS,
}

export function nameIn(body: string): string | null {
  let read: unknown
  try {
    read = JSON.parse(body)
  } catch {
    return null
  }
  if (typeof read !== "object" || read === null || Array.isArray(read)) return null
  const name = (read as Record<string, unknown>).name
  return typeof name === "string" ? name : null
}

export function planForSource(plan: readonly Placing[], repo: string): readonly Placing[] {
  const mark = `${repo}:`
  return plan
    .filter((one) => one.from.startsWith(mark))
    .map((one) => ({ ...one, from: one.from.slice(mark.length) }))
}

export function planIn(text: string): readonly Placing[] {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch (thrown) {
    fail(`the plan is not JSON this can read: ${thrown instanceof Error ? thrown.message : thrown}`)
  }
  if (!Array.isArray(read)) fail("the plan is not a list of placings")
  return (read as readonly unknown[]).map((one, at) => {
    if (typeof one !== "object" || one === null) fail(`plan entry ${at + 1} is not an object`)
    const entry = one as Record<string, unknown>
    for (const key of ["name", "from", "to"]) {
      if (typeof entry[key] !== "string") fail(`plan entry ${at + 1} has no \`${key}\` string`)
    }
    return { name: entry.name as string, from: entry.from as string, to: entry.to as string }
  })
}

function trackedUnder(at: Addressed, dir: string): readonly string[] {
  const said = execFileSync("git", ["-C", at.root, "ls-files", "-z", "--", dir], {
    encoding: "utf8",
    maxBuffer: 1 << 28,
  })
  return said.split("\0").filter((one) => one !== "")
}

function tsconfigRefusals(
  at: Addressed,
  fromDir: string,
  toDir: string,
  tracked: readonly string[],
  landed: readonly Landed[]
): readonly string[] {
  const refused: string[] = []
  for (const relPath of tracked) {
    if (!namesTsconfig(relPath)) continue
    const held = tsconfigRelocated(readFileSync(`${at.root}/${relPath}`, "utf8"), fromDir, toDir, landed)
    if (held === null) continue
    for (const spec of held.refused) refused.push(`${relPath}: ${spec}`)
  }
  return refused
}

function amendManifest(at: Addressed, relPath: string, how: How, message: string, dryRun: boolean): void {
  const body = readFileSync(`${at.root}/${MANIFEST}`, "utf8")
  const change = manifestWorkspaces(body, relPath, how)
  if (change === null) {
    fail(`${at.repo}:${MANIFEST} states a \`workspaces\` array this cannot read, so it must not rewrite it`)
  }
  if (!change.changed) {
    process.stdout.write(`repo:   ${at.repo}, whose workspaces already read as they should\n`)
    return
  }
  process.stdout.write(`repo:   ${at.repo}, whose workspaces ${how === "adding" ? "take it on" : "give it up"}\n`)
  try {
    land(at, [{ relPath: MANIFEST, body: change.body }], message, dryRun, [], [], true, [], new Map())
  } catch (thrown) {
    if (thrown instanceof LandingRefused) {
      process.stderr.write(`error: ${thrown.message}\n`)
      process.exit(3)
    }
    throw thrown
  }
}

export default async function move(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, VALUE_FLAGS, BARE_FLAGS)

  const stated = valueOf(argv, FROM)
  if (stated === null) fail(`${FROM} names the package directory to move`)
  const source = addressOf(argv, [stated])
  if (source === null) fail(`${stated} stands inside no repository, and a move is a commit in one`)
  const fromDir = relPathIn(source, stated)

  const manifest = `${source.root}/${fromDir}/${MANIFEST}`
  if (!existsSync(manifest)) fail(`${fromDir} holds no ${MANIFEST}, so it is not a workspace package`)
  const name = nameIn(readFileSync(manifest, "utf8"))
  if (name === null) fail(`${fromDir}/${MANIFEST} states no \`name\`, so nothing says where it lands`)

  const into = valueOf(argv, INTO)
  const toStated = valueOf(argv, TO)
  if (into === null && toStated === null) fail(`name where it lands, with ${INTO} or ${TO}`)
  let destination: Addressed
  let toDir: string
  if (toStated !== null) {
    const at = addressOf([], [toStated])
    if (at === null) fail(`${toStated} stands inside no repository`)
    destination = at
    toDir = relPathIn(at, toStated)
  } else {
    const place = placeOf(name)
    if (place === null) {
      fail(`\`${name}\` states no place — a scope and a name, or a plain name, and nothing else`)
    }
    destination = { repo: into as string, root: targetRoot({ ...rootsHere(), target: into as string }) }
    toDir = place
  }

  const tracked = trackedUnder(source, fromDir)
  if (tracked.length === 0) fail(`${fromDir} holds nothing tracked, so there is nothing to move`)

  const planFile = valueOf(argv, PLAN)
  const plan =
    planFile === null
      ? [{ name, from: fromDir, to: toDir }]
      : planForSource(planIn(readFileSync(planFile, "utf8")), source.repo)
  const landed = landedFor(plan)

  const refused = tsconfigRefusals(source, fromDir, toDir, tracked, landed)
  if (refused.length > 0) {
    fail(
      [
        "a tsconfig path reaches a target this move cannot write across a repository:",
        ...refused.map((one) => `  ${one}`),
        "move what it reaches first, or state it in --plan",
      ].join("\n       ")
    )
  }

  const moves = movesForPackage(fromDir, toDir, tracked)
  const messageFile = valueOf(argv, MESSAGE_FILE)
  const message =
    messageFile !== null
      ? readFileSync(messageFile, "utf8").trim()
      : (valueOf(argv, MESSAGE) ?? `${name} moves to ${destination.repo}:${toDir}`)
  const dryRun = argv.includes(DRY_RUN)

  landMoves({
    moves,
    source,
    destination,
    message,
    dryRun,
    transform: (relPath, body) => {
      if (!namesTsconfig(relPath)) return body
      const held = tsconfigRelocated(body, fromDir, toDir, landed)
      return held === null ? body : held.body
    },
  })

  amendManifest(destination, toDir, "adding", message, dryRun)
  if (source.repo !== destination.repo) amendManifest(source, fromDir, "dropping", message, dryRun)
}

if (import.meta.main) {
  const own = process.argv.slice(2)
  if (own.includes("--help") || own.includes("-h")) {
    process.stdout.write("This is the package move command's own entry point. Its help is `ops package move --help`.\n")
  } else {
    await move(own)
  }
}
