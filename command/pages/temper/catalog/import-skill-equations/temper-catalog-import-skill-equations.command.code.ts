import { readFileSync } from "node:fs"
import { addPropertyToPages } from "akasha/change/mechanical/file-content/add/add-property-to-pages/add-property-to-pages.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { uespTable } from "akasha/command/argument/pages/uesp-table.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperCatalogImportSkillEquations as page } from "akasha/command/pages/temper/catalog/import-skill-equations/temper-catalog-import-skill-equations.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { z } from "zod"

const NAMED = [uespTable] as const

const PUT = `${changeMechanicalFileContent.slug}/${addPropertyToPages.slug}` as const

const SKILL = "temper-skill"

const KEY = "equations"

const ID_COLUMN = 1

const EQUATIONS_COLUMN = 8

const tableShape = z.object({
  version: z.string(),
  rows: z.array(z.array(z.string())),
})

type Table = z.infer<typeof tableShape>

export function tableIn(text: string): Table {
  const parsed: unknown = JSON.parse(text)
  return tableShape.parse(typeof parsed === "string" ? JSON.parse(parsed) : parsed)
}

export function equationsById(
  rows: readonly (readonly string[])[]
): ReadonlyMap<number, readonly string[]> {
  const found = new Map<number, readonly string[]>()
  for (const row of rows) {
    const id = Number(row[ID_COLUMN])
    const lines = (row[EQUATIONS_COLUMN] ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
    if (Number.isInteger(id) && lines.length > 0) found.set(id, lines)
  }
  return found
}

async function imported(done: string[], argv: readonly string[], given: Given, landing: Landing) {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), INPUT)
  const from = read.taken.uespTable
  if (from === undefined) return refused("the table is named at `--uesp-table`", INPUT)
  let table: Table
  try {
    table = tableIn(readFileSync(from, "utf8"))
  } catch (thrown) {
    return refused(`\`${from}\` reads as no UESP table: ${saidBy(thrown)}`, DATA)
  }
  const byId = equationsById(table.rows)
  const valued: { path: string; value: string }[] = []
  for (const one of valuesOfType(given.root, SKILL)) {
    const id = one.value.esoSkillId
    if (typeof id !== "number" || one.value[KEY] !== undefined) continue
    const equations = byId.get(id)
    if (equations !== undefined) valued.push({ path: one.path, value: JSON.stringify(equations) })
  }
  if (valued.length === 0) return told(["every skill UESP fit keeps its equations already"])
  const message = `keep UESP's update ${table.version} equations on ${String(valued.length)} skills`
  const landed = await landing(given.root, [{ at: PUT, given: { key: KEY, valued } }], message, {
    agentId: given.agentId,
    writer: given.writer,
    done,
  })
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([`${String(valued.length)} skill(s) keep UESP's update ${table.version} equations`])
}

export async function temperCatalogImportSkillEquations(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await imported(done, argv, given, landing))
}
