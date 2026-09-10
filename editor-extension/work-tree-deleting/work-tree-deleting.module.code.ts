import { callHarness } from "../harness-call/harness-call.module.code.ts"
import { keyedAs } from "../work-tree-dragging/work-tree-dragging.module.code.ts"

const INTENT_MODULE = "initiative-delete-intent"

const INTENT_EXPORT = "initiativeDeleteIntent"

const INTENT_TIMEOUT_MS = 60_000

export type Calling = (
  module: string,
  exported: string,
  args: readonly string[],
  options: { readonly timeout: number }
) => Promise<string>

export type Editor = {
  readonly window: {
    readonly showErrorMessage: (said: string) => unknown
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

export function deletingIntent(
  editor: Editor,
  say: (line: string) => undefined,
  call: Calling = callHarness
): (row?: WorkTreeRow) => Promise<undefined> {
  return async (row?: WorkTreeRow) => {
    const one = intentGoneOf(row)
    if (one === null) return undefined
    try {
      const said = await call(INTENT_MODULE, INTENT_EXPORT, [one.slug, one.statement], {
        timeout: INTENT_TIMEOUT_MS,
      })
      say(`[delete intent] ${said.trim()}`)
    } catch (thrown) {
      const why = intentFailureSaid(one, String(thrown))
      say(`[delete intent] ${why}`)
      void editor.window.showErrorMessage(`Work: ${why}`)
    }
    return undefined
  }
}
