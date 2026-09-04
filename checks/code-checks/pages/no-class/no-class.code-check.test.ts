import { expect, test } from "bun:test"
import { bodiesIn } from "@akasha/testing-system/bodying"
import { classesIn, reasonsIn } from "./no-class.code-check.code.ts"

const ROOT = "/repo"

const given = bodiesIn(ROOT)

const DERIVED = "  static getDerivedStateFromError(error: Error) {\n    return { error }\n  }\n"

test("a file declaring no class is let through", () => {
  expect(
    reasonsIn(given("akasha/held.ts", "export function one(): number {\n  return 1\n}\n"))
  ).toEqual([])
})

test("a class declaration is refused, and the reason names the line and the class", () => {
  const said = reasonsIn(given("akasha/held.ts", "\nexport class Held {\n  one = 1\n}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`class Held`")
})

test("a class extending `Error` is let through", () => {
  const body = 'export class Refused extends Error {\n  readonly why = "no"\n}\n'
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("a class extending anything other than `Error` is refused, and the reason names what it extends", () => {
  const said = reasonsIn(given("akasha/held.ts", "class Held extends Ledger {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("which extends `Ledger`")
  const dotted = classesIn("akasha/held.ts", "class One extends node.Error {}\n")
  expect(dotted[0]?.extending).toBe("node.Error")
  expect(reasonsIn(given("akasha/held.ts", "class One extends node.Error {}\n"))).toHaveLength(1)
})

test("a class expression is judged wherever a declaration would be, even extending `Error`", () => {
  const said = reasonsIn(given("akasha/held.ts", "const one = class extends Error {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a class expression is a class")
})

test("every class a file declares is reported, nested or at the top", () => {
  const body = "class One {}\nfunction two() {\n  class Three {}\n  return Three\n}\n"
  const said = reasonsIn(given("akasha/held.ts", body))
  expect(said).toHaveLength(2)
  expect(said[1]).toContain("line 3")
})

test("an unnamed class is named as one in the reason", () => {
  const said = reasonsIn(given("akasha/held.ts", "export default class {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("an unnamed class")
})

test("an abstract class is a class", () => {
  expect(reasonsIn(given("akasha/held.ts", "abstract class Held {}\n"))).toHaveLength(1)
})

test("a class extending `Error` while implementing something is still let through", () => {
  const body = "class Refused extends Error implements Held {}\n"
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("a class named `Error` that extends nothing is refused", () => {
  expect(reasonsIn(given("akasha/held.ts", "class Error {}\n"))).toHaveLength(1)
})

test("a class extending `React.Component` that declares the static member is let through", () => {
  const body = `export class Held extends React.Component {\n${DERIVED}}\n`
  expect(reasonsIn(given("akasha/held.tsx", body))).toEqual([])
})

test("the boundary is let through with its two type arguments written", () => {
  const body = `export class Held extends React.Component<Props, State> {\n${DERIVED}}\n`
  expect(reasonsIn(given("akasha/held.tsx", body))).toEqual([])
})

test("a class extending a bare `Component` is let through on the same terms", () => {
  const body = `class Held extends Component {\n${DERIVED}}\n`
  expect(reasonsIn(given("akasha/held.tsx", body))).toEqual([])
})

test("the static member is read as a property as well as a method", () => {
  const held = "  static getDerivedStateFromError = (error: Error) => ({ error })\n"
  const body = `class Held extends React.Component {\n${held}}\n`
  expect(reasonsIn(given("akasha/held.tsx", body))).toEqual([])
})

test("a class extending `React.Component` that declares no static member is refused", () => {
  const said = reasonsIn(given("akasha/held.tsx", "class Held extends React.Component {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("which extends `React.Component`")
  expect(said[0]).toContain("no `static getDerivedStateFromError`")
})

test("a member of that name that is not static leaves the class refused", () => {
  const held = "  getDerivedStateFromError(error: Error) {\n    return { error }\n  }\n"
  const body = `class Held extends React.Component {\n${held}}\n`
  expect(reasonsIn(given("akasha/held.tsx", body))).toHaveLength(1)
})

test("`componentDidCatch` alone leaves the class refused", () => {
  const held = "  componentDidCatch(error: Error) {\n    report(error)\n  }\n"
  const body = `class Held extends React.Component {\n${held}}\n`
  expect(reasonsIn(given("akasha/held.tsx", body))).toHaveLength(1)
})

test("the static member alone lets nothing through, whatever the class extends", () => {
  const ledger = `class Held extends Ledger {\n${DERIVED}}\n`
  expect(reasonsIn(given("akasha/held.tsx", ledger))).toHaveLength(1)
  const bare = `class Held {\n${DERIVED}}\n`
  expect(reasonsIn(given("akasha/held.tsx", bare))).toHaveLength(1)
})

test("a class extending a `Component` of another name is refused", () => {
  const body = `class Held extends Preact.Component {\n${DERIVED}}\n`
  const said = reasonsIn(given("akasha/held.tsx", body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("which extends `Preact.Component`")
})

test("a class expression is refused even where it holds the boundary shape", () => {
  const body = `const one = class extends React.Component {\n${DERIVED}}\n`
  const said = reasonsIn(given("akasha/held.tsx", body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a class expression is a class")
})

test("a file that is not TypeScript is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", "class Held {}\n"))).toEqual([])
})

test("a declaration file is judged, because its name ends in `.ts`", () => {
  expect(reasonsIn(given("akasha/held.d.ts", "declare class Held {}\n"))).toHaveLength(1)
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => reasonsIn(held)).toThrow("akasha/raw.ts")
  expect(() => reasonsIn(held)).toThrow("not valid UTF-8")
})
