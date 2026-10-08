import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { saidBy as messageOf } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { savedVariablesFile } from "akasha/command/argument/pages/saved-variables-file.argument.ts"
import { sideFile as sideFileArgument } from "akasha/command/argument/pages/side-file.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperCatalogMinedUploaded as page } from "akasha/command/pages/temper/catalog/mined-uploaded/temper-catalog-mined-uploaded.command.ts"
import {
  extractMinedItemRows,
  isFullyRead,
  readMinedAccountWide,
} from "akasha/temper/capture/datamining/reader/modules/mined-data-parse/mined-data-parse.module.code.ts"
import {
  resolveSavedVariablesPath,
  resolveSideFilePath,
} from "akasha/temper/catalog/side-file/modules/catalog-file-paths/catalog-file-paths.module.code.ts"
import {
  type MinedItemsUploaded,
  parseSideFile,
  serializeSideFile,
  withMinedItemsUploaded,
} from "akasha/temper/catalog/side-file/modules/catalog-side-file/catalog-side-file.module.code.ts"
import { mineRowsKeyed } from "akasha/temper/web/modules/mine-row-reading/mine-row-reading.module.code.ts"

const NAMED = [sideFileArgument, savedVariablesFile]

const NAMED_MISSING = 10

export type Mined = {
  readonly completed: boolean
  readonly apiVersion: string | undefined
  readonly itemIds: readonly number[]
  readonly fullyRead: boolean
}

export function uploadRecordFor(
  mined: Mined,
  storedIds: ReadonlySet<number>
): MinedItemsUploaded | { readonly why: string } {
  if (!mined.completed) return { why: "mining is not complete, so no item is recorded as landed" }
  if (mined.apiVersion === undefined) return { why: "the capture names no game version" }
  if (!mined.fullyRead) return { why: "some mined items could not be read, so none is recorded" }
  if (mined.itemIds.length === 0) return { why: "the capture holds no mined item" }
  const missing = mined.itemIds.filter((itemId) => !storedIds.has(itemId))
  if (missing.length > 0) {
    const named = missing.slice(0, NAMED_MISSING).join(", ")
    return { why: `${String(missing.length)} mined items have not landed in akasha: ${named}` }
  }
  return { apiVersion: mined.apiVersion, throughItemId: Math.max(...mined.itemIds) }
}

function minedIn(content: string): Mined {
  const accountWide = readMinedAccountWide(content)
  const { rows, diagnostics } = extractMinedItemRows(accountWide)
  const apiVersion = accountWide.apiVersion
  return {
    completed: accountWide.completed === true,
    apiVersion: typeof apiVersion === "string" ? apiVersion : undefined,
    itemIds: rows.map((row) => row.itemId),
    fullyRead: isFullyRead(diagnostics),
  }
}

export async function temperCatalogMinedUploaded(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const capturePath = resolveSavedVariablesPath(read.taken.savedVariablesFile)
  const sideFilePath = resolveSideFilePath(read.taken.sideFile)

  let mined: Mined
  try {
    mined = minedIn(readFileSync(capturePath, "utf-8"))
  } catch (thrown) {
    return refused(`${capturePath} holds no mined items this reads: ${messageOf(thrown)}`, DATA)
  }

  const stored = await mineRowsKeyed("items", "itemId", mined.itemIds)
  if (!stored.ok) return refused(`the mined items in akasha did not come back: ${stored.why}`, DATA)
  const storedIds = new Set(stored.rows.map((row) => Number(row.itemId)))

  const record = uploadRecordFor(mined, storedIds)
  if ("why" in record) return refused(record.why, DATA)

  try {
    const prior = existsSync(sideFilePath)
      ? parseSideFile(readFileSync(sideFilePath, "utf-8"))
      : undefined
    writeFileSync(sideFilePath, serializeSideFile(withMinedItemsUploaded(prior, record)), "utf-8")
  } catch (thrown) {
    return refused(`${sideFilePath} was not written: ${messageOf(thrown)}`, OPERATIONAL)
  }

  return told([
    `${String(mined.itemIds.length)} mined items in ${capturePath} are all in akasha`,
    `recorded game version ${record.apiVersion} through item ${String(record.throughItemId)} in ${sideFilePath}`,
    "the catalog addon drops those items when the game next loads it",
  ])
}
