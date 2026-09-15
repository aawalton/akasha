import {
  callHarness,
  LANDING_TIMEOUT_MS,
} from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import {
  type Calling,
  initiativeGoneOf,
} from "akasha/code/editor/extension/modules/work-tree-deleting/work-tree-deleting.module.code.ts"
import { shownSaid } from "akasha/code/editor/extension/modules/work-tree-dragging/work-tree-dragging.module.code.ts"
import { initiativeAssign } from "akasha/command/pages/initiative/assign/initiative-assign.command.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"

const ASSIGN_SLUG = initiativeAssign.slug

const ASSIGN_EXPORT = exportedAs(ASSIGN_SLUG)

const MOVED_UNDERFOOT = "that moved while you were assigning it — nothing was assigned"

export type Editor = {
  readonly window: {
    readonly showInformationMessage: (said: string) => unknown
    readonly showErrorMessage: (said: string) => unknown
  }
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
  call: Calling = callHarness
): (row?: WorkTreeRow) => Promise<undefined> {
  return async (row?: WorkTreeRow) => {
    const slug = initiativeGoneOf(row)
    if (slug === null) return undefined
    try {
      const said = await call(ASSIGN_SLUG, ASSIGN_EXPORT, [slug], {
        timeout: LANDING_TIMEOUT_MS,
      })
      say(`[assign] ${said.trim()}`)
      void editor.window.showInformationMessage(`Work: ${assignDoneSaid(said)}`)
    } catch (thrown) {
      const why = assignFailureSaid(slug, String(thrown))
      say(`[assign] ${why}`)
      void editor.window.showErrorMessage(
        `Work: ${shownSaid(why, String(thrown), MOVED_UNDERFOOT)}`
      )
    }
    return undefined
  }
}
