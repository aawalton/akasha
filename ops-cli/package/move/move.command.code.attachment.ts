export const summary = "Move one workspace package to the place its name states, manifests and all"

import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { landMoves } from "../../../move/move.ts"
import { fail, valueOf } from "../../../patches/patch.ts"
import { land, LandingRefused } from "../../../repo/land/land.ts"
import { rootsHere, targetRoot } from "../../../repo/roots/roots.ts"
import { type How, manifestWorkspaces } from "../../../workspace-package/manifest-workspaces.ts"
import { innerPackages, movesForPackage, namesTsconfig } from "../../../workspace-package/package-move.ts"
import { landedFor, type Placing, placeOf } from "../../../workspace-package/package-place.ts"
import type { Landed } from "../../../workspace-package/relocated-path.ts"
import { tsconfigRelocated } from "../../../workspace-package/tsconfig-relocated.ts"
import { addressOf, type Addressed, rejectUnknownFlags, relPathIn } from "../../global/address.ts"
import { ALL, DESCRIPTION, DRY_RUN, EXITS, FLAGS, FROM, INTO, MESSAGE, MESSAGE_FILE, PLAN, TO } from "./move-help.ts"

const VALUE_FLAGS = [FROM, TO, INTO, PLAN, MESSAGE, MESSAGE_FILE]

const BARE_FLAGS = [DRY_RUN, ALL, "--help", "-h"]

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

export function packagesOnDisk(plan: readonly Placing[], root: string): readonly Placing[] {
  return plan.filter((one) => existsSync(`${root}/${one.from}/${MANIFEST}`))
}

export function ownerOf(packages: readonly Placing[], relPath: string): Placing | null {
  let held: Placing | null = null
  for (const one of packages) {
    if (relPath !== one.to && !relPath.startsWith(`${one.to}/`)) continue
    if (held === null || one.to.length > held.to.length) held = one
  }
  return held
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

function amendManifest(at: Addressed, relPaths: readonly string[], how: How, message: string, dryRun: boolean): void {
  let body = readFileSync(`${at.root}/${MANIFEST}`, "utf8")
  let moved = false
  for (const relPath of relPaths) {
    const one = manifestWorkspaces(body, relPath, how)
    if (one === null) {
      fail(`${at.repo}:${MANIFEST} states a \`workspaces\` array this cannot read, so it must not rewrite it`)
    }
    body = one.body
    moved = moved || one.changed
  }
  const change = { body, changed: moved }
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
  if (argv.includes(ALL)) return await moveEverything(argv, source, "")
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

  const inner = innerPackages(
    fromDir,
    plan.map((one) => one.from)
  )
  const moves = movesForPackage(fromDir, toDir, tracked, inner)
  const refused = tsconfigRefusals(source, fromDir, toDir, [...moves.keys()], landed)
  if (refused.length > 0) {
    fail(
      [
        "a tsconfig path reaches a target this move cannot write across a repository:",
        ...refused.map((one) => `  ${one}`),
        "move what it reaches first, or state it in --plan",
      ].join("\n       ")
    )
  }

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

  amendManifest(destination, [toDir], "adding", message, dryRun)
  if (source.repo !== destination.repo) amendManifest(source, [fromDir], "dropping", message, dryRun)
}

async function moveEverything(argv: readonly string[], source: Addressed, fromDir: string): Promise<void> {
  const planFile = valueOf(argv, PLAN)
  const into = valueOf(argv, INTO)
  if (planFile === null) fail(`${ALL} moves what ${PLAN} names, so ${PLAN} must be given`)
  if (into === null) fail(`${ALL} needs ${INTO} to name the repository they land in`)
  if (valueOf(argv, TO) !== null) {
    fail(`${ALL} takes each package to the place its own name states, so ${TO} states nothing here`)
  }
  const destination: Addressed = { repo: into, root: targetRoot({ ...rootsHere(), target: into }) }
  const plan = planForSource(planIn(readFileSync(planFile, "utf8")), source.repo)
  const packages = packagesOnDisk(plan, source.root)
  if (packages.length === 0) fail(`${planFile} names no package ${source.repo} still holds`)
  const tracked = trackedUnder(source, fromDir === "" ? "." : fromDir)
  const landed = landedFor(plan)
  const dirs = plan.map((one) => one.from)
  const moves = new Map<string, string>()
  for (const one of packages) {
    const inner = innerPackages(one.from, dirs)
    for (const [was, lands] of movesForPackage(one.from, one.to, tracked, inner)) moves.set(was, lands)
  }
  if (moves.size === 0) fail(`${source.repo} holds nothing tracked under the packages the plan names`)

  const owned = new Map<string, string[]>()
  for (const [was, lands] of moves) {
    const own = ownerOf(packages, lands)
    if (own === null) continue
    owned.set(own.from, [...(owned.get(own.from) ?? []), was])
  }
  const refused: string[] = []
  for (const one of packages) {
    refused.push(...tsconfigRefusals(source, one.from, one.to, owned.get(one.from) ?? [], landed))
  }
  if (refused.length > 0) {
    fail(
      [
        "a tsconfig path reaches a target this move cannot write across a repository:",
        ...refused.map((one) => `  ${one}`),
        "state where it lands in --plan",
      ].join("\n       ")
    )
  }

  const messageFile = valueOf(argv, MESSAGE_FILE)
  const message =
    messageFile !== null
      ? readFileSync(messageFile, "utf8").trim()
      : (valueOf(argv, MESSAGE) ??
        `${packages.length} package(s) move from ${source.repo} to ${destination.repo}`)
  const dryRun = argv.includes(DRY_RUN)

  process.stdout.write(`plan:   ${packages.length} package(s), ${moves.size} tracked file(s)\n`)
  landMoves({
    moves,
    source,
    destination,
    message,
    dryRun,
    transform: (relPath, body) => {
      if (!namesTsconfig(relPath)) return body
      const own = ownerOf(packages, relPath)
      if (own === null) return body
      const held = tsconfigRelocated(body, own.from, own.to, landed)
      return held === null ? body : held.body
    },
  })

  amendManifest(destination, packages.map((one) => one.to), "adding", message, dryRun)
  amendManifest(source, packages.map((one) => one.from), "dropping", message, dryRun)
}

if (import.meta.main) {
  const own = process.argv.slice(2)
  if (own.includes("--help") || own.includes("-h")) {
    process.stdout.write("This is the package move command's own entry point. Its help is `ops package move --help`.\n")
  } else {
    await move(own)
  }
}
