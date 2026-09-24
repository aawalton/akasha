import { basename } from "node:path"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { z } from "zod"

const SECTION = "referenced-by"

const HOLDS = "jsonl"

const ENDING = `.${SECTION}.${HOLDS}`

export const IMPORT = "import"

export type Reference = {
  readonly propertySlug: string
  readonly fileName: string | null
  readonly path: string
  readonly id: string | null
}

export function referencesAt(pagePath: string): string | null {
  return besideAt(pagePath, SECTION, HOLDS)
}

export function referencesFiled(path: string): boolean {
  return path.endsWith(ENDING)
}

export function fileNameOf(path: string): string {
  return basename(path)
}

const REFERENCE_LINE = z.object({
  propertySlug: z.string(),
  fileName: z.string().optional().catch(undefined),
  path: z.string(),
  id: z.string().optional().catch(undefined),
})

export function referenceIn(line: string): Reference | null {
  let said: ReturnType<typeof REFERENCE_LINE.safeParse>
  try {
    said = REFERENCE_LINE.safeParse(JSON.parse(line))
  } catch {
    return null
  }
  if (!said.success) return null
  const held = said.data
  return {
    propertySlug: held.propertySlug,
    fileName: held.fileName ?? null,
    path: held.path,
    id: held.id ?? null,
  }
}

export function referencesEach(lines: Iterable<string>): readonly Reference[] {
  const found: Reference[] = []
  for (const line of lines) {
    const one = referenceIn(line)
    if (one !== null) found.push(one)
  }
  return found
}

export function lineOf(one: Reference): string {
  const said: Record<string, string> = { propertySlug: one.propertySlug }
  if (one.fileName !== null) said.fileName = one.fileName
  said.path = one.path
  if (one.id !== null) said.id = one.id
  return JSON.stringify(said)
}
