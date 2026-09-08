import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { ranOver } from "../code-tests/code-tests.module.code.ts"
import { FAILS, handing, PASSES, UNDER } from "../code-tests/code-tests.module.test-fixtures.ts"
import {
  bodiesAt,
  endingOf,
  folderOf,
  loaderOf,
  preloadingOf,
  SERVED,
  SERVING,
  servedBy,
  servingOf,
  servingOut,
  wholeOf,
} from "./test-bodies.module.code.ts"

const KEEPS = "export const kept = 1\n"

const TURNS = "export const kept = 2\n"

const CHECKS =
  'import { expect, test } from "bun:test"\n' +
  'import { kept } from "./one.module.code.ts"\n' +
  'test("kept", () => { expect(kept).toBe(1) })\n'

const LOOK = ".ring { color: red }\n"

const LOOKS =
  'import { expect, test } from "bun:test"\n' +
  'import look from "./look.css"\n' +
  'test("look", () => { expect(look).toContain("red") })\n'

function repo(files: Record<string, string>): string {
  const root = realpathSync(scratch.rootFor("test-bodies-"))
  mkdirSync(join(root, "akasha"), { recursive: true })
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, "akasha", name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ONE = "/repo/one/held.module.code.ts"

const TWO = "/repo/two/held.module.test.ts"

test("a path the change carries is matched whole, and a near neighbour is not", () => {
  const filter = wholeOf([ONE, TWO])
  expect(filter.test(ONE)).toBe(true)
  expect(filter.test(TWO)).toBe(true)
  expect(filter.test(`${ONE}x`)).toBe(false)
  expect(filter.test("/repo/one/other.module.code.ts")).toBe(false)
})

test("a path the change carries is matched by its ending, however it was written", () => {
  const filter = endingOf([ONE])
  expect(filter.test("./held.module.code.ts")).toBe(true)
  expect(filter.test("../one/held.module.code.ts")).toBe(true)
  expect(filter.test(ONE)).toBe(true)
  expect(filter.test("./other.module.code.ts")).toBe(false)
})

test("a change carrying no path matches nothing at all", () => {
  expect(wholeOf([]).test("")).toBe(false)
  expect(wholeOf([]).test(ONE)).toBe(false)
  expect(endingOf([]).test("./held.module.code.ts")).toBe(false)
})

test("the folder an import is read against drops the mark a served body carries", () => {
  expect(folderOf(`${SERVED}:${ONE}`)).toBe("/repo/one")
  expect(folderOf(ONE)).toBe("/repo/one")
})

test("the form a body is read as follows the extension its path carries", () => {
  expect(loaderOf("/repo/one.ts")).toBe("ts")
  expect(loaderOf("/repo/one.tsx")).toBe("tsx")
  expect(loaderOf("/repo/one.js")).toBe("js")
  expect(loaderOf("/repo/one.jsx")).toBe("jsx")
})

test("an extension the runner loads no form for is answered by no form at all", () => {
  expect(loaderOf("/repo/one.css")).toBeNull()
  expect(loaderOf("/repo/one.json")).toBeNull()
  expect(loaderOf("/repo/one.notes")).toBeNull()
})

test("a body handed over is served under the form its path names", () => {
  const said = servingOut({ [ONE]: "export const held = 1\n" }, ONE)
  expect(said).toEqual({ contents: "export const held = 1\n", loader: "ts" })
})

test("a stylesheet is served as JavaScript answering that stylesheet's text", () => {
  const at = "/repo/one/held.stylesheet.styles.css"
  const said = servingOut({ [at]: LOOK }, at)
  expect(said.loader).toBe("js")
  expect(said.contents).toBe(`export default ${JSON.stringify(LOOK)}\n`)
})

test("a body under an extension named by nothing is served as JavaScript too", () => {
  const at = "/repo/one/held.notes"
  const said = servingOut({ [at]: "just words\n" }, at)
  expect(said).toEqual({ contents: 'export default "just words\\n"\n', loader: "js" })
})

test("a path the change takes away refuses the import reaching it", () => {
  expect(() => servingOut({ [ONE]: null }, ONE)).toThrow(ONE)
  expect(() => servingOut({}, ONE)).toThrow(ONE)
})

test("the bodies are read back out of the file they were written to", () => {
  const at = join(scratch.rootFor("test-bodies-"), "bodies.json")
  writeFileSync(at, JSON.stringify({ [ONE]: "held\n", [TWO]: null }))
  expect(bodiesAt(at)).toEqual({ [ONE]: "held\n", [TWO]: null })
})

test("the preload text names this module and the file the bodies were written to", () => {
  const said = preloadingOf("/var/tmp/held/bodies.json")
  expect(said).toContain(JSON.stringify(SERVING))
  expect(said).toContain(JSON.stringify("/var/tmp/held/bodies.json"))
  expect(said).toContain("Bun.plugin(servedBy(bodiesAt(")
})

test("the preload names the serving handed in rather than this module on disk", () => {
  const said = preloadingOf("/var/tmp/held/bodies.json", "/var/tmp/held/serving.ts")
  expect(said).toContain(JSON.stringify("/var/tmp/held/serving.ts"))
  expect(said).not.toContain(JSON.stringify(SERVING))
})

test("a serving over a change carrying this module names that carried body in the preload", () => {
  const root = realpathSync(join(dirname(SERVING), "..", ".."))
  const own = relative(root, SERVING)
  const serving = servingOf(root, [own], handing({ [own]: readFileSync(SERVING, "utf8") }), [])
  try {
    const copy = join(dirname(serving.preload), "serving.ts")
    expect(existsSync(copy)).toBe(true)
    expect(readFileSync(serving.preload, "utf8")).toContain(JSON.stringify(copy))
    expect(readFileSync(copy, "utf8")).not.toMatch(/from\s+"\.\.?\//)
  } finally {
    serving.sweep()
  }
})

test("the plugin made for a change is named once however many bodies it serves", () => {
  expect(servedBy({}).name).toBe(servedBy({ [ONE]: "held\n" }).name)
})

test("a run over a serving answers the body handed in, not the one on disk", () => {
  const from = repo({ "one.test.ts": PASSES })
  const named = ["akasha/one.test.ts"]
  const serving = servingOf(from, named, handing({ "akasha/one.test.ts": FAILS }), named)
  try {
    expect(ranOver(from, named, 1, null, serving).verdict).toBe("fail")
    expect(ranOver(from, named, 1).verdict).toBe("pass")
  } finally {
    serving.sweep()
  }
})

test("a test on disk reads the body the change carries beside it, not the one there", () => {
  const from = repo({ "one.module.code.ts": KEEPS, "one.module.test.ts": CHECKS })
  const carried = ["akasha/one.module.code.ts"]
  const named = ["akasha/one.module.test.ts"]
  const serving = servingOf(from, carried, handing({ "akasha/one.module.code.ts": TURNS }), named)
  try {
    expect(ranOver(from, named, 1, null, serving).verdict).toBe("fail")
    expect(ranOver(from, named, 1).verdict).toBe("pass")
  } finally {
    serving.sweep()
  }
})

test("a run over a serving carrying a stylesheet reads that stylesheet's text", () => {
  const from = repo({ "look.css": ".ring { color: blue }\n", "one.module.test.ts": LOOKS })
  const carried = ["akasha/look.css"]
  const named = ["akasha/one.module.test.ts"]
  const serving = servingOf(from, carried, handing({ "akasha/look.css": LOOK }), named)
  try {
    expect(ranOver(from, named, 1, null, serving).verdict).toBe("pass")
  } finally {
    serving.sweep()
  }
})

test("a test file the change brings is run though no file is there for it", () => {
  const from = repo({})
  const named = ["akasha/new.test.ts"]
  const serving = servingOf(from, named, handing({ "akasha/new.test.ts": FAILS }), named)
  try {
    expect(existsSync(join(from, "akasha/new.test.ts"))).toBe(false)
    expect(serving.standing.get("akasha/new.test.ts")).toBeDefined()
    expect(ranOver(from, named, 1, null, serving).verdict).toBe("fail")
  } finally {
    serving.sweep()
  }
})

test("a serving sits under /var/tmp and is gone once it is swept", () => {
  const serving = servingOf(repo({}), [], handing({}), [])
  expect(serving.preload.startsWith(UNDER)).toBe(true)
  expect(existsSync(serving.preload)).toBe(true)
  serving.sweep()
  expect(existsSync(serving.preload)).toBe(false)
})

test("a body a serving could not read names the path the serving reached for", () => {
  const from = repo({})
  const asked = (): unknown => servingOf(from, ["akasha/one.ts"], () => readFileSync(""), [])
  expect(asked).toThrow("akasha/one.ts")
  expect(asked).toThrow("ENOENT")
})
