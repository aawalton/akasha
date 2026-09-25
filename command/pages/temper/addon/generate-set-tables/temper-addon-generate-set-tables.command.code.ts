import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"

import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  answeredByPage,
  type Taking,
} from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperAddonGenerateSetTables as page } from "akasha/command/pages/temper/addon/generate-set-tables/temper-addon-generate-set-tables.command.ts"
import {
  readingIn,
  valuesByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { setTablesOver } from "akasha/temper/catalog/gear/temper-set/modules/set-tables-keeping/set-tables-keeping.change-generator.code.ts"

const NAMED = [codeRootArgument] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const MESSAGE =
  "Write the set tables of the sets addon, the item browser and character builds from the set pages"

type Taken = Taking<typeof page, typeof NAMED>

async function heldAt(root: string, at: string): Promise<string | null> {
  try {
    return await readFile(join(root, at), "utf8")
  } catch {
    return null
  }
}

async function written(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }
  const reading = readingIn(root)
  const made = setTablesOver({
    pagesOf: (pageTypeSlug) => valuesByPath(reading, pageTypeSlug),
    bodyAt: reading.read,
  })
  if ("refused" in made) return refused(`no table was written — ${made.refused}`, DATA)
  const asked: Asking[] = []
  for (const [at, body] of made.tables) {
    if ((await heldAt(root, at)) !== body) asked.push({ at: PUT, given: { at, body } })
  }
  if (asked.length === 0) return told(["every table already holds what the set pages say"])
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`the tables were not written — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  if (landed.landed.length === 0) {
    return told(["every table already holds what the set pages say, once formatted"])
  }
  return told([
    `${String(landed.landed.length)} file(s) landed`,
    `written from ${String(made.sets)} set page(s)`,
  ])
}

export function temperAddonGenerateSetTables(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}
