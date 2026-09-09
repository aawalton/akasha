import { textOf } from "@akasha/code/body-text"
import type { Change } from "@akasha/pages/change"
import { besideAt, partedIn } from "@akasha/pages/page-file-name"
import { textAt } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"
import { shadowFor } from "@akasha/pages/shadow"
import type {
  Adding,
  Replacing,
} from "../../../changes/modules/answer/change-answer.module.types.ts"

const STYLESHEET = "stylesheet"

const TOKEN_VALUES = "token-values"

const STYLES = "styles"

const IOS_COMPONENT = "ios-component"

const SPACING = "spacing"

const SWIFT = "swift"

const PX_PER_REM = 16

export type Step = {
  readonly name: string
  readonly px: number
}

export type Stepped = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

const NOTHING_STEPPED: Stepped = { edits: [], said: [] }

const STEP_RE = /--(spacing-[\w-]+)\s*:\s*([0-9.]+)rem\s*;/g

export function stepsIn(css: string): readonly Step[] {
  const found: Step[] = []
  for (const one of css.matchAll(STEP_RE)) {
    const named = one[1]
    const said = one[2]
    if (named === undefined || said === undefined) continue
    found.push({ name: named.toUpperCase().replaceAll("-", "_"), px: Number(said) * PX_PER_REM })
  }
  return found
}

export function bodyFor(steps: readonly Step[]): string {
  const said = steps.map((one) => `\nlet ${one.name}: CGFloat = ${one.px}\n`)
  return `import CoreGraphics\n${said.join("")}`
}

function besideOf(
  shadow: Shadow,
  pageTypeSlug: string,
  slug: string,
  propertySlug: string
): string {
  const named = shadow.index.listedAt(pageTypeSlug, slug)[0]
  if (named === undefined) {
    throw new Error(
      `the index files no \`${pageTypeSlug}/${slug}\`, so its ${propertySlug} is unreachable`
    )
  }
  const value = shadow.index.pageByPath(named.path)
  const held = value === null ? null : textAt(value, propertySlug)
  const beside = held === null ? null : besideAt(named.path, propertySlug, held)
  if (beside === null) throw new Error(`${named.path} states no ${propertySlug} file beside it`)
  return beside
}

export function steppedOver(change: Change, shadow: Shadow): Stepped {
  const readFrom = besideOf(shadow, STYLESHEET, TOKEN_VALUES, STYLES)
  const writtenAt = besideOf(shadow, IOS_COMPONENT, SPACING, SWIFT)
  const css = textOf(change.after(readFrom))
  if (css === null) return NOTHING_STEPPED
  const steps = stepsIn(css)
  if (steps.length === 0) return NOTHING_STEPPED
  const body = bodyFor(steps)
  const was = textOf(change.after(writtenAt))
  if (was === body) return NOTHING_STEPPED
  return {
    edits: [
      was === null
        ? { kind: "add", path: writtenAt, content: body }
        : { kind: "replace", path: writtenAt, contentFrom: was, contentTo: body },
    ],
    said: [
      `\`${writtenAt}\` was written again from the ${steps.length} spacing steps \`${readFrom}\` states`,
    ],
  }
}

function couldTurn(change: Change): boolean {
  for (const path of change.changed) {
    const said = partedIn(path)
    if (said === null) continue
    if (said.pageType === STYLESHEET && said.slug === TOKEN_VALUES) return true
    if (said.pageType === IOS_COMPONENT && said.slug === SPACING) return true
  }
  return false
}

export function steppedFor(change: Change): Stepped {
  try {
    if (!couldTurn(change)) return NOTHING_STEPPED
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING_STEPPED
    return steppedOver(change, cast.shadow)
  } catch (thrown) {
    return {
      edits: [],
      said: [
        `no spacing step was written again — ${thrown instanceof Error ? thrown.message : String(thrown)}`,
      ],
    }
  }
}
