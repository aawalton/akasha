import { realpathSync } from "node:fs"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages-system/code-root"
// The porters still stand under `tools/lib`, so they are reached by the name the
// manifest gives that package rather than by a path climbing out of akasha.
import { porterFor, UPSTREAM_LIBRARIES } from "@tools/lib/temper-upstream-data/libraries"

const SAID_WRONG = 1

const DATA = 2

const FAILED = 3

const CODE_ROOT_FLAG = "--code-root"

const CODE_ROOT_ENV = "CODE_ROOT"

const TAKING_A_VALUE = [CODE_ROOT_FLAG]

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function namesIn(argv: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (TAKING_A_VALUE.includes(one)) {
      at += 1
      continue
    }
    if (one.startsWith("-")) continue
    found.push(one)
  }
  return found
}

function messageOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function carried(): string {
  return UPSTREAM_LIBRARIES.join(", ")
}

export async function temperUpstreamDataPort(argv: readonly string[] = []): Promise<Answer> {
  const names = namesIn(argv)
  if (names.length === 0) {
    return refused(`name the upstream library ported — this carries ${carried()}`, SAID_WRONG)
  }
  if (names.length > 1) {
    return refused(
      `one call ports one library, and ${names.join(", ")} names ${String(names.length)}`,
      SAID_WRONG
    )
  }

  const named = names[0] as string
  const library = UPSTREAM_LIBRARIES.find((one) => one === named)
  if (library === undefined) {
    return refused(
      `${named} is no upstream library this ports — it carries ${carried()}`,
      SAID_WRONG
    )
  }

  const askedRoot = valuesOf(argv, CODE_ROOT_FLAG)[0]
  let root: string
  try {
    root = realpathSync(askedRoot ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${askedRoot ?? codeRoot()} is no checkout on this disk, so nothing was ported into it: ${messageOf(thrown)}`,
      DATA
    )
  }

  process.env[CODE_ROOT_ENV] = root

  try {
    const porter = await porterFor(library)
    await porter.port(root)
  } catch (thrown) {
    return refused(`${library} was not ported whole into ${root}: ${messageOf(thrown)}`, FAILED)
  }

  return {
    report: [`ported ${library} into ${root}, writing each emitted file whole`],
    refusals: [],
    code: 0,
  }
}
