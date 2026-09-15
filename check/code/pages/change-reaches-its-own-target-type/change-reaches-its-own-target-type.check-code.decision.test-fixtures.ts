import { readFileSync } from "node:fs"
import { join } from "node:path"
import { onDisk } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  founded,
  pathFor,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const PAGE = "page"

const CHANGE_KIND = "change"

const NUDGE = "nudge"

const SHOVE = "shove"

const KNOB_KIND = "shove-knob"

const GIZMO = "gizmo"

const TS = "ts"

const STEM = "01a09c40-0ec4-7000-8000-0000000000"

const PULL = "pull-knob"

const FLIP = "flip-lever"

const PLAIN = "plain-thing"

export const KNOB = "knob"

export const LEVER = "lever"

export const TAP = "tap-knob"

export const SPIN = "spin-lever"

export const AT = pathFor(KNOB_KIND, TAP)

export const CODE_AT = `akasha/${TAP}.${KNOB_KIND}.code.${TS}`

export const PLAIN_AT = pathFor(GIZMO, PLAIN)

export const SAME = `${KNOB_KIND}/${PULL}`

export const CROSS = `${NUDGE}/${SPIN}`

export const ALSO_CROSS = `${NUDGE}/${FLIP}`

export const NOWHERE = `${KNOB_KIND}/absent-knob`

const HEADER = 'import { reach, type World } from "akasha/held/reaching.module.code.ts"'

const OPENS = "export async function runChange(world: World): Promise<undefined> {"

const CLOSES = ["  return undefined", "}", ""]

function bodied(lines: readonly string[], said: readonly string[] = []): string {
  return [HEADER, "", ...said, OPENS, ...lines, ...CLOSES].join("\n")
}

export function reaching(said: readonly string[]): string {
  return bodied(said.map((one) => `  await reach(world, "${one}", {})`))
}

export const CONSTED = bodied(["  await reach(world, HELD, {})"], [`const HELD = "${CROSS}"`, ""])

const MADE = `\`${NUDGE}/\${picked()}\``

export const BUILT = bodied([`  await reach(world, ${MADE}, {})`])

export const CARRIED = [
  'import { carryingOver } from "akasha/held/carrying.module.code.ts"',
  "",
  `const HELD = "${CROSS}"`,
  "",
  OPENS,
  "  const carrier = carryingOver(world)",
  "  await carrier.reaching(HELD, {})",
  ...CLOSES,
].join("\n")

const PICKS = [
  "function addressFor(world: World): string {",
  "  return ADDRESSES[picked(world)]",
  "}",
  "",
]

export const TABLED = bodied(
  ["  await reach(world, addressFor(world), {})"],
  [
    `const HELD = "${SAME}"`,
    "",
    `const ADDRESSES = { one: "${CROSS}", two: HELD } as const`,
    "",
    ...PICKS,
  ]
)

export const BUILT_TABLE = bodied(
  ["  await reach(world, addressFor(world), {})"],
  [`const ADDRESSES = { one: ${MADE} } as const`, "", ...PICKS]
)

export const QUIET = "export const held = 1\n"

function staged(root: string, slug: string, kind: string, target: string, tail: string): undefined {
  const path = pathFor(kind, slug)
  const id = `${STEM}${tail}`
  const value = { id, type: kind, slug, changeTargetType: `target-kind/${target}`, code: TS }
  listedFiled(root, kind, slug, [{ path, id }])
  idFiled(root, id, [{ path, id }])
  valueAlsoFiled(root, kind, [{ path, value }])
}

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-own-target-type-")
  founded(root)
  typed(root, CHANGE_KIND, PAGE)
  typed(root, NUDGE, CHANGE_KIND)
  typed(root, SHOVE, CHANGE_KIND)
  typed(root, KNOB_KIND, SHOVE)
  typed(root, GIZMO, PAGE)
  staged(root, TAP, KNOB_KIND, KNOB, "01")
  staged(root, PULL, KNOB_KIND, KNOB, "02")
  staged(root, SPIN, NUDGE, LEVER, "03")
  staged(root, FLIP, NUDGE, LEVER, "04")
  staged(root, PLAIN, GIZMO, KNOB, "05")
  writing(root, CODE_AT, reaching([CROSS]))
  return root
}

export function pageBodyIn(root: string): string {
  return readFileSync(join(root, AT), "utf8")
}

export function over(root: string, bodies: Readonly<Record<string, string | null>>): Change {
  const disk = onDisk(root)
  const at = (path: string): Uint8Array | null => {
    if (!(path in bodies)) return disk(path)
    const said = bodies[path]
    return said === undefined || said === null ? null : bytesOf(said)
  }
  return { root, changed: Object.keys(bodies), before: disk, after: at }
}
