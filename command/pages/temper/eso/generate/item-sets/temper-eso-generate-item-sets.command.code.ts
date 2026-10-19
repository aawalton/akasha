import { realpathSync } from "node:fs"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
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
import { temperEsoGenerateItemSets as page } from "akasha/command/pages/temper/eso/generate/item-sets/temper-eso-generate-item-sets.command.ts"
import { valuesByPath } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import type { DomainKey } from "akasha/temper/catalog/core/modules/domain-keys/domain-keys.module.code.ts"
import {
  setsCapturedIn,
  setsWrittenOver,
} from "akasha/temper/catalog/gear/temper-set/modules/set-capture-reading/set-capture-reading.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import { capturedCatalog } from "akasha/temper/catalog/world/temper-catalog-domain/modules/catalog-capture-reading/catalog-capture-reading.module.code.ts"
import { catalogDomainSlug } from "akasha/temper/watcher/modules/watcher-import-catalog/watcher-import-catalog.module.code.ts"

const NAMED = [codeRootArgument] as const

const SETS: DomainKey = "itemSetCatalog"

const CONSTANTS: DomainKey = "inventoryConstantsCatalog"

const MESSAGE = "Write each set's collection item ids and piece types from the game's capture"

type Taken = Taking<typeof page, typeof NAMED>

function idsSaid(ids: readonly number[]): string {
  return ids.length === 0 ? "none" : ids.join(", ")
}

async function written(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }

  const setTable = capturedCatalog(root, SETS)
  const constantTable = capturedCatalog(root, CONSTANTS)
  if (setTable === undefined || constantTable === undefined) {
    const missing = catalogDomainSlug(setTable === undefined ? SETS : CONSTANTS)
    return refused(
      `the \`${missing}\` catalog domain has no capture landed beside its page, so no set page` +
        " was changed — the watcher lands one once the game writes its catalog",
      DATA
    )
  }

  const captured = setsCapturedIn(setTable, constantTable)
  if (captured === undefined) {
    return refused(
      "the item set capture carries no set piece naming an item id, so no set page was changed" +
        " — the game collects them once its item set catalog is cleared and the interface reloads",
      DATA
    )
  }

  const sets = setsWrittenOver(captured, valuesByPath(root, temperSet.slug))
  const said = [
    `${String(sets.paged)} set page(s) matched a set the capture holds`,
    `sets the capture holds and no page states: ${idsSaid(sets.unpaged)}`,
    `set pages the capture holds no collection for: ${idsSaid(sets.uncaptured)}`,
  ]
  if (sets.askings.length === 0) return told(["nothing was asked of any page", ...said])

  const landed = await runMechanicalChange(root, sets.askings, MESSAGE, {
    writer: given.calledAs,
  })
  if ("refusals" in landed) {
    return refused(`the set pages were not changed — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  if (landed.landed.length === 0) {
    return told(["every set page already holds what the capture says, so nothing landed", ...said])
  }
  return told([`${String(landed.landed.length)} file(s) landed`, ...said])
}

export function temperEsoGenerateItemSets(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}
