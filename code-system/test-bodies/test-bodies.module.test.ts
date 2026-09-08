import { afterAll, expect, test } from "bun:test"
import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, relative } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { ranOver } from "../code-tests/code-tests.module.code.ts"
import { FAILS, handing, PASSES, UNDER } from "../code-tests/code-tests.module.test-fixtures.ts"
import {
  bodiesAt,
  endingOf,
  folderOf,
  loaderOf,
  pairedIn,
  pairingsIn,
  preloadingOf,
  reachingIn,
  SERVED,
  SERVING,
  servedBy,
  servingOf,
  servingOut,
  wholeOf,
} from "./test-bodies.module.code.ts"
import {
  ASIDE,
  ASKED,
  ASKS,
  BOTH,
  CHECKS,
  HAD,
  HAS,
  HELD,
  KEEPS,
  LOOK,
  LOOKS,
  MOVED,
  manifestOf,
  ONE,
  OUTSIDE,
  REACHES,
  TOLD,
  TURNS,
  TWO,
  WAYS,
} from "./test-bodies.module.test-fixtures.ts"

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
  expect(folderOf(`/${SERVED}:${ONE}`)).toBe("/repo/one")
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

test("a manifest edited in place maps the way in whose target moved", () => {
  const found = pairedIn(
    "held",
    "held",
    ASKED,
    manifestOf({ "./asking": "./new/asking.ts" }),
    () => true
  )
  expect([...found.paths]).toEqual([["held/old/asking.ts", "held/new/asking.ts"]])
})

test("a package whose folder moved maps its ways in from the old folder to the new", () => {
  const found = pairedIn("held", "holds", manifestOf(WAYS), manifestOf(WAYS), () => true)
  expect([...found.paths]).toEqual([
    ["held/asking/asking.module.test-fixtures.ts", "holds/asking/asking.module.test-fixtures.ts"],
  ])
  expect([...found.spelled]).toEqual([])
})

test("one way in going and one arriving is a move where the change brings the file reached", () => {
  const found = pairedIn(
    "held",
    "held",
    ASKED,
    TOLD,
    (reached) => reached === "held/new/telling.ts"
  )
  expect([...found.paths]).toEqual([["held/old/asking.ts", "held/new/telling.ts"]])
  expect([...found.spelled]).toEqual([["@akasha/held/telling", "@akasha/held/asking"]])
})

test("a way in arriving at a file the change does not bring is no move", () => {
  const found = pairedIn("held", "held", ASKED, TOLD, () => false)
  expect([...found.paths]).toEqual([])
  expect([...found.spelled]).toEqual([])
})

test("a manifest carried at the path it already sat at is paired with itself", () => {
  const was = manifestOf({ "./asking": "./old/asking.ts" })
  const now = manifestOf({ "./asking": "./new/asking.ts" })
  expect(pairingsIn([{ folder: "held", was, now }])).toEqual([
    { wasFolder: "held", nowFolder: "held", was, now },
  ])
})

test("one manifest going and one arriving is a package whose folder moved", () => {
  const body = manifestOf(WAYS)
  expect(
    pairingsIn([
      { folder: "held", was: body, now: null },
      { folder: "holds", was: null, now: body },
    ])
  ).toEqual([{ wasFolder: "held", nowFolder: "holds", was: body, now: body }])
})

test("more than one manifest going or arriving is left alone", () => {
  const body = manifestOf(WAYS)
  expect(
    pairingsIn([
      { folder: "one", was: body, now: null },
      { folder: "two", was: body, now: null },
      { folder: "three", was: null, now: body },
    ])
  ).toEqual([])
  expect(
    pairingsIn([
      { folder: "one", was: body, now: null },
      { folder: "two", was: null, now: body },
      { folder: "three", was: null, now: body },
    ])
  ).toEqual([])
})

test("a package whose folder moved names each way in at the folder it moved to", () => {
  const body = manifestOf(WAYS)
  expect(reachingIn([{ wasFolder: "held", nowFolder: "holds", was: body, now: body }])).toEqual({
    "@akasha/held/asking/testing": "holds/asking/asking.module.test-fixtures.ts",
  })
})

test("a way in the manifest already carried is left to the runner", () => {
  const body = manifestOf(WAYS)
  expect(reachingIn([{ wasFolder: "held", nowFolder: "held", was: body, now: body }])).toEqual({})
})

test("a way in a manifest brings where its package stayed put is answered from the change", () => {
  expect(reachingIn([{ wasFolder: "held", nowFolder: "held", was: ASKED, now: BOTH }])).toEqual({
    "@akasha/held/telling": "held/new/telling.ts",
  })
})

test("the preload text carries the ways into a package whose folder moved", () => {
  const reaches = { "@akasha/held": "/repo/holds/one.module.code.ts" }
  expect(preloadingOf("/var/tmp/held/bodies.json", SERVING, reaches)).toContain(
    JSON.stringify(reaches)
  )
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

test("a test outside a package whose folder moved reads that package by its bare specifier", () => {
  const from = repo({ "outside.module.test.ts": OUTSIDE })
  mkdirSync(join(from, "node_modules", "@fake"), { recursive: true })
  symlinkSync("../../akasha/old", join(from, "node_modules", "@fake", "moved"))
  const carried = [
    "akasha/old/package.json",
    "akasha/old/held.module.code.ts",
    "akasha/new/package.json",
    "akasha/new/held.module.code.ts",
  ]
  const named = ["akasha/outside.module.test.ts"]
  const serving = servingOf(
    from,
    carried,
    handing({ "akasha/new/package.json": MOVED, "akasha/new/held.module.code.ts": TURNS }),
    named,
    handing({ "akasha/old/package.json": MOVED, "akasha/old/held.module.code.ts": KEEPS })
  )
  try {
    expect(ranOver(from, named, 1, null, serving).verdict).toBe("pass")
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

test("a manifest dropping one way in and bringing an unrelated one reaches the one it brings", () => {
  const from = repo({
    "held/package.json": HAD,
    "held/gone.module.code.ts": KEEPS,
    "held/come.module.code.ts": TURNS,
    "outside.module.test.ts": ASIDE,
  })
  mkdirSync(join(from, "node_modules", "@fake"), { recursive: true })
  symlinkSync("../../akasha/held", join(from, "node_modules", "@fake", "held"))
  const carried = ["akasha/held/package.json", "akasha/held/gone.module.code.ts"]
  const named = ["akasha/outside.module.test.ts"]
  const serving = servingOf(
    from,
    carried,
    handing({ "akasha/held/package.json": HAS }),
    named,
    handing({ "akasha/held/package.json": HAD })
  )
  try {
    expect(ranOver(from, named, 1, null, serving).verdict).toBe("pass")
  } finally {
    serving.sweep()
  }
})

test("a test file the change brings reaches a carried body by an import made as it runs", () => {
  const from = repo({})
  const carried = [HELD, ASKS]
  const named = [ASKS]
  const serving = servingOf(from, carried, handing({ [HELD]: TURNS, [ASKS]: REACHES }), named)
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
