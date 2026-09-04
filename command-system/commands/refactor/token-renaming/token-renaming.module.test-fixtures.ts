import { bindingFor, tokeningFor } from "./token-renaming.module.code.ts"

export const HELD = "akasha/held/held.module.code.ts"

export const NAMER = "akasha/namer/namer.module.code.ts"

export const SHADOW = "akasha/shadow/shadow.module.code.ts"

export const KEPT = "akasha/kept/kept.module.code.ts"

export const OWN = "akasha/own/own.module.code.ts"

export const BOTH = "akasha/both/both.module.code.ts"

export const TWICE = "akasha/twice/twice.module.code.ts"

export const PAIRED = "akasha/paired/paired.module.code.ts"

export const WELDED = "akasha/welded/welded.module.code.ts"

export const PLAIN = "akasha/plain/plain.module.code.ts"

export const FILLED = "akasha/filled/filled.module.code.ts"

export const UNWELDED = "akasha/unwelded/unwelded.module.code.ts"

const PAIRED_BODY =
  "export function first(): string {\n" +
  '  const kept = "one"\n' +
  "  return kept\n" +
  "}\n" +
  "\n" +
  "export function second(): string {\n" +
  '  const kept = "two"\n' +
  "  return kept\n" +
  "}\n"

const WELDED_BODY =
  "export type Read = { readonly keyed: readonly string[] } | { readonly refused: string }\n" +
  "\n" +
  "export function everyOne(said: readonly string[]): Read {\n" +
  "  const keyed: string[] = []\n" +
  "  for (const at of said) keyed.push(at)\n" +
  "  return { keyed }\n" +
  "}\n"

const PLAIN_BODY =
  "export type Plainly = { readonly keyed: readonly string[] }\n" +
  "\n" +
  "export function everyThree(said: readonly string[]): Plainly {\n" +
  "  const keyed = [...said]\n" +
  "  return { keyed }\n" +
  "}\n"

const FILLED_BODY =
  "export type Filled = { readonly keyed: readonly string[] } | { readonly refused: string }\n" +
  "\n" +
  "export function everyFour(said: readonly string[]): Filled {\n" +
  "  const keyed = [...said]\n" +
  "  return { keyed }\n" +
  "}\n" +
  "\n" +
  "export function oneFour(said: string): Filled {\n" +
  "  return { keyed: [said] }\n" +
  "}\n"

const UNWELDED_BODY =
  "export type Written = { readonly keyed: readonly string[] }\n" +
  "\n" +
  "export function everyTwo(said: readonly string[]): Written {\n" +
  "  const keyed = [...said]\n" +
  "  return { keyed }\n" +
  "}\n" +
  "\n" +
  "export const loose = { keyed: 1 }\n"

export const BODIES = new Map<string, string>([
  [TWICE, 'export function twice(): string {\n  const twice = "one"\n  return twice\n}\n'],
  [PAIRED, PAIRED_BODY],
  [WELDED, WELDED_BODY],
  [PLAIN, PLAIN_BODY],
  [FILLED, FILLED_BODY],
  [UNWELDED, UNWELDED_BODY],
  [
    HELD,
    "export type Marking = (path: string) => boolean\n\nexport function marking(one: Marking): Marking {\n  return one\n}\n",
  ],
  [
    NAMER,
    'import type { Marking } from "../held/held.module.code.ts"\nimport { marking } from "../held/held.module.code.ts"\n\nconst one: Marking = (path) => path.endsWith(".ts")\n\nexport const two = marking(one)\n',
  ],
  [SHADOW, 'export function shadowed(): string {\n  const marking = "held"\n  return marking\n}\n'],
  [
    KEPT,
    'export type Kept = {\n  readonly marksOn: string\n}\n\nexport const kept: Kept = { marksOn: "yes" }\n',
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

export const ROOT = "/var/tmp/token-renaming-stands-nowhere"

export const PATHS = [...BODIES.keys()]

export function textOf(path: string): string | null {
  return BODIES.get(path) ?? null
}

export function over(
  at: string,
  from: string,
  to: string,
  typed: readonly string[]
): ReturnType<typeof bindingFor> {
  const asked = tokeningFor(at, from, to)
  if ("refused" in asked) throw new Error(asked.refused)
  return bindingFor(ROOT, { typed, every: PATHS }, asked.tokening, textOf)
}

export function bound(at: string, from: string, to: string): ReturnType<typeof bindingFor> {
  return over(at, from, to, PATHS)
}

export function lined(
  at: string,
  from: string,
  to: string,
  line: string
): ReturnType<typeof bindingFor> {
  const asked = tokeningFor(at, from, to, line)
  if ("refused" in asked) throw new Error(asked.refused)
  return bindingFor(ROOT, { typed: PATHS, every: PATHS }, asked.tokening, textOf)
}

export function changed(made: ReturnType<typeof bindingFor>, at: string): string {
  if ("refused" in made) throw new Error(made.refused)
  return made.binding.changes.get(at) ?? ""
}
