import {
  callHarness,
  LANDING_TIMEOUT_MS,
} from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import { findingDelete } from "akasha/command/pages/finding/delete/finding-delete.command.ts"
import { gapDelete } from "akasha/command/pages/gap/delete/gap-delete.command.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"

const FINDING_SLUG = findingDelete.slug

const FINDING_EXPORT = exportedAs(FINDING_SLUG)

const GAP_SLUG = gapDelete.slug

const GAP_EXPORT = exportedAs(GAP_SLUG)

const FINDING_KEYED = "finding/"

const GAP_KEYED = "gap/"

const PLACE_MARK = "#"

export type Calling = (
  slug: string,
  exported: string,
  args: readonly string[],
  options: { readonly timeout: number }
) => Promise<string>

export type Editor = {
  readonly window: {
    readonly showErrorMessage: (said: string) => unknown
  }
}

export type GapGone = {
  readonly page: string
  readonly statement: string
}

export function findingGoneOf(row: FindingTreeRow | undefined): string | null {
  if (row === undefined || !row.key.startsWith(FINDING_KEYED)) return null
  const slug = row.key.slice(FINDING_KEYED.length)
  return slug === "" ? null : slug
}

export function gapGoneOf(row: GapTreeRow | undefined): GapGone | null {
  if (row === undefined || !row.key.startsWith(GAP_KEYED) || row.label === "") return null
  const keyed = row.key.slice(GAP_KEYED.length)
  const mark = keyed.lastIndexOf(PLACE_MARK)
  if (mark < 1) return null
  return { page: keyed.slice(0, mark), statement: row.label }
}

export function findingFailureSaid(slug: string, why: string): string {
  return `${slug}: the finding did not go. ${why}`
}

export function gapFailureSaid(one: GapGone, why: string): string {
  return `${one.page}: the gap \`${one.statement}\` did not go. ${why}`
}

export function deletingFinding(
  editor: Editor,
  say: (line: string) => undefined,
  call: Calling = callHarness
): (row?: FindingTreeRow) => Promise<undefined> {
  return async (row?: FindingTreeRow) => {
    const slug = findingGoneOf(row)
    if (slug === null) return undefined
    try {
      const said = await call(FINDING_SLUG, FINDING_EXPORT, [slug], {
        timeout: LANDING_TIMEOUT_MS,
      })
      say(`[delete finding] ${said.trim()}`)
    } catch (thrown) {
      const why = findingFailureSaid(slug, String(thrown))
      say(`[delete finding] ${why}`)
      void editor.window.showErrorMessage(`Findings: ${why}`)
    }
    return undefined
  }
}

export function deletingGap(
  editor: Editor,
  say: (line: string) => undefined,
  call: Calling = callHarness
): (row?: GapTreeRow) => Promise<undefined> {
  return async (row?: GapTreeRow) => {
    const one = gapGoneOf(row)
    if (one === null) return undefined
    try {
      const said = await call(GAP_SLUG, GAP_EXPORT, [one.page, one.statement], {
        timeout: LANDING_TIMEOUT_MS,
      })
      say(`[delete gap] ${said.trim()}`)
    } catch (thrown) {
      const why = gapFailureSaid(one, String(thrown))
      say(`[delete gap] ${why}`)
      void editor.window.showErrorMessage(`Gaps: ${why}`)
    }
    return undefined
  }
}
