import type { Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  recordsIn,
  slugAt,
  textAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const STYLESHEET = "stylesheet"

const COLOR = "color"

const STYLES = "styles"

const COLORS = "colors"

const NAME = "name"

const HEX = "hex"

const LIGHT_HEX = "lightHex"

const PAGE = "ts"

const LIGHT_RULE = /\[data-scheme="light"\][^{]*\{[^}]*\}/

export type Hued = {
  readonly name: string
  readonly color: string
  readonly hex: string | null
  readonly lightHex?: string | null
}

type Parted = {
  readonly before: string
  readonly light: string | null
  readonly after: string
}

type Written = {
  readonly body: string
  readonly said: readonly string[]
}

type Colored = {
  readonly edits: readonly Replacing[]
  readonly said: readonly string[]
}

const NOTHING_COLORED: Colored = { edits: [], said: [] }

function declaredIn(name: string): RegExp {
  return new RegExp(`^(\\s*--${name}\\s*:\\s*)([^;]*)(;)`, "m")
}

function writtenOnce(rules: string, name: string, hex: string): string | null {
  const found = declaredIn(name)
  if (!found.test(rules)) return null
  return rules.replace(
    found,
    (_whole, opened: string, _was: string, shut: string) => `${opened}${hex}${shut}`
  )
}

function partedAt(css: string): Parted {
  const found = LIGHT_RULE.exec(css)
  if (found === null) return { before: css, light: null, after: "" }
  const end = found.index + found[0].length
  return { before: css.slice(0, found.index), light: found[0], after: css.slice(end) }
}

export function writtenInto(css: string, hued: readonly Hued[], at: string): Written {
  const parted = partedAt(css)
  let before = parted.before
  let light = parted.light
  let after = parted.after
  const said: string[] = []
  for (const one of hued) {
    if (one.hex === null) {
      said.push(
        `\`--${one.name}\` in \`${at}\` is left as it is — \`color/${one.color}\` states no hex`
      )
      continue
    }
    const inBefore = writtenOnce(before, one.name, one.hex)
    const inAfter = inBefore === null ? writtenOnce(after, one.name, one.hex) : null
    if (inBefore !== null) before = inBefore
    else if (inAfter !== null) after = inAfter
    else
      said.push(
        `\`${at}\` declares no \`--${one.name}\`, so \`color/${one.color}\` is written nowhere`
      )
    if (light === null || one.lightHex === null || one.lightHex === undefined) continue
    const inLight = writtenOnce(light, one.name, one.lightHex)
    if (inLight !== null) light = inLight
    else
      said.push(
        `the light rule in \`${at}\` declares no \`--${one.name}\`, so the light hex of \`color/${one.color}\` is written nowhere`
      )
  }
  return { body: `${before}${light ?? ""}${after}`, said }
}

function huedIn(shadow: Shadow, stated: unknown): readonly Hued[] {
  const found: Hued[] = []
  for (const one of recordsIn(stated)) {
    const name = textAt(one, NAME)
    const color = slugAt(one, COLOR)
    if (name === null || color === null) continue
    const page = shadow.index.pageAt(COLOR, color)
    found.push({
      name,
      color,
      hex: page === null ? null : textAt(page, HEX),
      lightHex: page === null ? null : textAt(page, LIGHT_HEX),
    })
  }
  return found
}

function coloredAt(change: Change, shadow: Shadow, path: string): Colored {
  const value = shadow.pageOf(path)
  if (value === null) return NOTHING_COLORED
  const hued = huedIn(shadow, value[COLORS])
  if (hued.length === 0) return NOTHING_COLORED
  const held = textAt(value, STYLES)
  const at = held === null ? null : besideAt(path, STYLES, held)
  if (at === null) return { edits: [], said: [`${path} states no ${STYLES} file beside it`] }
  const was = textOf(change.after(at))
  if (was === null) return { edits: [], said: [`\`${at}\` holds no rules, so no color is written`] }
  const written = writtenInto(was, hued, at)
  if (written.body === was) return { edits: [], said: written.said }
  return {
    edits: [{ kind: "replace", path: at, contentFrom: was, contentTo: written.body }],
    said: [...written.said, `\`${at}\` was written again from the color pages its page names`],
  }
}

function coloredOver(change: Change, shadow: Shadow): Colored {
  const edits: Replacing[] = []
  const said: string[] = []
  for (const one of shadow.index.everyOfType(STYLESHEET)) {
    const got = coloredAt(change, shadow, one.path)
    edits.push(...got.edits)
    said.push(...got.said)
  }
  return { edits, said }
}

function couldTurn(change: Change): boolean {
  for (const path of change.changed) {
    const said = partedIn(path)
    if (said === null) continue
    if (said.pageType === COLOR && said.held === PAGE && said.sections.length === 0) return true
    if (said.pageType !== STYLESHEET) continue
    if (said.sections.length === 0 || said.sections[0] === STYLES) return true
  }
  return false
}

export function generateChange(change: Change): Colored {
  try {
    if (!couldTurn(change)) return NOTHING_COLORED
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING_COLORED
    return coloredOver(change, cast.shadow)
  } catch (thrown) {
    return {
      edits: [],
      said: [`no color was written — ${thrown instanceof Error ? thrown.message : String(thrown)}`],
    }
  }
}
