import { expect, test } from "bun:test"
import { bindingFor, tokeningFor } from "./token-renaming.module.code.ts"

const ROOT = "/var/tmp/token-renaming-stands-nowhere"

const HELD = "akasha/held/held.module.code.ts"

const NAMER = "akasha/namer/namer.module.code.ts"

const SHADOW = "akasha/shadow/shadow.module.code.ts"

const KEPT = "akasha/kept/kept.module.code.ts"

const OWN = "akasha/own/own.module.code.ts"

const BOTH = "akasha/both/both.module.code.ts"

const TWICE = "akasha/twice/twice.module.code.ts"

const BODIES = new Map<string, string>([
  [TWICE, 'export function twice(): string {\n  const twice = "one"\n  return twice\n}\n'],
  [
    HELD,
    "export type Waking = (path: string) => boolean\n\nexport function waking(one: Waking): Waking {\n  return one\n}\n",
  ],
  [
    NAMER,
    'import type { Waking } from "../held/held.module.code.ts"\nimport { waking } from "../held/held.module.code.ts"\n\nconst one: Waking = (path) => path.endsWith(".ts")\n\nexport const two = waking(one)\n',
  ],
  [SHADOW, 'export function shadowed(): string {\n  const waking = "held"\n  return waking\n}\n'],
  [
    KEPT,
    'export type Kept = {\n  readonly wakesOn: string\n}\n\nexport const kept: Kept = { wakesOn: "yes" }\n',
  ],
  [
    OWN,
    'function stood(): string {\n  return "one"\n}\n\nexport function reaches(): string {\n  return stood()\n}\n',
  ],
  [
    BOTH,
    'export type Both = {\n  readonly split: string\n}\n\nexport function split(): string {\n  return "two"\n}\n',
  ],
])

const PATHS = [...BODIES.keys()]

function textOf(path: string): string | null {
  return BODIES.get(path) ?? null
}

function bound(at: string, from: string, to: string): ReturnType<typeof bindingFor> {
  const asked = tokeningFor(at, from, to)
  if ("refused" in asked) throw new Error(asked.refused)
  return bindingFor(ROOT, PATHS, asked.tokening, textOf)
}

test("a name that is already the one it would become is refused rather than worked out", () => {
  expect(tokeningFor(HELD, "waking", "waking")).toEqual({
    refused: "`waking` is already the name it would become, so there is nothing to rename",
  })
})

test("a spelling no body could carry as a name is refused", () => {
  expect(tokeningFor(HELD, "wa king", "input")).toEqual({
    refused: "`wa king` is no name a body carries",
  })
})

test("a name the named file does not carry is refused rather than answered as nothing to do", () => {
  expect(bound(HELD, "standsNowhere", "input")).toEqual({
    refused: `${HELD} carries no \`standsNowhere\``,
  })
})

test("a name the named file already carries is refused rather than shadowed", () => {
  expect(bound(HELD, "waking", "Waking")).toEqual({ refused: `${HELD} already carries \`Waking\`` })
})

test("a file carrying one spelling as a name and as a key is refused rather than guessed at", () => {
  const made = bound(BOTH, "split", "apart")
  expect(made).toEqual({
    refused: `${BOTH} carries \`split\` as a name and as a key, so which one to rename is unsaid`,
  })
})

test("a name is renamed where it is declared and wherever another file imports it", () => {
  const made = bound(HELD, "waking", "input")
  if ("refused" in made) throw new Error(made.refused)
  const namer = made.binding.changes.get(NAMER) ?? ""
  expect(made.binding.changes.get(HELD)).toContain("export function input(one: Waking): Waking")
  expect(namer).toContain('import { input } from "../held/held.module.code.ts"')
  expect(namer).toContain("export const two = input(one)")
})

test("a type standing beside the renamed name is left as it stands", () => {
  const made = bound(HELD, "waking", "input")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.binding.changes.get(HELD)).toContain("export type Waking = (path: string) => boolean")
})

test("a name standing for something else in its own scope is left as it stands", () => {
  const made = bound(HELD, "waking", "input")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.binding.changes.has(SHADOW)).toBe(false)
})

test("an answer names every line still spelling the name that was renamed", () => {
  const made = bound(HELD, "waking", "input")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.binding.still).toEqual([{ path: SHADOW, lines: [2, 3] }])
})

test("a name a file keeps to itself is renamed though nothing exports it", () => {
  const made = bound(OWN, "stood", "held")
  if ("refused" in made) throw new Error(made.refused)
  const own = made.binding.changes.get(OWN) ?? ""
  expect(own).toContain("function held(): string")
  expect(own).toContain("return held()")
})

test("a key a type declares is renamed where the type states it and where a body spells it", () => {
  const made = bound(KEPT, "wakesOn", "isInput")
  if ("refused" in made) throw new Error(made.refused)
  const kept = made.binding.changes.get(KEPT) ?? ""
  expect(kept).toContain("readonly isInput: string")
  expect(kept).toContain('export const kept: Kept = { isInput: "yes" }')
})

test("a name a file carries in more than one place is refused rather than guessed at", () => {
  expect(bound(TWICE, "twice", "once")).toEqual({
    refused: `${TWICE} carries \`twice\` in more than one place, so which one to rename is unsaid`,
  })
})
