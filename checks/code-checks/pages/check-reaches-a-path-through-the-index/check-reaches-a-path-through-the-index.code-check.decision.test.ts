import { expect, test } from "bun:test"
import {
  askingOver,
  basedOn,
  foldersOf,
  judgedBy,
  reasonsIn,
} from "./check-reaches-a-path-through-the-index.code-check.decision.code.ts"

const HELD = [
  "design/colors/pages/yellow.color.ts",
  "utils/run/running/running.module.code.ts",
  "pages/name-formats/modules/name-matching/name-matching.module.code.ts",
]

const AT = "checks/code-checks/pages/a/a.code-check.code.ts"

const asking = askingOver(HELD)

function only(text: string): readonly string[] {
  return reasonsIn(asking, AT, text)
}

const NAMED = 'const AT = "design/colors"\n'

const TYPES: ReadonlySet<string> = new Set(["code-check", "color"])

test("a literal a listing is handed straight off is refused", () => {
  expect(only('readdirSync("design/colors")\n')).toHaveLength(1)
})

test("a listing reaching a path through the name holding it is refused", () => {
  expect(only(`${NAMED}readdirSync(join(root, AT))\n`)).toHaveLength(1)
})

test("a name taking what another name holds carries the path along", () => {
  expect(only(`${NAMED}const dir = join(root, AT)\nreaddirSync(dir)\n`)).toHaveLength(1)
})

test("a folder is listed with or without the separator closing it", () => {
  expect(only('readdirSync("utils/run/running/")\n')).toHaveLength(1)
})

test("a listing of a path the index knows a path ending with is refused", () => {
  expect(only('readdirSync("name-matching/name-matching.module.code.ts")\n')).toHaveLength(1)
})

test("a listing awaited lists like one that is not", () => {
  expect(only(`${NAMED}const held = await readdir(AT)\n`)).toHaveLength(1)
})

test("a glob built over a path is a listing", () => {
  expect(only(`${NAMED}const held = new Glob(\`\${AT}/*.ts\`)\n`)).toHaveLength(1)
})

test("a path written to rather than listed passes", () => {
  expect(only(`${NAMED}writeFileSync(join(root, AT, one), body)\n`)).toEqual([])
})

test("a path watched rather than listed passes", () => {
  expect(only(`${NAMED}watch(join(root, AT), () => {})\n`)).toEqual([])
})

test("a path handed to a command rather than listed passes", () => {
  expect(only(`${NAMED}ran(["rsync", "-a", AT, there])\n`)).toEqual([])
})

test("a path tested against rather than listed passes", () => {
  expect(only(`${NAMED}const held = one.startsWith(AT)\n`)).toEqual([])
})

test("a listing of a path the index knows nothing at is let through", () => {
  expect(only('readdirSync("text/event-stream")\n')).toEqual([])
})

test("a tail that does not begin at a separator is no path", () => {
  expect(only('readdirSync("matching/name-matching.module.code.ts")\n')).toEqual([])
})

test("a name holding no separator is no path", () => {
  expect(only('readdirSync("design")\n')).toEqual([])
})

test("a specifier is left to the checks that judge a specifier", () => {
  expect(only('import { a } from "utils/run/running/running.module.code.ts"\n')).toEqual([])
})

test("a template holding a value is no plain string, so nothing is seen", () => {
  expect(only("readdirSync(`design/${one}`)\n")).toEqual([])
})

test("one listing is refused once however many arguments carry a path", () => {
  const other = 'const OTHER = "utils/run/running"\n'
  expect(only(`${NAMED}${other}readdirSync(AT, OTHER)\n`)).toHaveLength(1)
})

test("two listings are refused twice", () => {
  expect(only(`${NAMED}readdirSync(AT)\nreaddirSync(AT)\n`)).toHaveLength(2)
})

test("a value a helper returns is not carried to the caller that lists it", () => {
  expect(only('function at() {\n  return "design/colors"\n}\nreaddirSync(at())\n')).toEqual([])
})

test("a name a loop binds carries what the loop runs over", () => {
  const held = 'const HELD = ["design/colors"]\n'
  expect(only(`${held}for (const one of HELD) readdirSync(one)\n`)).toHaveLength(1)
})

test("a name a loop binds over a source carrying nothing carries nothing", () => {
  const held = 'const HELD = ["text/event-stream"]\n'
  expect(only(`${held}for (const one of HELD) readdirSync(one)\n`)).toEqual([])
})

test("a name a for-in loop binds is a key rather than what the loop runs over", () => {
  const held = 'const HELD = { a: "design/colors" }\n'
  expect(only(`${held}for (const one in HELD) readdirSync(one)\n`)).toEqual([])
})

test("a name carries over the whole file rather than within one scope", () => {
  const helper = "function held(dir) {\n  return readdirSync(dir)\n}\n"
  expect(only(`${helper}const dir = "design/colors"\n`)).toHaveLength(1)
})

test("a long literal is shortened where the refusal names that literal", () => {
  const long = `${"pages/name-formats/modules/name-matching/name-matching.module.code.ts"} is here`
  const said = reasonsIn(askingOver([...HELD, long]), AT, `readdirSync("${long}")\n`)
  expect(said).toHaveLength(1)
})

test("every folder above a path is derived from that path", () => {
  expect([...foldersOf(["a/b/c.ts"])].sort()).toEqual(["a", "a/b"])
})

test("paths are grouped under the last name each path carries", () => {
  expect(basedOn(["a/b.ts", "c/b.ts"]).get("b.ts")).toEqual(["a/b.ts", "c/b.ts"])
})

test("the code of a page whose type the index knows is judged", () => {
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.code.ts")).toBe(true)
})

test("a file beside a page that is no code file is not judged", () => {
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.test.ts")).toBe(false)
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.ts")).toBe(false)
})

test("a file named for a page type the index does not know is not judged", () => {
  expect(judgedBy(TYPES)("akasha/a.thing.code.ts")).toBe(false)
})
