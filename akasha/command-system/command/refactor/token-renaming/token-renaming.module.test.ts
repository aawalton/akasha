import { expect, test } from "bun:test"
import { bindingFor, tokeningFor } from "./token-renaming.module.code.ts"

const ROOT = "/var/tmp/token-renaming-stands-nowhere"

const HELD = "akasha/held/held.module.code.ts"

const NAMER = "akasha/namer/namer.module.code.ts"

const SHADOW = "akasha/shadow/shadow.module.code.ts"

const BODIES = new Map<string, string>([
  [
    HELD,
    "export type Waking = (path: string) => boolean\n\nexport function waking(one: Waking): Waking {\n  return one\n}\n",
  ],
  [
    NAMER,
    'import type { Waking } from "../held/held.module.code.ts"\nimport { waking } from "../held/held.module.code.ts"\n\nconst one: Waking = (path) => path.endsWith(".ts")\n\nexport const two = waking(one)\n',
  ],
  [SHADOW, 'export function shadowed(): string {\n  const waking = "held"\n  return waking\n}\n'],
])

const PATHS = [...BODIES.keys()]

function textOf(path: string): string | null {
  return BODIES.get(path) ?? null
}

function bound(from: string, to: string): ReturnType<typeof bindingFor> {
  const asked = tokeningFor(HELD, from, to)
  if ("refused" in asked) throw new Error(asked.refused)
  return bindingFor(ROOT, PATHS, asked.tokening, textOf)
}

test("a name that is already the one it would become is refused rather than worked out", () => {
  const asked = tokeningFor(HELD, "waking", "waking")
  expect(asked).toEqual({
    refused: "`waking` is already the name it would become, so there is nothing to rename",
  })
})

test("a spelling no body could carry as a name is refused", () => {
  const asked = tokeningFor(HELD, "wa king", "input")
  expect(asked).toEqual({ refused: "`wa king` is no name a body carries" })
})

test("a name the named file does not export is refused rather than answered as nothing to do", () => {
  expect(bound("standsNowhere", "input")).toEqual({
    refused: `${HELD} exports no \`standsNowhere\``,
  })
})

test("a name the named file already exports is refused rather than shadowed", () => {
  expect(bound("waking", "Waking")).toEqual({ refused: `${HELD} already exports \`Waking\`` })
})

test("a name is renamed where it is declared and wherever another file imports it", () => {
  const made = bound("waking", "input")
  if ("refused" in made) throw new Error(made.refused)
  const namer = made.binding.changes.get(NAMER) ?? ""
  expect(made.binding.changes.get(HELD)).toContain("export function input(one: Waking): Waking")
  expect(namer).toContain('import { input } from "../held/held.module.code.ts"')
  expect(namer).toContain("export const two = input(one)")
})

test("a type standing beside the renamed name is left as it stands", () => {
  const made = bound("waking", "input")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.binding.changes.get(HELD)).toContain("export type Waking = (path: string) => boolean")
})

test("a name standing for something else in its own scope is left as it stands", () => {
  const made = bound("waking", "input")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.binding.changes.has(SHADOW)).toBe(false)
})

test("an answer names every line still spelling the name that was renamed", () => {
  const made = bound("waking", "input")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.binding.still).toEqual([{ path: SHADOW, lines: [2, 3] }])
})
