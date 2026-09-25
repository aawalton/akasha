import { seatNameFor } from "akasha/agent/seat/name/modules/initiative-seat-name/initiative-seat-name.module.code.ts"
import type { WorkTreeRow } from "akasha/alan/harness/code-editor/data-interface/pages/work-tree/work-tree.code-editor-data-interface.code.ts"
import {
  callHarness,
  LANDING_TIMEOUT_MS,
} from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import type {
  Calling,
  Editor,
} from "akasha/code/editor/extension/modules/panel-acting/panel-acting.module.code.ts"
import { initiativeGoneOf } from "akasha/code/editor/extension/modules/work-tree-deleting/work-tree-deleting.module.code.ts"
import { shownSaid } from "akasha/code/editor/extension/modules/work-tree-dragging/work-tree-dragging.module.code.ts"
import { initiativeAssign } from "akasha/command/pages/initiative/assign/initiative-assign.command.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"

const ASSIGN_SLUG = initiativeAssign.slug

const ASSIGN_EXPORT = exportedAs(ASSIGN_SLUG)

const MOVED_UNDERFOOT = "that moved while you were assigning it — nothing was assigned"

export type Assigning = {
  readonly slug: string
  readonly seat: string
}

export interface WorkAssignWatch {
  readonly assigning: (one: Assigning) => undefined
  readonly answered: (slug: string) => undefined
  readonly stayed: (slug: string) => undefined
}

export function assignFailureSaid(slug: string, why: string): string {
  return `${slug}: the initiative was not assigned. ${why}`
}

export function assignDoneSaid(said: string): string {
  return said.trim().split("\n")[0] ?? ""
}

export function assigningInitiative(
  editor: Editor,
  say: (line: string) => undefined,
  watch: WorkAssignWatch,
  call: Calling = callHarness
): (row?: WorkTreeRow) => Promise<undefined> {
  return async (row?: WorkTreeRow) => {
    const slug = initiativeGoneOf(row)
    if (slug === null) return undefined
    watch.assigning({ slug, seat: seatNameFor(slug) })
    try {
      const said = await call(ASSIGN_SLUG, ASSIGN_EXPORT, [slug], {
        timeout: LANDING_TIMEOUT_MS,
      })
      watch.answered(slug)
      say(`[assign] ${said.trim()}`)
      void editor.window.showInformationMessage(`Work: ${assignDoneSaid(said)}`)
    } catch (thrown) {
      watch.stayed(slug)
      const why = assignFailureSaid(slug, String(thrown))
      say(`[assign] ${why}`)
      void editor.window.showErrorMessage(
        `Work: ${shownSaid(why, String(thrown), MOVED_UNDERFOOT)}`
      )
    }
    return undefined
  }
}
