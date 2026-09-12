import { widest } from "akasha/commands/modules/namespace-listing/namespace-listing.module.code.ts"
import type { HelpNotes } from "akasha/commands/properties/help-notes.text-property.types.ts"
import type { Taking } from "akasha/commands/properties/taking.record-property.types.ts"

const TAKING = "taking"

const HELP_NOTES = "helpNotes"

export type Surface = {
  readonly taking: Taking
  readonly helpNotes: HelpNotes
}

export function surfaceOf(page: Record<string, unknown> | null): Surface | null {
  if (page === null) return null
  const taking = page[TAKING]
  const helpNotes = page[HELP_NOTES]
  if (!Array.isArray(taking) && !Array.isArray(helpNotes)) return null
  return {
    taking: (Array.isArray(taking) ? taking : []) as Taking,
    helpNotes: (Array.isArray(helpNotes) ? helpNotes : []) as HelpNotes,
  }
}

export function helpOf(
  calledAs: string,
  definition: string | null,
  surface: Surface
): readonly string[] {
  const wide = widest(surface.taking.map((one) => one.said))
  const report = [definition === null ? calledAs : `${calledAs} — ${definition}`, ""]
  for (const one of surface.taking) report.push(`  ${one.said.padEnd(wide)}  ${one.takes}`)
  if (surface.helpNotes.length > 0) report.push("", ...surface.helpNotes)
  return report
}
