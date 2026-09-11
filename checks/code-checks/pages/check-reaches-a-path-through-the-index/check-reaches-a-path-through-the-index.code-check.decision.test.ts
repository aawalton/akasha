import { expect, test } from "bun:test"
import {
  type Asked,
  askingOver,
  basedOn,
  foldersOf,
  judgedBy,
  judgingOver,
  namingOver,
  reasonsIn,
} from "akasha/checks/code-checks/pages/check-reaches-a-path-through-the-index/check-reaches-a-path-through-the-index.code-check.decision.code.ts"

const HELD = [
  "design/colors/pages/yellow.color.ts",
  "utils/hum/humming/humming.module.code.ts",
  "pages/hum-formats/modules/hum-matching/hum-matching.module.code.ts",
]

const AT = "checks/code-checks/pages/a/a.code-check.code.ts"

const reaching = askingOver(HELD)

const NAMED = 'const AT = "design/colors"\n'

const TYPES: ReadonlySet<string> = new Set(["code-check", "color", "module"])

const naming = namingOver(HELD, TYPES)

function only(text: string): readonly string[] {
  return reasonsIn(reaching, naming, AT, text)
}

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
  expect(only('readdirSync("utils/hum/humming/")\n')).toHaveLength(1)
})

test("a literal the index knows a path ending with is refused", () => {
  expect(only('readdirSync("hum-matching/hum-matching.module.code.ts")\n')).toHaveLength(1)
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
  const said = only('readdirSync("matching/hum-matching.module.code.ts")\n')
  expect(said.filter((one) => one.includes("sits"))).toEqual([])
})

test("a name holding no separator is no path", () => {
  expect(only('readdirSync("design")\n')).toEqual([])
})

test("a specifier is left to the checks that judge a specifier", () => {
  expect(only('import { a } from "utils/hum/humming/humming.module.code.ts"\n')).toEqual([])
})

test("a template holding a value is no plain string, so nothing is seen", () => {
  expect(only("readdirSync(`design/${one}`)\n")).toEqual([])
})

test("one listing is refused once however many arguments carry a path", () => {
  const other = 'const OTHER = "utils/hum/humming"\n'
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
  const long = `${"pages/hum-formats/modules/hum-matching/hum-matching.module.code.ts"} is here`
  const said = reasonsIn(askingOver([...HELD, long]), naming, AT, `readdirSync("${long}")\n`)
  expect(said).toHaveLength(1)
})

test("a literal naming a path the index has a page at is refused", () => {
  expect(only('const at = "design/colors/pages/yellow.color.ts"\n')).toHaveLength(1)
})

test("a literal naming a page is refused wherever that literal sits", () => {
  expect(only('writeFileSync("utils/hum/humming/humming.module.code.ts", body)\n')).toHaveLength(1)
})

test("a literal naming a folder above a page is let through", () => {
  expect(only('const at = "design/colors/pages"\n')).toEqual([])
})

test("a literal a listing reaches that names a page is refused once", () => {
  const named = 'const AT = "design/colors/pages/yellow.color.ts"\n'
  expect(only(`${named}readdirSync(AT)\n`)).toHaveLength(1)
})

test("a literal ending in a separator names a folder rather than a page", () => {
  expect(only('const at = "design/colors/pages/yellow.color.ts/"\n')).toEqual([])
})

const SWEEPS = 'const held = said(["git", "-C", root, "ls-files", "-z", "--", "*.ts"])\n'

test("a page's name spelled where the file lists a folder is refused", () => {
  expect(only(`const SUFFIX = ".module.code.ts"\nreaddirSync(root)\n`)).toHaveLength(1)
})

test("a page's name spelled where the file lists nothing is let through", () => {
  expect(only('const SUFFIX = ".module.code.ts"\n')).toEqual([])
})

test("a run of git ls-files is a listing like a directory read", () => {
  expect(only(`const SUFFIX = ".module.code.ts"\n${SWEEPS}`)).toHaveLength(1)
})

test("a glob naming a page's name is refused where that glob is scanned", () => {
  expect(only('new Glob("a/*-synth/*-synth.module.code.ts").scanSync(root)\n')).toHaveLength(1)
})

test("a name no page type carries is let through however the file lists", () => {
  expect(only('const SUFFIX = ".thing.code.ts"\nreaddirSync(root)\n')).toEqual([])
})

test("a name the index answers no file for is let through", () => {
  expect(only('const SUFFIX = ".module.uncommitted.jsonl"\nreaddirSync(root)\n')).toEqual([])
})

test("a tail carrying what is no plain segment is no page's name", () => {
  expect(only('const MARK = ".module.ts — "\nreaddirSync(root)\n')).toEqual([])
})

test("a page's test listing a folder is not judged by the name it spells", () => {
  const at = "checks/code-checks/pages/a/a.code-check.test.ts"
  const said = reasonsIn(reaching, naming, at, 'const S = ".module.code.ts"\nreaddirSync(root)\n')
  expect(said).toEqual([])
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

test("the test of a page whose type the index knows is judged", () => {
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.test.ts")).toBe(true)
})

test("a page's own file states no section, so that file is not judged", () => {
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.ts")).toBe(false)
})

test("the code of a property group a page carries is judged", () => {
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.decision.code.ts")).toBe(true)
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.check.code.ts")).toBe(true)
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.audit.code.ts")).toBe(true)
})

test("the test of a property group a page carries is judged", () => {
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.decision.test.ts")).toBe(true)
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.check.test.ts")).toBe(true)
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.audit.test.ts")).toBe(true)
})

test("a test's fixtures are no reach, so a fixtures file is not judged", () => {
  const beside = "checks/code-checks/pages/a/a.code-check.decision.test-fixtures.ts"
  expect(judgedBy(TYPES)("checks/code-checks/pages/a/a.code-check.test-fixtures.ts")).toBe(false)
  expect(judgedBy(TYPES)(beside)).toBe(false)
})

test("a file whose last section is no code and no test is not judged", () => {
  const logs = "checks/code-checks/pages/a/a.code-check.check.logs.uncommitted.jsonl"
  expect(judgedBy(TYPES)(logs)).toBe(false)
})

test("a file named for a page type the index does not know is not judged", () => {
  expect(judgedBy(TYPES)("akasha/a.thing.code.ts")).toBe(false)
})

const STRAY = "akasha/stray.json"

const MADE = "akasha/made.json"

const RESOLVED = "akasha/resolved.json"

const ASKED: Asked = {
  types: TYPES,
  listed: (path) => path !== STRAY,
  generated: (path) => path === MADE,
  toolResolvesPaths: (path) => path === RESOLVED,
}

const SHELL = "akasha/one.thing.shell.sh"

function ran(text: string): readonly string[] {
  return reasonsIn(reaching, naming, SHELL, text)
}

test("a page's file that is no TypeScript is judged whatever section names that file", () => {
  expect(judgingOver(ASKED)("akasha/one.thing.config.json")).toBe(true)
})

test("a page's TypeScript file is judged only where that file is the code or the test", () => {
  const beside = "checks/code-checks/pages/a/a.code-check.test-fixtures.ts"
  expect(judgingOver(ASKED)("checks/code-checks/pages/a/a.code-check.code.ts")).toBe(true)
  expect(judgingOver(ASKED)(beside)).toBe(false)
})

test("a file the index names for no page is judged by nothing", () => {
  expect(judgingOver(ASKED)(STRAY)).toBe(false)
})

test("a file a page property says a machine writes is judged by nothing", () => {
  expect(judgingOver(ASKED)(MADE)).toBe(false)
})

test("a file a page property says a tool resolves the paths in is judged by nothing", () => {
  expect(judgingOver(ASKED)(RESOLVED)).toBe(false)
})

test("a file held uncommitted is judged by nothing", () => {
  const held = "checks/code-checks/pages/a/a.code-check.entries.uncommitted.jsonl"
  expect(judgingOver(ASKED)(held)).toBe(false)
})

test("a run of a body whose language is not parsed that names a page is refused", () => {
  const at = "akasha/one.thing.config.json"
  const said = reasonsIn(reaching, naming, at, '{ "at": "design/colors/pages/yellow.color.ts" }\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 1")
})

test("a run is read again from each separator, and a path after a variable is read", () => {
  expect(ran("cp $ROOT/design/colors/pages/yellow.color.ts .\n")).toHaveLength(1)
})

test("a run naming a folder above a page is let through", () => {
  expect(ran("ls design/colors/pages\n")).toEqual([])
})

test("one run is refused once however many readings of that run name the page", () => {
  expect(ran("cat design/colors/pages/yellow.color.ts\n")).toHaveLength(1)
})

test("a body outside TypeScript holds no listing", () => {
  expect(ran('readdirSync("design/colors")\n')).toEqual([])
})

test("a run the index knows a path ending with is refused", () => {
  expect(ran("see hum-matching/hum-matching.module.code.ts\n")).toHaveLength(1)
})

test("the line a run sits on is the line the refusal names", () => {
  expect(ran("one\ntwo\ncat design/colors/pages/yellow.color.ts\n")[0]).toContain("line 3")
})

const TWICE = ["a/one/image/Containerfile", "a/two/image/Containerfile"]

const nearer = askingOver(TWICE)

const BUILT = 'podman build -f "$PKG_DIR/image/Containerfile"\n'

test("the page named is the one sharing the most folders with the file that spells it", () => {
  const at = "a/two/up/two-up.shell-script.shell.sh"
  const said = reasonsIn(nearer, naming, at, BUILT)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a/two/image/Containerfile")
})

test("the same path spelled from another folder names the page beside that folder", () => {
  const at = "a/one/up/one-up.shell-script.shell.sh"
  const said = reasonsIn(nearer, naming, at, BUILT)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a/one/image/Containerfile")
})

test("a path more than one page ends with is refused wherever that path is spelled", () => {
  const at = "b/far/far.shell-script.shell.sh"
  const said = reasonsIn(nearer, naming, at, "cat image/Containerfile\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a/one/image/Containerfile")
})

test("a literal is named by the page nearest the file that spells that literal", () => {
  const at = "a/two/code/two.code-check.code.ts"
  const said = reasonsIn(nearer, naming, at, 'const AT = "image/Containerfile"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a/two/image/Containerfile")
})
