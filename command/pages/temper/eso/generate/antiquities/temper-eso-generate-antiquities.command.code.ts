import { readFileSync, realpathSync } from "node:fs"
import { join } from "node:path"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
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
import { temperEsoGenerateAntiquities as page } from "akasha/command/pages/temper/eso/generate/antiquities/temper-eso-generate-antiquities.command.ts"
import { valuesByPath } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { temperAntiquityCategory } from "akasha/temper/catalog/pursuit/temper-antiquity-category/temper-antiquity-category.page-type.ts"
import { capturedCatalog } from "akasha/temper/catalog/world/temper-catalog-domain/modules/catalog-capture-reading/catalog-capture-reading.module.code.ts"
import { z } from "zod"

const NAMED = [codeRootArgument] as const

const CAPTURE = "antiquityLoreCatalog"

const ROWS = "antiquities"

const PUT = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

const MESSAGE = "Add the antiquities the game's capture names to their categories"

const CAPTURED = z.object({
  name: z.string(),
  totalLoreEntries: z.number(),
  setId: z.number(),
  categoryId: z.number(),
})

const STATED = z.object({ esoAntiquityId: z.number() })

type Captured = z.infer<typeof CAPTURED>

type Category = { readonly rowsAt: string; readonly stated: ReadonlySet<number> }

type Taken = Taking<typeof page, typeof NAMED>

function categoriesIn(root: string): Map<number, Category> {
  const found = new Map<number, Category>()
  for (const [path, value] of valuesByPath(root, temperAntiquityCategory.slug)) {
    const rowsAt = besideAt(path, ROWS, "jsonl")
    const id = value.esoAntiquityCategoryId
    if (rowsAt === null || typeof id !== "number") continue
    const stated = new Set<number>()
    for (const line of readFileSync(join(root, rowsAt), "utf8").split("\n")) {
      if (line.trim() !== "") stated.add(STATED.parse(JSON.parse(line)).esoAntiquityId)
    }
    found.set(id, { rowsAt, stated })
  }
  return found
}

function rowLine(id: number, antiquity: Captured): string {
  const set =
    antiquity.setId > 0
      ? { set: `temper-antiquity-set/antiquity-set-${String(antiquity.setId)}` }
      : {}
  return `${JSON.stringify({
    esoAntiquityId: id,
    antiquityName: antiquity.name,
    ...set,
    totalLoreEntries: antiquity.totalLoreEntries,
  })}\n`
}

async function written(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }

  const captured = capturedCatalog(root, CAPTURE)
  if (captured === undefined) {
    return refused(
      `no capture of \`${CAPTURE}\` has landed beside its catalog domain page, so no row was added` +
        " — the watcher lands one when the game next reloads",
      DATA
    )
  }

  const categories = categoriesIn(root)
  const added = new Map<string, string[]>()
  const addedIds: number[] = []
  const homeless: number[] = []
  for (const [key, raw] of Object.entries(captured)) {
    const id = Number(key)
    const antiquity = CAPTURED.parse(raw)
    const category = categories.get(antiquity.categoryId)
    if (category === undefined) {
      homeless.push(id)
      continue
    }
    if (category.stated.has(id)) continue
    added.set(category.rowsAt, [...(added.get(category.rowsAt) ?? []), rowLine(id, antiquity)])
    addedIds.push(id)
  }

  const said = [
    `antiquities added: ${addedIds.length === 0 ? "none" : addedIds.join(", ")}`,
    `antiquities whose category has no page: ${homeless.length === 0 ? "none" : homeless.join(", ")}`,
  ]
  if (added.size === 0)
    return told(["every antiquity the capture names is stated, so nothing landed", ...said])

  const asked: Asking[] = [...added].map(([at, lines]) => ({
    at: PUT,
    given: { at, content: lines.join("") },
  }))
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`no antiquity row was added — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  return told([`${String(landed.landed.length)} file(s) landed`, ...said])
}

export function temperEsoGenerateAntiquities(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}
