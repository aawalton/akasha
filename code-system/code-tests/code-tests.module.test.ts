import { afterAll, test as check, expect } from "bun:test"
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { readingIn } from "@akasha/indexes"
import { linesFiled } from "@akasha/indexes/testing"
import {
  alreadyRunning,
  BATCH,
  batchedOf,
  CARRIED,
  groupedBy,
  plain,
  preloadsIn,
  RUNNING,
  ranOver,
  summaryIn,
  testsBesideOf,
  testsUnder,
  verdictOf,
  worldOf,
} from "./code-tests.module.code.ts"
import {
  FAILS,
  handing,
  installed,
  MARKED,
  NEEDS,
  PASSES,
  SETS,
  UNDER,
} from "./code-tests.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(files: Record<string, string>): string {
  const root = realpathSync(scratch.rootFor("code-tests-"))
  mkdirSync(join(root, "akasha"), { recursive: true })
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, "akasha", name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

check("the test files under a path are counted, and other files are not", () => {
  const root = repo({
    "one.test.ts": PASSES,
    "held.ts": "export const held = 1\n",
    "deep/two.test.ts": PASSES,
  })
  expect(testsUnder(join(root, "akasha"))).toBe(2)
  expect(testsUnder(join(root, "akasha/held.ts"))).toBe(0)
  expect(testsUnder(join(root, "akasha/one.test.ts"))).toBe(1)
  expect(testsUnder(join(root, "akasha/nowhere"))).toBe(0)
})

check("a test written with JSX is counted as readily as one written without", () => {
  const root = repo({ "one.test.tsx": PASSES, "deep/two.test.ts": PASSES })
  expect(testsUnder(join(root, "akasha"))).toBe(2)
  expect(testsUnder(join(root, "akasha/one.test.tsx"))).toBe(1)
})

check("a test the installed modules folder or the git folder holds is not counted", () => {
  const root = repo({
    "node_modules/one.test.ts": PASSES,
    ".git/two.test.ts": PASSES,
    "three.test.ts": PASSES,
  })
  expect(testsUnder(join(root, "akasha"))).toBe(1)
})

check(
  "a code file, its page and its fixtures all answer the tests that could sit beside them",
  () => {
    const both = ["akasha/one/held.module.test.ts", "akasha/one/held.module.test.tsx"]
    expect(testsBesideOf("akasha/one/held.module.code.ts")).toEqual(both)
    expect(testsBesideOf("akasha/one/held.module.ts")).toEqual(both)
    expect(testsBesideOf("akasha/one/held.module.code.tsx")).toEqual(both)
    expect(testsBesideOf("akasha/one/held.module.test-fixtures.ts")).toEqual(both)
    expect(testsBesideOf("akasha/one/held.module.test-fixtures.tsx")).toEqual(both)
  }
)

check("a test answers itself alone, whichever of the two it is written in", () => {
  expect(testsBesideOf("akasha/one/held.module.test.ts")).toEqual([
    "akasha/one/held.module.test.ts",
  ])
  expect(testsBesideOf("akasha/one/held.module.test.tsx")).toEqual([
    "akasha/one/held.module.test.tsx",
  ])
})

check("a file that is no TypeScript file sits beside no test", () => {
  expect(testsBesideOf("akasha/one/notes.md")).toEqual([])
  expect(testsBesideOf("akasha/one/held")).toEqual([])
})

check("color is taken out before the summary is read", () => {
  const painted = `${String.fromCharCode(27)}[32m 3 pass${String.fromCharCode(27)}[0m`
  expect(plain(painted)).toBe(" 3 pass")
  expect(summaryIn(painted).passed).toBe(3)
})

check("the summary is read out of what the run printed", () => {
  const output = " 7 pass\n 2 fail\nRan 9 tests across 4 files."
  expect(summaryIn(output)).toEqual({ files: 4, failed: 2, passed: 7 })
})

check("a run that printed no summary is read as a crash, whatever it exited", () => {
  expect(verdictOf(0, "", 3)).toBe("crash")
  expect(verdictOf(1, "bun: command not found", 3)).toBe("crash")
})

check("a name matching no test is read as no tests rather than as a crash", () => {
  const said = 'error: regex "^held$" matched 0 tests. Searched 2 files'
  expect(summaryIn(said)).toEqual({ files: 0, failed: 0, passed: 0 })
  expect(verdictOf(1, said, 0)).toBe("pass")
})

check("a run reaching fewer files than are under it is short, not a pass", () => {
  const output = " 1 pass\n 0 fail\nRan 1 tests across 1 files."
  expect(verdictOf(0, output, 4)).toBe("short")
  expect(verdictOf(0, output, 1)).toBe("pass")
})

check("a green run exiting non-zero on a leaked handle is still a pass", () => {
  const output = " 9 pass\n 0 fail\nRan 9 tests across 2 files."
  expect(verdictOf(1, output, 2)).toBe("pass")
})

check("a run with a failing test is a failure whatever it exited", () => {
  const output = " 8 pass\n 1 fail\nRan 9 tests across 2 files."
  expect(verdictOf(0, output, 2)).toBe("fail")
  expect(verdictOf(1, output, 2)).toBe("fail")
})

check("a run answers what it printed, the summary in it, and the verdict that follows", () => {
  const root = repo({ "one.test.ts": PASSES })
  const done = ranOver(root, ["akasha"], 1)
  expect(done.code).toBe(0)
  expect(done.output).toContain("1 pass")
  expect(done.summary.passed).toBe(1)
  expect(done.verdict).toBe("pass")
})

check("a run holding a failing test answers a failing verdict", () => {
  const root = repo({ "one.test.ts": PASSES, "two.test.ts": FAILS })
  const done = ranOver(root, ["akasha"], 2)
  expect(done.summary.failed).toBe(1)
  expect(done.verdict).toBe("fail")
})

check("one named path runs alone, and its neighbour does not", () => {
  const root = repo({ "one.test.ts": PASSES, "two.test.ts": FAILS })
  const done = ranOver(root, ["akasha/one.test.ts"], 1)
  expect(done.verdict).toBe("pass")
})

check("what a run spawns is marked as inside one", () => {
  const root = repo({ "one.test.ts": MARKED })
  expect(ranOver(root, ["akasha"], 1).verdict).toBe("pass")
})

check("the mark a run carries is read back by whoever is inside it", () => {
  expect(RUNNING).toBe("AKASHA_TESTS_RUNNING")
  const was = process.env[RUNNING]
  process.env[RUNNING] = "1"
  expect(alreadyRunning()).toBe(true)
  delete process.env[RUNNING]
  expect(alreadyRunning()).toBe(false)
  if (was === undefined) delete process.env[RUNNING]
  else process.env[RUNNING] = was
})

check("a world is written out of the bodies handed in, not off the tree it is made from", () => {
  const from = repo({ "one.ts": "what is on disk\n" })
  const world = worldOf(
    from,
    ["akasha/one.ts"],
    handing({ "akasha/one.ts": "what is proposed\n" }),
    null
  )
  try {
    expect(readFileSync(join(world.root, "akasha/one.ts"), "utf8")).toBe("what is proposed\n")
  } finally {
    world.sweep()
  }
})

check("a path answered by no body is not written into the world", () => {
  const from = repo({ "one.ts": "held\n", "gone.ts": "held\n" })
  const named = ["akasha/one.ts", "akasha/gone.ts"]
  const world = worldOf(from, named, handing({ "akasha/one.ts": "held\n" }), null)
  try {
    expect(existsSync(join(world.root, "akasha/one.ts"))).toBe(true)
    expect(existsSync(join(world.root, "akasha/gone.ts"))).toBe(false)
  } finally {
    world.sweep()
  }
})

check("a world carries the index, what a run is configured by, and the modules", () => {
  const from = repo({})
  linesFiled(from, "held.jsonl", [{}])
  mkdirSync(join(from, "node_modules"), { recursive: true })
  for (const one of CARRIED) writeFileSync(join(from, one), "{}\n")
  const world = worldOf(from, [], handing({}), [])
  try {
    expect(readingIn(world.root).lines("held.jsonl")).toEqual(["{}"])
    for (const one of CARRIED) expect(existsSync(join(world.root, one))).toBe(true)
    expect(lstatSync(join(world.root, "node_modules")).isDirectory()).toBe(true)
  } finally {
    world.sweep()
  }
})

check("a package outside the tree is answered from the tree it was made from", () => {
  const from = repo({})
  installed(from, "third", null)
  const world = worldOf(from, [], handing({}), null)
  try {
    const at = join(world.root, "node_modules/third")
    expect(lstatSync(at).isSymbolicLink()).toBe(true)
    expect(realpathSync(at)).toBe(join(from, "node_modules/third"))
  } finally {
    world.sweep()
  }
})

check("a package inside the tree is answered from the world holding it", () => {
  const from = repo({ "held/package.json": '{"name":"@akasha/held"}\n' })
  installed(from, "@akasha/held", "akasha/held")
  const named = ["akasha/held/package.json"]
  const world = worldOf(from, named, handing({ "akasha/held/package.json": "{}\n" }), null)
  try {
    const at = join(world.root, "node_modules/@akasha/held")
    expect(realpathSync(at)).toBe(join(world.root, "akasha/held"))
  } finally {
    world.sweep()
  }
})

check("a package inside the tree the world does not hold is answered by nothing", () => {
  const from = repo({ "held/package.json": '{"name":"@akasha/held"}\n' })
  installed(from, "@akasha/held", "akasha/held")
  const world = worldOf(from, [], handing({}), null)
  try {
    expect(existsSync(join(world.root, "node_modules/@akasha/held"))).toBe(false)
    expect(existsSync(join(world.root, "node_modules/@akasha"))).toBe(true)
  } finally {
    world.sweep()
  }
})

check("a world carries the index as the change leaves it rather than as the tree is", () => {
  const from = repo({})
  linesFiled(from, "held.jsonl", [{}])
  linesFiled(from, "gone.jsonl", [{}])
  const world = worldOf(from, [], handing({}), [
    { at: "held.jsonl", lines: ['{"held":"as the change leaves it"}'] },
    { at: "gone.jsonl", lines: [] },
  ])
  try {
    const reading = readingIn(world.root)
    expect(reading.lines("held.jsonl")).toEqual(['{"held":"as the change leaves it"}'])
    expect(reading.holds("gone.jsonl")).toBe(false)
  } finally {
    world.sweep()
  }
})

check("a world asked for no index carries none rather than the one the tree is at", () => {
  const from = repo({})
  linesFiled(from, "held.jsonl", [{}])
  const world = worldOf(from, [], handing({}), null)
  try {
    expect(existsSync(join(world.root, ".git"))).toBe(false)
    expect(readingIn(world.root).holds("")).toBe(false)
  } finally {
    world.sweep()
  }
})

check("a world made from a root holding none of that still exists", () => {
  const from = repo({})
  const world = worldOf(from, ["akasha/one.ts"], handing({ "akasha/one.ts": "held\n" }), [])
  try {
    expect(existsSync(join(world.root, ".git"))).toBe(false)
    expect(existsSync(join(world.root, "node_modules"))).toBe(false)
    for (const one of CARRIED) expect(existsSync(join(world.root, one))).toBe(false)
    expect(readFileSync(join(world.root, "akasha/one.ts"), "utf8")).toBe("held\n")
  } finally {
    world.sweep()
  }
})

check("a world sits under /var/tmp and is gone once it is swept", () => {
  const world = worldOf(repo({}), [], handing({}), null)
  expect(world.root.startsWith(UNDER)).toBe(true)
  expect(existsSync(world.root)).toBe(true)
  world.sweep()
  expect(existsSync(world.root)).toBe(false)
})

check("a body the world could not read names the path the world reached for", () => {
  const from = repo({})
  const asked = (): unknown => worldOf(from, ["akasha/one.ts"], () => readFileSync(""), null)
  expect(asked).toThrow("akasha/one.ts")
  expect(asked).toThrow("ENOENT")
})

check("a carried file the world could not take names that file rather than only the fault", () => {
  const from = repo({})
  mkdirSync(join(from, "biome.json"), { recursive: true })
  const asked = (): unknown => worldOf(from, [], handing({}), null)
  expect(asked).toThrow("could not be made")
  expect(asked).toThrow("biome.json")
  expect(asked).toThrow("EISDIR")
})

check("a world that could not be made is swept rather than left under /var/tmp", () => {
  const from = repo({})
  let said = ""
  try {
    worldOf(from, ["akasha/one.ts"], () => readFileSync(""), null)
  } catch (thrown) {
    said = thrown instanceof Error ? thrown.message : String(thrown)
  }
  const found = /the world at (\S+) could not be made/.exec(said)
  const root = found?.[1] ?? ""
  expect(root).toContain(UNDER)
  expect(existsSync(root)).toBe(false)
})

check("a run over a world answers the bodies handed in, not the ones on disk", () => {
  const from = repo({ "one.test.ts": PASSES })
  const world = worldOf(
    from,
    ["akasha/one.test.ts"],
    handing({ "akasha/one.test.ts": FAILS }),
    null
  )
  try {
    expect(ranOver(world.root, ["akasha/one.test.ts"], 1).verdict).toBe("fail")
    expect(ranOver(from, ["akasha/one.test.ts"], 1).verdict).toBe("pass")
  } finally {
    world.sweep()
  }
})

check("a test is run with what the nearest bunfig.toml above it preloads", () => {
  const root = repo({ "web/one.test.ts": NEEDS, "web/sets.ts": SETS, "plain.test.ts": PASSES })
  writeFileSync(join(root, "akasha/web/bunfig.toml"), '[test]\npreload = ["./sets.ts"]\n')
  expect(groupedBy(root, ["akasha"])).toEqual([
    { preloads: [], named: ["akasha/plain.test.ts"] },
    { preloads: [join(root, "akasha/web/sets.ts")], named: ["akasha/web/one.test.ts"] },
  ])
  expect(ranOver(root, ["akasha"], 2).verdict).toBe("pass")
})

check("the bunfig.toml at the root is left to the runner rather than handed over", () => {
  const root = repo({ "one.test.ts": NEEDS, "sets.ts": SETS })
  writeFileSync(join(root, "bunfig.toml"), '[test]\npreload = ["./akasha/sets.ts"]\n')
  expect(groupedBy(root, ["akasha"])).toEqual([{ preloads: [], named: ["akasha/one.test.ts"] }])
  expect(ranOver(root, ["akasha"], 1).verdict).toBe("pass")
})

check("a list past one batch is parted into batches, and nothing is lost", () => {
  expect(batchedOf([])).toEqual([[]])
  const named = Array.from({ length: BATCH * 2 + 1 }, (one, at) => `${at}.test.ts`)
  const batches = batchedOf(named)
  expect(batches.length).toBe(3)
  expect(batches[0]?.length).toBe(BATCH)
  expect(batches[2]?.length).toBe(1)
  expect(batches.flat()).toEqual(named)
})

check("a group past one batch is run as several, and the counts are the sum", () => {
  const held: Record<string, string> = {}
  const many = BATCH + 5
  for (let at = 0; at < many; at += 1) held[`one-${at}.test.ts`] = PASSES
  const done = ranOver(repo(held), ["akasha"], many)
  expect(plain(done.output).match(/Ran \d+ tests across \d+ files/g)?.length).toBe(2)
  expect(done.summary.files).toBe(many)
  expect(done.summary.passed).toBe(many)
  expect(done.verdict).toBe("pass")
})

check("a path named twice over is run once", () => {
  const root = repo({ "one.test.ts": PASSES })
  expect(groupedBy(root, ["akasha", "akasha/one.test.ts"])).toEqual([
    { preloads: [], named: ["akasha/one.test.ts"] },
  ])
})

check("what a bunfig.toml preloads is read out of it, a path against its own folder", () => {
  const at = join(repo({}), "akasha/bunfig.toml")
  writeFileSync(at, '[test]\npreload = ["./held.ts", "@named/held"]\n')
  expect(preloadsIn(at)).toEqual([join(dirname(at), "held.ts"), "@named/held"])
  writeFileSync(at, '[install]\nlinker = "hoisted"\n')
  expect(preloadsIn(at)).toEqual([])
})
