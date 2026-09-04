import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { differenceOf } from "../differing/differing.module.code.ts"
import {
  emittedPath,
  type ResolvedWidget,
  resolveWidget,
  ringWidgetSwift,
} from "../ios-widget-swift/ios-widget-swift.module.code.ts"

function fail(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(1)
}

const HELP = [
  "bun akasha/command-system/ios-widget-emit/ios-widget-emit.module.code.ts — one iOS widget's Swift, from its document",
  "",
  "Reads the `ios-widget` document named, and nothing but what that document names: its app for",
  "the extension directory, its readout display for the groups drawn, each group's readouts for",
  "the wire key the tile finds its circle under, and its own caption, gallery text, families,",
  "kind, feed and link. That is the whole of the coupling — one page type slug — and it is what",
  "makes the set of widgets a projection of the pages rather than a list kept by hand.",
  "",
  "There is no macOS toolchain here, so nothing builds, renders or places a tile. `--diff`",
  "against the committed Swift is the whole of what this proves, and a widget it reproduces is",
  "one whose document says everything its Swift did.",
  "",
  "THE ONE-RING FORM ONLY. A widget whose display resolves to more than one reading is refused",
  "by name rather than emitted wrong; the strip and grid forms are not written yet.",
  "",
  "Usage:",
  "  bun akasha/command-system/ios-widget-emit/ios-widget-emit.module.code.ts <widget-slug>... [--diff] [--write]",
  "",
  "  <widget-slug>  an `ios-widget` document under `domains/ios-widgets/`, by slug; several are",
  "                 read in one act. There is no emit-everything form: a widget this cannot yet",
  "                 state would be skipped silently in a sweep and is named loudly in one call.",
  "  --diff         print every line where the emission and the committed file differ, rather",
  "                 than the emission. Exits 1 where any widget differs.",
  "  --write        write each emission to its path in the code repository, over what is there.",
  "  --code-root    the code repository the emitted path is taken against (default: the sibling",
  "                 `code` checkout beside this repo).",
  "  --help         this.",
  "",
  "Exit codes:",
  "  0  every widget named was emitted, and under `--diff` reproduced its file",
  "  1  no widget named, an unknown flag, a document that could not be resolved, or a",
  "     difference under `--diff`",
  "",
].join("\n")

const FLAGS = ["--diff", "--write", "--code-root", "--help"]

const TEXT = new TextEncoder()

function differences(emitted: string, committed: string, path: string): string {
  const found = differenceOf(TEXT.encode(committed), TEXT.encode(emitted))
  if (found === null)
    return `--- committed ${path}\n+++ emitted   ${path}\n(the two differ in bytes git reports no line for)`
  return [`--- committed ${path}`, `+++ emitted   ${path}`, ...found.split("\n").slice(2)].join(
    "\n"
  )
}

function report(
  resolved: ResolvedWidget,
  swift: string,
  codeRoot: string,
  diffing: boolean
): boolean {
  const relative = emittedPath(resolved)
  const absolute = join(codeRoot, relative)
  if (!diffing) {
    process.stdout.write(`${relative}\n${swift}`)
    return false
  }
  if (!existsSync(absolute)) {
    process.stdout.write(`${relative} — nothing stands there to compare against\n`)
    return true
  }
  const committed = readFileSync(absolute, "utf8")
  if (committed === swift) {
    process.stdout.write(`${relative} — reproduced, byte for byte\n`)
    return false
  }
  process.stdout.write(`${differences(swift, committed, relative)}\n`)
  return true
}

function main(): undefined {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.length === 0) {
    process.stdout.write(HELP)
    return
  }
  const stray = argv.filter((word) => word.startsWith("--") && !FLAGS.includes(word))
  if (stray.length > 0) {
    fail(
      `\`${stray.join(", ")}\` is not a flag here; this takes ${FLAGS.join(", ")}. A flag read past ` +
        "rather than refused answers a different question than the one asked, and reads as the one asked."
    )
  }
  const rootFlag = argv.indexOf("--code-root")
  const stated = rootFlag === -1 ? undefined : argv[rootFlag + 1]
  if (rootFlag !== -1 && (stated === undefined || stated.startsWith("--"))) {
    fail("`--code-root` takes a path, and none followed it")
  }
  const valueAt = rootFlag === -1 ? -1 : rootFlag + 1
  const slugs = argv.filter((word, index) => !word.startsWith("--") && index !== valueAt)
  if (slugs.length === 0) fail("name at least one `ios-widget` slug")

  const roots = resolveRoots()
  const codeRoot = stated ?? join(rootFor(roots, AKASHA), "..", "code")
  const diffing = argv.includes("--diff")
  const writing = argv.includes("--write")
  let differed = false

  for (const slug of slugs) {
    let resolved: ResolvedWidget
    let swift: string
    try {
      resolved = resolveWidget(rootFor(roots, AKASHA), slug)
      swift = ringWidgetSwift(resolved)
    } catch (err) {
      fail(err instanceof Error ? err.message : String(err))
    }
    if (writing) {
      writeFileSync(join(codeRoot, emittedPath(resolved)), swift)
      process.stdout.write(`wrote ${emittedPath(resolved)}\n`)
      continue
    }
    if (report(resolved, swift, codeRoot, diffing)) differed = true
  }
  if (differed) process.exit(1)
}

if (import.meta.main) main()
