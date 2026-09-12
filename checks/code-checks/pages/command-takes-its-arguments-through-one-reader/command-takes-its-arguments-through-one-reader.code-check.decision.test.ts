import { expect, test } from "bun:test"
import {
  found,
  moduleOf,
  type Reach,
  reaching,
  slugOf,
} from "akasha/checks/code-checks/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.code-check.decision.code.ts"

const AT = "commands/pages/humming/deep-song/humming-deep-song.command.code.ts"

const PAGE_AT = "commands/pages/humming/deep-song/humming-deep-song.command.ts"

const OUTSIDE_AT = "akasha/humming/held.module.code.ts"

const BESIDE_AT = "commands/pages/humming/humming-arguing/humming-arguing.module.code.ts"

const FAR_AT = "temper/commands/word-reading/word-reading.module.code.ts"

const READER =
  "export function saidFor(argv: readonly string[]): number {\n  return argv.length\n}\n"

const OPENS = "export function hummingDeepSong(argv: readonly string[], given: Given): Answer {\n"

function bodied(said: string): string {
  return `${OPENS}${said}}\n`
}

test("a command handing the words of its call to `takenFor` is refused nothing", () => {
  const said = bodied("  return answered(takenFor(argv, given.calledAs, page, PAGES))\n")
  expect(found(AT, said)).toEqual([])
})

test("a command asking those words whether a flag is there is refused", () => {
  const said = found(AT, bodied('  return answered(argv.includes("--json"))\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`argv.includes`")
  expect(said[0]).toContain("takenFor")
})

test("a command reading those words by place is refused", () => {
  const said = found(AT, bodied("  return answered(argv[0])\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`argv` by place")
})

test("a command walking those words one by one is refused", () => {
  const said = found(AT, bodied("  for (const one of argv) report(one)\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("word by word")
})

test("a reader the same file declares is followed into", () => {
  const holder = "function readIn(words: readonly string[]): number {\n  return words.length\n}\n"
  const said = found(AT, holder + bodied("  return answered(readIn(argv))\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`words.length`")
})

test("a reader no import of this file names is followed nowhere", () => {
  expect(found(AT, bodied("  return answered(readIn(argv))\n"))).toEqual([])
})

test("a command naming those words nowhere is refused nothing", () => {
  expect(found(AT, bodied("  return answered(given.root)\n"))).toEqual([])
})

test("a reader reached twice is walked once", () => {
  const holder = "function readIn(words: readonly string[]): number {\n  return words.length\n}\n"
  const twice = "  return answered(readIn(argv), readIn(argv))\n"
  expect(found(AT, holder + bodied(twice))).toHaveLength(1)
})

test("every read of those words is refused apart", () => {
  const said = found(AT, bodied('  return answered(argv[0], argv.includes("--json"))\n'))
  expect(said).toHaveLength(2)
})

test("a file outside the commands is refused nothing", () => {
  expect(found(OUTSIDE_AT, bodied("  return answered(argv[0])\n"))).toEqual([])
})

test("a command's page is no command's code", () => {
  expect(found(PAGE_AT, bodied("  return answered(argv[0])\n"))).toEqual([])
})

test("a file exporting no name the slug spells is refused nothing", () => {
  const said = "export function other(argv: readonly string[]): number {\n  return argv.length\n}\n"
  expect(found(AT, said)).toEqual([])
})

test("a command's file names that command's slug", () => {
  expect(slugOf(AT)).toBe("humming-deep-song")
  expect(slugOf(PAGE_AT)).toBeNull()
  expect(slugOf(OUTSIDE_AT)).toBeNull()
})

test("a module's file beside the commands names that module's slug", () => {
  expect(moduleOf(BESIDE_AT)).toBe("humming-arguing")
  expect(moduleOf(AT)).toBeNull()
  expect(moduleOf(FAR_AT)).toBeNull()
})

test("a module beside the commands reading those words is refused", () => {
  const said = found(BESIDE_AT, READER)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`argv.length`")
})

test("a module away from the commands is refused nothing", () => {
  expect(found(FAR_AT, READER)).toEqual([])
})

test("a module keeping its reader to itself is refused nothing", () => {
  expect(found(BESIDE_AT, READER.replace("export ", ""))).toEqual([])
})

test("a module taking those words under another spelling is refused nothing", () => {
  expect(found(BESIDE_AT, READER.replaceAll("argv", "words"))).toEqual([])
})

test("a module handing those words to `takenFor` is refused nothing", () => {
  const said =
    "export function readIn(argv: readonly string[], calledAs: string): Read {\n" +
    "  return takenFor(argv, calledAs, page, PAGES)\n}\n"
  expect(found(BESIDE_AT, said)).toEqual([])
})

test("each reader a module exports is refused apart", () => {
  expect(found(BESIDE_AT, READER + READER.replace("saidFor", "eachFor"))).toHaveLength(2)
})

test("a reader one export of a module hands on to another is refused once", () => {
  const on =
    "export function eachFor(argv: readonly string[]): number {\n  return saidFor(argv)\n}\n"
  expect(found(BESIDE_AT, READER + on)).toHaveLength(1)
})

test("a module's refusals are named in the order the lines run", () => {
  const said = found(BESIDE_AT, READER.replace("saidFor", "eachFor") + READER)
  expect(said[0]).toContain("line 2")
  expect(said[1]).toContain("line 5")
})

const ONWARD_AT = "temper/commands/onward/onward.module.code.ts"

const TAKEN_AT = "commands/arguments/word-taking/word-taking.module.code.ts"

function brings(at: string, name: string): string {
  return `import { ${name} } from "akasha/${at}"\n`
}

function opening(held: ReadonlyMap<string, string>): Reach {
  return reaching((at) => held.get(at) ?? null)
}

const HANDS_ON = "  return answered(saidFor(argv))\n"

test("a reader another file holds is followed one file on", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const said = found(AT, brings(FAR_AT, "saidFor") + bodied(HANDS_ON), reach)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(FAR_AT)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`argv.length`")
})

test("a reader in a file nothing opens is followed nowhere", () => {
  expect(found(AT, brings(FAR_AT, "saidFor") + bodied(HANDS_ON))).toEqual([])
})

test("a reader a renamed import names is followed under the name that file exports", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const brought = `import { saidFor as heldFor } from "akasha/${FAR_AT}"\n`
  const said = found(AT, brought + bodied("  return answered(heldFor(argv))\n"), reach)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(FAR_AT)
})

test("the trace stops one file on", () => {
  const onward = READER.replace("return argv.length", "return onward(argv)")
  const relays = brings(ONWARD_AT, "onward") + onward
  const reach = opening(
    new Map([
      [FAR_AT, relays],
      [ONWARD_AT, READER.replace("saidFor", "onward")],
    ])
  )
  expect(found(AT, brings(FAR_AT, "saidFor") + bodied(HANDS_ON), reach)).toEqual([])
})

test("a call into a file judged here is followed nowhere", () => {
  const reach = opening(new Map([[BESIDE_AT, READER]]))
  expect(found(AT, brings(BESIDE_AT, "saidFor") + bodied(HANDS_ON), reach)).toEqual([])
})

test("a call to `takenFor` is followed nowhere even where that file opens", () => {
  const reach = opening(new Map([[TAKEN_AT, READER.replace("saidFor", "takenFor")]]))
  const hands = "  return answered(takenFor(argv, given.calledAs, page, PAGES))\n"
  expect(found(AT, brings(TAKEN_AT, "takenFor") + bodied(hands), reach)).toEqual([])
})

test("a specifier landing on no path under akasha is followed nowhere", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const brought = 'import { saidFor } from "node:path"\n'
  expect(found(AT, brought + bodied(HANDS_ON), reach)).toEqual([])
})

test("a command's own read is named before one reached across an import", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const body = "  return answered(argv[0], saidFor(argv))\n"
  const said = found(AT, brings(FAR_AT, "saidFor") + bodied(body), reach)
  expect(said).toHaveLength(2)
  expect(said[0]).not.toContain(FAR_AT)
  expect(said[1]).toContain(FAR_AT)
})

const READS_IN = "function readIn(words: readonly string[]): number {\n  return words.length\n}\n"

const HANDS_TO =
  "function handing(words: readonly string[], reading = readIn): number {\n" +
  "  return reading(words)\n}\n"

const CALLS_IT = "  return answered(handing(argv))\n"

test("a reader a parameter defaults to is followed into", () => {
  const said = found(AT, READS_IN + HANDS_TO + bodied(CALLS_IT))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`words.length`")
})

test("a parameter shadowing a reader under no default is followed nowhere", () => {
  const shadows =
    "function handing(words: readonly string[], readIn: Reading): number {\n" +
    "  return readIn(words)\n}\n"
  expect(found(AT, READS_IN + shadows + bodied(CALLS_IT))).toEqual([])
})

test("a reader a parameter defaults to across an import is followed one file on", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const hands = HANDS_TO.replace("readIn", "saidFor")
  const said = found(AT, brings(FAR_AT, "saidFor") + hands + bodied(CALLS_IT), reach)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(FAR_AT)
  expect(said[0]).toContain("`argv.length`")
})

const OPENS_LATE =
  "export async function hummingDeepSong(argv: readonly string[]): Promise<Answer> {\n"

function lately(said: string): string {
  return `${OPENS_LATE}${said}}\n`
}

const DEFAULTS = READER.replace("export function", "export default function")

const TAKES_DEFAULT = "  return answered(starting(argv))\n"

test("a reader a dynamic import brings in by name is followed one file on", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const brought = `  const { saidFor } = await import("akasha/${FAR_AT}")\n`
  const said = found(AT, lately(brought + HANDS_ON), reach)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(FAR_AT)
  expect(said[0]).toContain("`argv.length`")
})

test("a reader a dynamic import takes as the default is followed one file on", () => {
  const reach = opening(new Map([[FAR_AT, DEFAULTS]]))
  const brought = `  const { default: starting } = await import("akasha/${FAR_AT}")\n`
  const said = found(AT, lately(brought + TAKES_DEFAULT), reach)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(FAR_AT)
  expect(said[0]).toContain("`argv.length`")
})

test("a dynamic import naming no literal specifier is followed nowhere", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const brought = "  const { saidFor } = await import(held)\n"
  expect(found(AT, lately(brought + HANDS_ON), reach)).toEqual([])
})

test("a dynamic import landing on no path under akasha is followed nowhere", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const brought = '  const { saidFor } = await import("node:path")\n'
  expect(found(AT, lately(brought + HANDS_ON), reach)).toEqual([])
})

const CALLS_WHOLE = "  return answered(held.saidFor(argv))\n"

test("a reader a dynamic import takes as a whole module is followed one file on", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const brought = `  const held = await import("akasha/${FAR_AT}")\n`
  const said = found(AT, lately(brought + CALLS_WHOLE), reach)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(FAR_AT)
  expect(said[0]).toContain("`argv.length`")
})

test("a whole module taken under no literal specifier is followed nowhere", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const brought = "  const held = await import(spelled)\n"
  expect(found(AT, lately(brought + CALLS_WHOLE), reach)).toEqual([])
})

test("a whole module landing on no path under akasha is followed nowhere", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  const brought = '  const held = await import("node:path")\n'
  expect(found(AT, lately(brought + CALLS_WHOLE), reach)).toEqual([])
})

test("a call on a name no dynamic import took is followed nowhere", () => {
  const reach = opening(new Map([[FAR_AT, READER]]))
  expect(found(AT, lately(CALLS_WHOLE), reach)).toEqual([])
})
