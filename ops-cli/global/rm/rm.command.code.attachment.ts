export const summary = "Remove files, gated against the repo that would remain"

import { existsSync, readFileSync, readdirSync, rmdirSync, statSync } from "node:fs"
import { dirname } from "node:path"
import { sidecarsOf } from "../../../page/sidecar/sidecar.ts"
import { git, heldByRepo } from "../../../repo/git/git.ts"
import { land, LandingRefused, MISSING } from "../../../repo/land/land.ts"
import { removeOutside } from "../../../repo/land/outside.ts"
import { addressOf, type Addressed, defaultMessage, rejectUnknownFlags, relPathIn } from "../address.ts"
import { fail, valueOf } from "../../../patches/patch.ts"

const REPO = "--repo"

const MESSAGE = "--message"

const MESSAGE_FILE = "--message-file"

const DRY_RUN = "--dry-run"

const VALUE_FLAGS = [REPO, MESSAGE, MESSAGE_FILE]

const BARE_FLAGS = [DRY_RUN, "--help", "-h"]

export function trackedUnder(root: string, relPath: string): readonly string[] {
  const held = git(root, ["ls-files", "-z", "--", relPath])
  if (held.code !== 0) return []
  return held.stdout.split("\0").filter((one) => one !== "")
}

export function emptiedBy(root: string, gone: readonly string[]): readonly string[] {
  const dirs = new Set<string>()
  for (const relPath of gone) {
    let dir = dirname(relPath)
    while (dir !== "." && dir !== "/" && dir !== "") {
      dirs.add(dir)
      dir = dirname(dir)
    }
  }
  return [...dirs].sort((one, other) => other.split("/").length - one.split("/").length)
}

export function pruneEmptied(root: string, gone: readonly string[]): readonly string[] {
  const pruned: string[] = []
  for (const dir of emptiedBy(root, gone)) {
    const absolute = `${root}/${dir}`
    try {
      if (!existsSync(absolute) || readdirSync(absolute).length > 0) continue
      rmdirSync(absolute)
      pruned.push(dir)
    } catch {
      continue
    }
  }
  return pruned
}

function namedIn(argv: readonly string[]): readonly string[] {
  const named: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at] as string
    if (VALUE_FLAGS.includes(token)) {
      at += 1
      continue
    }
    if (token.startsWith("-")) continue
    named.push(token)
  }
  if (named.length === 0) fail("name at least one path to remove")
  return named
}

function beneath(one: string): string {
  return `      ${one}\n`
}

function openedIn(at: Addressed, named: readonly string[]): readonly string[] {
  const relPaths = named.map((one) => relPathIn(at, one))
  if (new Set(relPaths).size !== relPaths.length) fail("a path is declared more than once")
  const held = heldByRepo(at.root, relPaths)
  const refusals: string[] = []
  const opened: string[] = []
  for (const relPath of relPaths) {
    const absolute = `${at.root}/${relPath}`
    if (!held.has(relPath)) {
      refusals.push(`${relPath} ${MISSING}`)
      continue
    }
    // One git holds and the worktree has lost is a file, git holding no directory of its own.
    if (!existsSync(absolute) || statSync(absolute).isFile()) {
      opened.push(relPath)
      continue
    }
    const under = trackedUnder(at.root, relPath)
    if (under.length === 0) {
      refusals.push(
        `${relPath} is a directory git holds no file under — a removal takes what the repo holds, ` +
          "so this would take nothing"
      )
      continue
    }
    process.stderr.write(
      `the files under ${relPath}, which the directory you named takes\n` + under.map(beneath).join("")
    )
    opened.push(...under)
  }
  if (refusals.length > 0) fail(refusals.join("\n       "))
  return [...new Set(opened)]
}

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "SEVERAL PATHS IS THE SHAPE, not a convenience: two documents naming each other cannot be " +
    "removed one at a time in any order, so one call naming both is the only removal there is. A " +
    "path that is not there is REFUSED rather than treated as already-done, a removal carrying no " +
    "body to cross-check the path against.\n" +
    "\n" +
    "A PAGE'S OWN FILES GO WITH IT: an attachment, a rows file and its parts, an uncommitted file " +
    "or a sops file standing beside a named page. A DIRECTORY TAKES EVERY TRACKED FILE UNDER IT, " +
    "and one git holds no file under is refused. Everything taken without your naming it is " +
    "reported before anything goes and named in the commit, and a directory the removal leaves " +
    "empty goes too, git holding no empty directory.\n" +
    "\n" +
    "A call addressing akasha is turned into a patch against HEAD and the checks akasha defines " +
    "are run over it before anything leaves disk: a relation on a surviving file still naming a " +
    "page that would be gone refuses the call, and so does a module a survivor still imports. A " +
    "call addressing any other repository is taken unjudged, those repositories having no checks. " +
    "A path inside no repository is removed where it lies, with nothing committing it. A removal " +
    "is decided by a program rather than authored, so the checks weighing what its writer read " +
    "stand aside.\n" +
    "\n" +
    "THIS IS NOT rename or move, and `ops mv` is: it carries the body to its new path, repoints " +
    "every referrer that named it, and removes the path moved out of, in ONE commit. Reach for it " +
    "rather than removing a file and writing it back elsewhere, which drops the inbound links and " +
    "the history together.",
  irreversible: "irreversible" as const,
  flags: [
    { name: REPO, argLabel: "<name>", valueShape: "token" as const, description: "Which repository this addresses. The paths settle it, and a disagreeing --repo is refused." },
    { name: MESSAGE, argLabel: "<s>", valueShape: "prose" as const, description: "Commit message. Defaults to one naming the removed paths." },
    { name: MESSAGE_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Read the commit message from a file." },
    { name: DRY_RUN, description: "Gate and report; remove, write and commit nothing." },
  ],
  positionals: [
    {
      name: "paths",
      required: true,
      variadic: true,
      description: "What goes, absolute or against the directory this ran in. A directory opens onto every tracked file under it.",
    },
  ],
}

export default async function rm(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, VALUE_FLAGS, BARE_FLAGS)

  const named = namedIn(argv)
  const dryRun = argv.includes(DRY_RUN)
  const at = addressOf(argv, named)
  if (at === null) {
    removeOutside(named, dryRun)
    return
  }

  const opened = openedIn(at, named)
  const beside = [...new Set(opened.flatMap((relPath) => sidecarsOf(at.root, relPath)))].filter(
    (one) => !opened.includes(one)
  )
  if (beside.length > 0) {
    process.stderr.write(
      "the files standing beside what you named, which go with it\n" + beside.map(beneath).join("")
    )
  }
  const paths = [...opened, ...beside]

  const messageFile = valueOf(argv, MESSAGE_FILE)
  const message =
    messageFile !== null
      ? readFileSync(messageFile, "utf8").trim()
      : (valueOf(argv, MESSAGE) ?? defaultMessage(at.repo, "rm", paths))

  try {
    land(at, [], message, dryRun, paths, [], true)
  } catch (thrown) {
    if (thrown instanceof LandingRefused) {
      process.stderr.write(`error: ${thrown.message}\n`)
      process.exit(3)
    }
    throw thrown
  }
  if (dryRun) return
  const pruned = pruneEmptied(at.root, paths)
  if (pruned.length > 0) {
    process.stderr.write(
      "emptied by the removal, and git holds no empty directory\n" + pruned.map(beneath).join("")
    )
  }
}

if (import.meta.main) {
  const own = process.argv.slice(2)
  if (own.includes("--help") || own.includes("-h")) {
    process.stdout.write(
      "This is the rm command's own entry point, for a caller that would pay to load every " +
        "other command through `ops`. Its help is `ops rm --help`.\n"
    )
  } else {
    await rm(own)
  }
}
