import {
  COMPUTED,
  fieldsOf,
  fieldsReading,
  fittingIn,
  formatOf,
  groupedFor,
  noMemberIn,
  noRecordIn,
  offFormat,
  overLength,
  recordFieldsIn,
  type Shaping,
  twiceIn,
} from "akasha/checks/code-checks/pages/page-matches-its-type/modules/entry-reasons/entry-reasons.module.code.ts"
import { refusalText } from "akasha/checks/modules/refusal-text/refusal-text.module.code.ts"
import type { Formatting } from "akasha/pages/name-formats/modules/format-reaching/format-reaching.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import type { Carried } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { numberAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const NOTHING: ReadonlySet<string> = new Set()

export function computedKey(key: string, on: string): string {
  return refusalText("page-key-computed", { key, on })
}

export function reasonsIn(
  value: Value,
  declared: readonly Carried[],
  shadow: Shadow,
  named: string,
  formatting: Formatting,
  excused: ReadonlySet<string>
): readonly string[] {
  const said: string[] = []
  const byKey = new Map(declared.map((one): readonly [string, Carried] => [one.key, one]))
  const pageFor = (one: Carried): Value | null =>
    shadow.index.pageAt(one.pageTypeSlug, one.pagePropertySlug)
  const fieldsIn = fieldsReading(shadow, pageFor)
  for (const one of declared) {
    if (!one.required || one.uncommitted || one.secret || one.fixed !== undefined) continue
    if (one.pageTypeSlug === COMPUTED) continue
    if (excused.has(one.pagePropertySlug)) continue
    if (!(one.key in value)) {
      said.push(`does not state \`${one.pagePropertySlug}\`, which \`${named}\` requires`)
    }
  }
  for (const [key, held] of Object.entries(value)) {
    const one = byKey.get(key)
    if (one === undefined) {
      said.push(`states \`${key}\`, which \`${named}\` does not declare`)
      continue
    }
    const slug = one.pagePropertySlug
    if (one.uncommitted) {
      said.push(
        `states \`${slug}\`, which \`${named}\` declares uncommitted, and such a value stands beside the page rather than in it`
      )
      continue
    }
    if (one.secret) {
      said.push(
        `states \`${slug}\`, which \`${named}\` declares secret, and such a value stands in the page's sops file rather than in it`
      )
      continue
    }
    if (one.fixed !== undefined) {
      said.push(
        `states \`${slug}\`, which \`${named}\` fixes as \`${one.fixed}\`, and a fixed value is on no page`
      )
      continue
    }
    if (one.pageTypeSlug === COMPUTED) {
      said.push(computedKey(slug, named))
      continue
    }
    const listed = Array.isArray(held)
    if (one.many && !listed)
      said.push(`states \`${slug}\` singly, and \`${named}\` declares it many`)
    if (!one.many && listed)
      said.push(`states \`${slug}\` as a list, and \`${named}\` declares it single`)
    if (one.many && listed && one.maxCount !== null && held.length > one.maxCount) {
      said.push(`holds ${held.length} of \`${slug}\`, over the count of ${one.maxCount}`)
    }
    if (one.many && listed) {
      const twice = twiceIn(held, slug)
      if (twice !== null) said.push(twice)
    }
    const page = pageFor(one)
    if (page === null) continue
    const max = one.maxLength ?? numberAt(page, "maxLength")
    const format = formatOf(page)
    for (const each of listed ? held : [held]) {
      const why = overLength(each, max, slug, "")
      if (why !== null) said.push(why)
      const off = offFormat(each, format, formatting, slug)
      if (off !== null) said.push(off)
    }
    const opened = recordFieldsIn(one, fieldsIn)
    const among = opened.among.length > 0
    const shaped = opened.fields.size > 0 ? opened.fields : groupedFor(one, held, shadow)
    if (shaped.size === 0 && !among) continue
    for (const entry of listed ? held : [held]) {
      if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
        if ((opened.fields.size > 0 || among) && !opened.plain) said.push(noRecordIn(entry, slug))
        continue
      }
      const fields = fittingIn(opened, shaped, entry as Value)
      if (fields === null) {
        said.push(noMemberIn(slug))
        continue
      }
      const shaping: Shaping = { fields, slug, pageFor, formatting, fieldsIn }
      said.push(...fieldsOf(entry as Value, shaping, NOTHING))
    }
  }
  return said
}
