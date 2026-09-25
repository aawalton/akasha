import type { Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { SandboxLibrary } from "akasha/temper/addon/build/deploy-check/modules/sandbox-library-reading/sandbox-library-reading.module.code.ts"
import { z } from "zod"

const TABLE_AT =
  "temper/addon/build/deploy-check/modules/sandbox-library/sandbox-library.data-table.data.json"

const MANIFEST_AT =
  "temper/addon/build/deploy-check/modules/eso-sandbox-manifest/eso-sandbox-manifest.module.code.ts"

const ABSENT = "nil"

const LIBRARY = "table"

const WIDTH = 100

const SANDBOX_LIBRARY_SCHEMA = z.object({
  apiVersion: z.number(),
  globals: z.record(z.string(), z.string()),
  libraries: z.record(z.string(), z.string()),
  members: z.record(z.string(), z.array(z.string())),
})

export type Written = {
  readonly edits: readonly Replacing[]
  readonly said: readonly string[]
}

const NOTHING: Written = { edits: [], said: [] }

function listText(name: string, names: readonly string[]): string {
  const quoted = names.map((one) => JSON.stringify(one))
  const line = `export const ${name} = [${quoted.join(", ")}] as const`
  if (line.length <= WIDTH) return `${line}\n`
  return `export const ${name} = [\n${quoted.map((one) => `  ${one},\n`).join("")}] as const\n`
}

function namesWhere(
  types: Readonly<Record<string, string>>,
  holds: (type: string) => boolean
): string[] {
  return Object.keys(types)
    .filter((name) => holds(types[name] ?? ABSENT))
    .sort()
}

export function manifestText(library: SandboxLibrary): string {
  const kept = namesWhere(library.libraries, (type) => type === LIBRARY)
  return [
    listText(
      "ESO_STRIPPED_GLOBALS",
      namesWhere(library.globals, (type) => type === ABSENT)
    ),
    listText(
      "ESO_WHOLLY_STRIPPED_NAMESPACES",
      namesWhere(library.libraries, (type) => type !== LIBRARY)
    ),
    ...kept.map((name) =>
      listText(`ESO_AVAILABLE_${name.toUpperCase()}`, [...(library.members[name] ?? [])].sort())
    ),
  ].join("\n")
}

export function couldTurn(change: Change): boolean {
  return change.changed.some((path) => path === TABLE_AT || path === MANIFEST_AT)
}

export function writtenOver(change: Change): Written {
  const table = textOf(change.after(TABLE_AT))
  if (table === null) return NOTHING
  const was = textOf(change.after(MANIFEST_AT))
  if (was === null) {
    return { edits: [], said: [`no manifest is at \`${MANIFEST_AT}\`, so none was written`] }
  }
  const text = manifestText(SANDBOX_LIBRARY_SCHEMA.parse(JSON.parse(table)))
  if (was === text) return NOTHING
  return {
    edits: [{ kind: "replace", path: MANIFEST_AT, contentFrom: was, contentTo: text }],
    said: [`\`${MANIFEST_AT}\` was written again from the game's sandbox capture`],
  }
}

export function generateChange(change: Change): Written {
  try {
    if (!couldTurn(change)) return NOTHING
    return writtenOver(change)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { edits: [], said: [`no sandbox manifest was written — ${why}`] }
  }
}
