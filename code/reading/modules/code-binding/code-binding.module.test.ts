import { expect, test } from "bun:test"
import {
  bindingOf,
  declaredIn,
  globallyReached,
  identifiersIn,
  referencing,
} from "akasha/code/reading/modules/code-binding/code-binding.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

const AT = "one/two.module.code.ts"

function sourceOf(text: string): ts.SourceFile {
  return parsedAs(AT, text)
}

function lastNamed(source: ts.SourceFile, of: string): ts.Identifier {
  const found = identifiersIn(source).filter((one) => one.text === of)
  const last = found[found.length - 1]
  if (last === undefined) throw new Error(`no identifier here is named ${of}`)
  return last
}

test("a file declares the names its variables, functions and classes carry", () => {
  const source = sourceOf("const one = 1\nfunction two() {}\nclass Three {}\n")
  expect([...declaredIn(source).keys()].sort()).toEqual(["Three", "one", "two"])
})

test("a binding taken apart declares every name that binding takes apart", () => {
  const source = sourceOf("const { one, two: [three] } = held\n")
  expect([...declaredIn(source).keys()].sort()).toEqual(["one", "three"])
})

test("a function declares the names its parameters carry", () => {
  const source = sourceOf("function two(four: number) {\n  return four\n}\n")
  const holder = source.statements[0]
  if (holder === undefined) throw new Error("the body states no function")
  expect([...declaredIn(holder).keys()]).toEqual(["four"])
})

test("an imported name is declared by the file importing it", () => {
  const source = sourceOf('import { five } from "akasha/one/six.module.code.ts"\n\nfive()\n')
  expect([...declaredIn(source).keys()]).toEqual(["five"])
})

test("a name a scope above declares is bound where that scope declares it", () => {
  const source = sourceOf("const one = 1\nfunction two() {\n  return one\n}\n")
  const bound = bindingOf(lastNamed(source, "one"))
  expect(bound === null).toBe(false)
  expect(ts.isSourceFile(bound?.scope ?? source)).toBe(true)
})

test("a type, an interface, an enum and a namespace each declare a name too", () => {
  const source = sourceOf(
    "type Nine = number\ninterface Ten {}\nenum Eleven {}\nnamespace Twelve {}\n"
  )
  expect([...declaredIn(source).keys()].sort()).toEqual(["Eleven", "Nine", "Ten", "Twelve"])
})

test("a name a module augmentation declares is declared by that augmentation rather than the file", () => {
  const source = sourceOf('import "held"\n\ndeclare module "held" {\n  interface Fifteen {}\n}\n')
  expect([...declaredIn(source).keys()]).toEqual([])
})

test("a name a declare global block declares is declared by the file holding that block", () => {
  const source = sourceOf("export {}\n\ndeclare global {\n  interface Sixteen {}\n}\n")
  expect([...declaredIn(source).keys()]).toContain("Sixteen")
})

test("an identifier no scope out to the file declares is bound by nothing", () => {
  const source = sourceOf("nowhere()\n")
  expect(bindingOf(lastNamed(source, "nowhere"))).toBeNull()
})

test("a name written where a property is named reads as no reference", () => {
  const source = sourceOf("held.seven\n")
  expect(referencing(lastNamed(source, "seven"))).toBe(false)
  expect(referencing(lastNamed(source, "held"))).toBe(true)
})

test("a name inside an import specifier reads as no reference", () => {
  const source = sourceOf('import { eight } from "akasha/one/six.module.code.ts"\n')
  expect(referencing(lastNamed(source, "eight"))).toBe(false)
})

test("a name written after globalThis is answered as reached on the global object", () => {
  const source = sourceOf("globalThis.thirteen = 1\n")
  expect(globallyReached(lastNamed(source, "thirteen"))).toBe(true)
})

test("a name written after another object is not reached on the global object", () => {
  const source = sourceOf("held.fourteen = 1\n")
  expect(globallyReached(lastNamed(source, "fourteen"))).toBe(false)
  expect(globallyReached(lastNamed(source, "held"))).toBe(false)
})
