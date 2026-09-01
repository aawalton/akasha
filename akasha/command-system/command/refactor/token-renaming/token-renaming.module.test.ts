import { expect, test } from "bun:test"
import { bindingFor, tokeningFor } from "./token-renaming.module.code.ts"
import {
  BODIES,
  BOTH,
  bound,
  changed,
  FILLED,
  HELD,
  KEPT,
  lined,
  NAMER,
  OWN,
  over,
  PAIRED,
  PLAIN,
  ROOT,
  SHADOW,
  TWICE,
  UNWELDED,
  WELDED,
} from "./token-renaming.module.test-fixtures.ts"

test("a key a union fills is renamed with the name a shorthand welds it to", () => {
  const filled = changed(bound(FILLED, "keyed", "services"), FILLED)

  expect(filled).toContain("readonly services: readonly string[]")
  expect(filled).toContain("const services = [...said]")
  expect(filled).toContain("return { services }")
  expect(filled).toContain("return { services: [said] }")
  expect(filled).not.toContain("keyed")
})

test("a key spelled where the checker resolves it to nothing welds nothing", () => {
  expect(bound(UNWELDED, "keyed", "services")).toEqual({
    refused:
      `${UNWELDED} carries \`keyed\` as a name and as a key, ` + "so which one to rename is unsaid",
  })
})

test("a key and a name one shorthand welds together are renamed as one", () => {
  const welded = changed(bound(WELDED, "keyed", "services"), WELDED)

  expect(welded).toContain("readonly services: readonly string[]")
  expect(welded).toContain("const services: string[] = []")
  expect(welded).toContain("services.push(at)")
  expect(welded).toContain("return { services }")
  expect(welded).not.toContain("keyed")
})

test("a shorthand a welded rename carries is left as the one name", () => {
  const plain = changed(bound(PLAIN, "keyed", "services"), PLAIN)

  expect(plain).toContain("readonly services: readonly string[]")
  expect(plain).toContain("return { services }")
  expect(plain).not.toContain("services: services")
})

test("a welded rename takes the line either declaration starts on", () => {
  const key = changed(lined(WELDED, "keyed", "services", "1"), WELDED)

  expect(key).toBe(changed(lined(WELDED, "keyed", "services", "4"), WELDED))
  expect(key).toContain("return { services }")
})

test("a line no welded declaration starts on is refused rather than renaming nothing", () => {
  expect(lined(WELDED, "keyed", "services", "3")).toEqual({
    refused: `${WELDED} declares no \`keyed\` on line 3 — say --line with 1 or 4`,
  })
})

test("one key written out anywhere in the file welds nothing, so the rename is refused", () => {
  expect(bound(UNWELDED, "keyed", "services")).toEqual({
    refused:
      `${UNWELDED} carries \`keyed\` as a name and as a key, ` + "so which one to rename is unsaid",
  })
})

test("a name that is already the one it would become is refused rather than worked out", () => {
  expect(tokeningFor(HELD, "marking", "marking")).toEqual({
    refused: "`marking` is already the name it would become, so there is nothing to rename",
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
  expect(bound(HELD, "marking", "Marking")).toEqual({
    refused: `${HELD} already carries \`Marking\``,
  })
})

test("a file carrying one spelling as a name and as a key is refused rather than guessed at", () => {
  const made = bound(BOTH, "split", "apart")
  expect(made).toEqual({
    refused: `${BOTH} carries \`split\` as a name and as a key, so which one to rename is unsaid`,
  })
})

test("a name is renamed where it is declared and wherever another file imports it", () => {
  const made = bound(HELD, "marking", "input")
  if ("refused" in made) throw new Error(made.refused)
  const namer = made.binding.changes.get(NAMER) ?? ""
  expect(made.binding.changes.get(HELD)).toContain("export function input(one: Marking): Marking")
  expect(namer).toContain('import { input } from "../held/held.module.code.ts"')
  expect(namer).toContain("export const two = input(one)")
})

test("a type standing beside the renamed name is left as it stands", () => {
  const made = bound(HELD, "marking", "input")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.binding.changes.get(HELD)).toContain(
    "export type Marking = (path: string) => boolean"
  )
})

test("a name standing for something else in its own scope is left as it stands", () => {
  const made = bound(HELD, "marking", "input")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.binding.changes.has(SHADOW)).toBe(false)
})

test("an answer names every line still spelling the name that was renamed", () => {
  const made = bound(HELD, "marking", "input")
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
  const made = bound(KEPT, "marksOn", "isInput")
  if ("refused" in made) throw new Error(made.refused)
  const kept = made.binding.changes.get(KEPT) ?? ""
  expect(kept).toContain("readonly isInput: string")
  expect(kept).toContain('export const kept: Kept = { isInput: "yes" }')
})

test("a name a file carries in more than one place and no line names is refused", () => {
  expect(bound(TWICE, "twice", "once")).toEqual({
    refused:
      `${TWICE} carries \`twice\` in more than one place, so which one to rename is unsaid — ` +
      "say --line with 1 or 2",
  })
})

test("a refusal for a name carried in more than one place names each line to say", () => {
  const made = bound(PAIRED, "kept", "only")
  expect("refused" in made && made.refused).toContain("say --line with 2 or 7")
})

test("the first of two declarations carrying one name is renamed where the line names it", () => {
  expect(changed(lined(PAIRED, "kept", "only", "2"), PAIRED)).toBe(
    "export function first(): string {\n" +
      '  const only = "one"\n' +
      "  return only\n" +
      "}\n" +
      "\n" +
      "export function second(): string {\n" +
      '  const kept = "two"\n' +
      "  return kept\n" +
      "}\n"
  )
})

test("the second of two declarations carrying one name is renamed where the line names it", () => {
  expect(changed(lined(PAIRED, "kept", "only", "7"), PAIRED)).toBe(
    "export function first(): string {\n" +
      '  const kept = "one"\n' +
      "  return kept\n" +
      "}\n" +
      "\n" +
      "export function second(): string {\n" +
      '  const only = "two"\n' +
      "  return only\n" +
      "}\n"
  )
})

test("a declaration the line does not name changes no file of its own", () => {
  const made = lined(PAIRED, "kept", "only", "2")
  if ("refused" in made) throw new Error(made.refused)
  expect([...made.binding.changes.keys()]).toEqual([PAIRED])
})

test("a line no declaration of the name starts on is refused rather than renaming nothing", () => {
  expect(lined(PAIRED, "kept", "only", "5")).toEqual({
    refused: `${PAIRED} declares no \`kept\` on line 5 — say --line with 2 or 7`,
  })
})

test("a name a file carries in one place alone is renamed where a line names it", () => {
  const own = changed(lined(OWN, "stood", "listed", "1"), OWN)
  expect(own).toContain("function listed(): string")
  expect(own).toContain("return listed()")
})

test("a spelling this cannot read as a line is refused rather than counted as none", () => {
  expect(tokeningFor(HELD, "marking", "input", "two")).toEqual({
    refused: "--line takes the line a declaration starts on, and `two` is none",
  })
  expect(tokeningFor(HELD, "marking", "input", "0")).toEqual({
    refused: "--line takes the line a declaration starts on, and `0` is none",
  })
})

test("a line still naming it outside what the checker was built over is named all the same", () => {
  const made = over(HELD, "marking", "input", [HELD, NAMER])
  if ("refused" in made) throw new Error(made.refused)
  expect(made.binding.changes.get(NAMER)).toContain("export const two = input(one)")
  expect(made.binding.still).toEqual([{ path: SHADOW, lines: [2, 3] }])
})

const TAKER = "akasha/taker/taker.module.code.ts"

const CARRIED = new Map<string, string>([
  [HELD, BODIES.get(HELD) ?? ""],
  [
    TAKER,
    'import { marking } from "../held/held.module.code.ts"\n\nfunction held(): string {\n  return "one"\n}\n\nexport const three = marking\n\nexport const four = held()\n',
  ],
])

const CARRIED_PATHS = [...CARRIED.keys()]

const STRUNG = "akasha/strung/strung.module.code.ts"

const STRUNG_BODIES = new Map<string, string>([
  [HELD, BODIES.get(HELD) ?? ""],
  [
    STRUNG,
    'import { marking } from "../held/held.module.code.ts"\n' +
      '\nconst a = "one"\nconst b = "two"\n' +
      '\nexport const said = "import { marking } from x"\n' +
      "\nexport const held = `marking ${a} marking ${b} marking`\n" +
      '\nexport const apart = "markingHeld stands apart"\n' +
      "\nexport const two = marking\n",
  ],
])

const STRUNG_PATHS = [...STRUNG_BODIES.keys()]

function strung(inStrings: boolean): ReturnType<typeof bindingFor> {
  const asked = tokeningFor(HELD, "marking", "input")
  if ("refused" in asked) throw new Error(asked.refused)
  const over = inStrings
    ? { typed: STRUNG_PATHS, every: STRUNG_PATHS, inStrings: true }
    : { typed: STRUNG_PATHS, every: STRUNG_PATHS }
  return bindingFor(ROOT, over, asked.tokening, (path) => STRUNG_BODIES.get(path) ?? null)
}

function strungSaid(inStrings: boolean): string {
  const made = strung(inStrings)
  if ("refused" in made) throw new Error(made.refused)
  return made.binding.changes.get(STRUNG) ?? ""
}

test("a name spelled inside a string is respelled where the caller asks for it", () => {
  const said = strungSaid(true)
  expect(said).toContain('export const said = "import { input } from x"')
  expect(said).toContain("export const held = `input ${a} input ${b} input`")
})

test("a longer name carrying the renamed one is left as it stands inside a string", () => {
  expect(strungSaid(true)).toContain('export const apart = "markingHeld stands apart"')
})

test("a string is respelled over the body the checker already changed", () => {
  const said = strungSaid(true)
  expect(said).toContain('import { input } from "../held/held.module.code.ts"')
  expect(said).toContain("export const two = input")
})

test("a name spelled inside a string is left as it stands where the caller asks nothing", () => {
  const said = strungSaid(false)
  expect(said).toContain('export const said = "import { marking } from x"')
  expect(said).toContain("export const two = input")
})

test("a name a file the rename would respell already carries is refused rather than shadowed", () => {
  const asked = tokeningFor(HELD, "marking", "held")
  if ("refused" in asked) throw new Error(asked.refused)
  const made = bindingFor(
    ROOT,
    { typed: CARRIED_PATHS, every: CARRIED_PATHS },
    asked.tokening,
    (path) => CARRIED.get(path) ?? null
  )
  expect(made).toEqual({
    refused: `${TAKER} names \`marking\` and already carries \`held\``,
  })
})

const APART = "akasha/apart/apart.module.code.ts"

const OVER = "akasha/over/over.module.code.ts"

const NESTED = "akasha/nested/nested.module.code.ts"

const UNDER = "akasha/under/under.module.code.ts"

const SCOPED = new Map<string, string>([
  [HELD, BODIES.get(HELD) ?? ""],
  [
    APART,
    "export function first(): string {\n" +
      '  const held = "one"\n' +
      "  return held\n" +
      "}\n" +
      "\n" +
      "export function second(): string {\n" +
      '  const kept = "two"\n' +
      "  return kept\n" +
      "}\n",
  ],
  [
    OVER,
    'import { marking } from "../held/held.module.code.ts"\n' +
      "\nexport const top = 1\n" +
      "\nexport const two = marking\n" +
      "\nexport function first(): string {\n" +
      '  const kept = "one"\n' +
      "  return kept\n" +
      "}\n",
  ],
  [
    NESTED,
    "export function outer(): string {\n" +
      '  const held = "one"\n' +
      "  function inner(): string {\n" +
      '    const kept = "two"\n' +
      "    return kept + held\n" +
      "  }\n" +
      "  return inner()\n" +
      "}\n",
  ],
  [
    UNDER,
    "export function outer(): string {\n" +
      '  const held = "one"\n' +
      "  return held\n" +
      "}\n" +
      "\nexport const kept = outer()\n",
  ],
])

const SCOPED_PATHS = [...SCOPED.keys()]

function scoped(at: string, from: string, to: string): ReturnType<typeof bindingFor> {
  const asked = tokeningFor(at, from, to)
  if ("refused" in asked) throw new Error(asked.refused)
  return bindingFor(
    ROOT,
    { typed: SCOPED_PATHS, every: SCOPED_PATHS },
    asked.tokening,
    (path) => SCOPED.get(path) ?? null
  )
}

test("two locals in scopes neither reaches are each renamed to the name the other carries", () => {
  const made = scoped(APART, "kept", "held")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.binding.changes.get(APART) ?? "").toContain('  const held = "two"')
  const back = scoped(APART, "held", "kept")
  if ("refused" in back) throw new Error(back.refused)
  expect(back.binding.changes.get(APART) ?? "").toContain('  const kept = "one"')
})

test("a local is refused where the name it would become is declared over the whole file", () => {
  expect(scoped(OVER, "kept", "top")).toEqual({ refused: `${OVER} already carries \`top\`` })
})

test("a local is refused where the name it would become is imported by that file", () => {
  expect(scoped(OVER, "kept", "marking")).toEqual({
    refused: `${OVER} already carries \`marking\``,
  })
})

test("a local is refused where the name it would become is bound in a scope around it", () => {
  expect(scoped(NESTED, "kept", "held")).toEqual({ refused: `${NESTED} already carries \`held\`` })
})

test("a name the whole file carries is refused where a local inside would shadow the rename", () => {
  expect(scoped(UNDER, "kept", "held")).toEqual({ refused: `${UNDER} already carries \`held\`` })
})

test("a key rename is refused wherever the file carries the name it would become", () => {
  expect(bound(KEPT, "marksOn", "kept")).toEqual({ refused: `${KEPT} already carries \`kept\`` })
})
