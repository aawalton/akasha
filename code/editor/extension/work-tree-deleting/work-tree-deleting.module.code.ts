import {
  callHarness,
  LANDING_TIMEOUT_MS,
} from "akasha/code/editor/extension/harness-call/harness-call.module.code.ts"
import {
  keyedAs,
  shownSaid,
} from "akasha/code/editor/extension/work-tree-dragging/work-tree-dragging.module.code.ts"
import { initiativeDelete } from "akasha/commands/pages/initiative/delete/initiative-delete.command.ts"
import { initiativeDeleteIntent } from "akasha/commands/pages/initiative/delete-intent/initiative-delete-intent.command.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"

const INTENT_SLUG = initiativeDeleteIntent.slug

const INTENT_EXPORT = exportedAs(INTENT_SLUG)

const INITIATIVE_SLUG = initiativeDelete.slug

const INITIATIVE_EXPORT = exportedAs(INITIATIVE_SLUG)

const CONFIRM = "Delete"

const MOVED_UNDERFOOT = "that moved while you were deleting it — nothing was deleted"

export type Calling = (
  slug: string,
  exported: string,
  args: readonly string[],
  options: { readonly timeout: number }
) => Promise<string>

export type Editor = {
  readonly window: {
    readonly showErrorMessage: (said: string) => unknown
    readonly showWarningMessage: (
      said: string,
      options: { readonly modal: true; readonly detail: string },
      confirm: string
    ) => PromiseLike<string | undefined>
  }
}

export type IntentGone = {
  readonly slug: string
  readonly statement: string
}

export function intentGoneOf(row: WorkTreeRow | undefined): IntentGone | null {
  const keyed = keyedAs(row)
  if (row === undefined || keyed === null || row.label === "") return null
  return { slug: keyed.slug, statement: row.label }
}

export function intentFailureSaid(one: IntentGone, why: string): string {
  return `${one.slug}: the intent \`${one.statement}\` did not go. ${why}`
}

export function initiativeGoneOf(row: WorkTreeRow | undefined): string | null {
  if (row === undefined || row.kind !== "initiative" || row.key === "") return null
  return row.key
}

export function initiativeAskedSaid(slug: string): string {
  return `Delete the initiative ${slug}?`
}

export function initiativeDetailSaid(slug: string): string {
  return `${slug} goes with every intent it holds. A seat assigned to it keeps that assignment.`
}

export function initiativeFailureSaid(slug: string, why: string): string {
  return `${slug}: the initiative did not go. ${why}`
}

export interface WorkDeleteWatch {
  readonly intentGoing: (one: IntentGone) => undefined
  readonly initiativeGoing: (slug: string) => undefined
  readonly answered: (slug: string) => undefined
  readonly stayed: (slug: string) => undefined
}

export function deletingInitiative(
  editor: Editor,
  say: (line: string) => undefined,
  watch: WorkDeleteWatch,
  call: Calling = callHarness
): (row?: WorkTreeRow) => Promise<undefined> {
  return async (row?: WorkTreeRow) => {
    const slug = initiativeGoneOf(row)
    if (slug === null) return undefined
    const chosen = await editor.window.showWarningMessage(
      initiativeAskedSaid(slug),
      { modal: true, detail: initiativeDetailSaid(slug) },
      CONFIRM
    )
    if (chosen !== CONFIRM) return undefined
    watch.initiativeGoing(slug)
    try {
      const said = await call(INITIATIVE_SLUG, INITIATIVE_EXPORT, [slug], {
        timeout: LANDING_TIMEOUT_MS,
      })
      watch.answered(slug)
      say(`[delete initiative] ${said.trim()}`)
    } catch (thrown) {
      watch.stayed(slug)
      const why = initiativeFailureSaid(slug, String(thrown))
      say(`[delete initiative] ${why}`)
      const shown = shownSaid(why, String(thrown), MOVED_UNDERFOOT)
      void editor.window.showErrorMessage(`Work: ${shown}`)
    }
    return undefined
  }
}

export function deletingIntent(
  editor: Editor,
  say: (line: string) => undefined,
  watch: WorkDeleteWatch,
  call: Calling = callHarness
): (row?: WorkTreeRow) => Promise<undefined> {
  return async (row?: WorkTreeRow) => {
    const one = intentGoneOf(row)
    if (one === null) return undefined
    watch.intentGoing(one)
    try {
      const said = await call(INTENT_SLUG, INTENT_EXPORT, [one.slug, one.statement], {
        timeout: LANDING_TIMEOUT_MS,
      })
      watch.answered(one.slug)
      say(`[delete intent] ${said.trim()}`)
    } catch (thrown) {
      watch.stayed(one.slug)
      const why = intentFailureSaid(one, String(thrown))
      say(`[delete intent] ${why}`)
      const shown = shownSaid(why, String(thrown), MOVED_UNDERFOOT)
      void editor.window.showErrorMessage(`Work: ${shown}`)
    }
    return undefined
  }
}
