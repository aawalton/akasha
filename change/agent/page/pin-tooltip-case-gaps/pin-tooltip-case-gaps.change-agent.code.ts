import {
  type Answer,
  type FileChange,
  missing,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  type CaseListed,
  everyTooltipCase,
  inNameOrder,
  type TooltipCase,
  tooltipCaseShape,
  tooltipCaseText,
} from "akasha/temper/player/character/stat/modules/tooltip-case/tooltip-case.module.code.ts"
import { verifiedTooltips } from "akasha/temper/player/character/stat/temper-tooltip-case/properties/verified-tooltips.file-property.ts"
import { temperTooltipCase } from "akasha/temper/player/character/stat/temper-tooltip-case/temper-tooltip-case.page-type.ts"

const FORMULA = "formula"

const CASES = "cases"

type Asked = Readonly<Record<string, string>>

type Held = { readonly at: string; readonly text: string; readonly tooltipCase: TooltipCase }

function heldAt(world: World, pageAt: string, slug: string): Held | string {
  const at = besideAt(pageAt, verifiedTooltips.propertySlug, "json")
  const text = at === null ? null : world.textOf(at)
  if (at === null || text === null) return `\`${slug}\` holds no verified tooltips`
  const parsed = tooltipCaseShape.safeParse(JSON.parse(text))
  if (!parsed.success) return `the verified tooltips of \`${slug}\` do not read`
  if (tooltipCaseText(parsed.data) !== text) {
    return `the verified tooltips of \`${slug}\` are not written as a case is written`
  }
  return { at, text, tooltipCase: parsed.data }
}

function movedIn(held: Held, formula: string): FileChange {
  const { tooltipCase } = held
  const game = tooltipCase.gaps[formula] ?? 0
  const gaps = Object.fromEntries(
    Object.entries(tooltipCase.gaps).filter(([one]) => one !== formula)
  )
  const pinned = inNameOrder({ ...tooltipCase.pinned, [formula]: game })
  return {
    kind: "replace",
    path: held.at,
    contentFrom: held.text,
    contentTo: tooltipCaseText({ ...tooltipCase, pinned, gaps }),
  }
}

export function pinTooltipCaseGapsCommand(
  world: World,
  given: Asked,
  listed: (root: string) => readonly CaseListed[] = everyTooltipCase
): Answer {
  const formula = given[FORMULA]?.trim()
  if (formula === undefined || formula === "") return refusing(missing(FORMULA))
  const named = given[CASES]
  const edits: FileChange[] = []
  if (named === undefined) {
    for (const { path: pageAt, slug } of listed(world.root)) {
      const held = heldAt(world, pageAt, slug)
      if (typeof held === "string") return refusing(held)
      if (held.tooltipCase.gaps[formula] !== undefined) edits.push(movedIn(held, formula))
    }
    if (edits.length === 0) return refusing(`no tooltip case keeps a gap for \`${formula}\``)
    return stating(edits)
  }
  const slugs = named
    .split("\n")
    .map((one) => one.trim())
    .filter((one) => one !== "")
  if (slugs.length === 0) return refusing(`\`${CASES}\` names no case`)
  for (const slug of slugs) {
    const pageAt = world.index.listedAt(temperTooltipCase.slug, slug)[0]?.path
    if (pageAt === undefined) return refusing(`\`${slug}\` names no tooltip case`)
    const held = heldAt(world, pageAt, slug)
    if (typeof held === "string") return refusing(held)
    if (held.tooltipCase.gaps[formula] === undefined) {
      return refusing(`\`${slug}\` keeps no gap for \`${formula}\``)
    }
    edits.push(movedIn(held, formula))
  }
  return stating(edits)
}

export const takes: readonly string[] = [FORMULA, CASES]

export function runChange(world: World, given: Asked): Promise<Answer> {
  return Promise.resolve(pinTooltipCaseGapsCommand(world, given))
}
