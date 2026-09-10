import type { Adding } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { typedAs } from "../../export-name/page-export-name.module.code.ts"
import { besideAt } from "../../file-name/page-file-name.module.code.ts"
import type { Shadow } from "../../shadow/shadow.module.code.ts"

const PAGE_PROPERTY = "page-property"

const SECTION = "types"

const HOLDS = "ts"

const SLUG = "slug"

const HELD = new Map<string, string>([
  ["boolean-property", "boolean"],
  ["build-folder-property", "true"],
  ["calendar-date-property", "string"],
  ["calendar-time-property", "string"],
  ["email-address-property", "string"],
  ["instant-property", "string"],
  ["page-property-entry", '"jsonl"'],
  ["phone-number-property", "string"],
  ["process-property", "string"],
  ["url-property", "string"],
])

export function typesAtOf(path: string): string | null {
  return besideAt(path, SECTION, HOLDS)
}

export function bodyFor(slug: string, held: string): string {
  return `export type ${typedAs(slug)} = ${held}\n`
}

export function generateTypes(_root: string, shadow: Shadow): readonly Adding[] {
  const written: Adding[] = []
  for (const kind of shadow.index.kindsUnder(PAGE_PROPERTY)) {
    const held = HELD.get(kind)
    if (held === undefined) continue
    for (const listed of shadow.index.everyOfType(kind)) {
      const value = shadow.pageOf(listed.path)
      if (value === null || value[SECTION] !== HOLDS) continue
      const slug = value[SLUG]
      if (typeof slug !== "string") continue
      const at = typesAtOf(listed.path)
      if (at === null) continue
      written.push({ kind: "add", path: at, content: bodyFor(slug, held) })
    }
  }
  return written
}
