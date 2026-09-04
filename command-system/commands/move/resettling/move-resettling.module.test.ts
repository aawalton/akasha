import { afterAll, expect, test } from "bun:test"
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import {
  foldersOf,
  namedUnder,
  resettledSaid,
  resettledText,
  resettleOver,
  rootSpelt,
  STEM,
  settlingIn,
  settlingNamed,
  settlingsUnder,
  TAIL,
} from "./move-resettling.module.code.ts"

const ROOT = "/home/one/repos/akasha"

const HOME = "/home/one"

const SPELT = rootSpelt(ROOT, HOME)

const MOVED = new Map([["akasha/a/b.ts", "akasha/c/b.ts"]])

const world = scratchWorld()

function scratch(): string {
  return world.rootFor("move-resettling-")
}

function settlingAt(under: string, name: string, body: string): string {
  const at = join(under, `${STEM}${name}${TAIL}`)
  writeFileSync(at, body)
  return at
}

afterAll(world.sweep)

test("the root is spelled as itself and as the ways a home folder is written", () => {
  expect(SPELT).toEqual([ROOT, "$HOME/repos/akasha", "${HOME}/repos/akasha", "~/repos/akasha"])
})

test("a root no home folder holds is spelled only as itself", () => {
  expect(rootSpelt("/srv/akasha", HOME)).toEqual(["/srv/akasha"])
  expect(rootSpelt(ROOT, undefined)).toEqual([ROOT])
})

test("a path that moved is repointed under every spelling of the root", () => {
  for (const one of SPELT) {
    expect(resettledText(`bun ${one}/akasha/a/b.ts`, SPELT, MOVED)).toBe(`bun ${one}/akasha/c/b.ts`)
  }
})

test("the spelling of the root a document used is the spelling written back", () => {
  const said = resettledText("bun $HOME/repos/akasha/akasha/a/b.ts", SPELT, MOVED)
  expect(said).toBe("bun $HOME/repos/akasha/akasha/c/b.ts")
  expect(said).not.toContain(HOME)
})

test("a folder that moved carries the files named beneath it", () => {
  const moved = new Map([["akasha/h/agent-hook", "akasha/h/agent-hooks"]])
  const was = "bun $HOME/repos/akasha/akasha/h/agent-hook/block-biome/block-biome.code.ts"
  expect(resettledText(was, SPELT, moved)).toBe(
    "bun $HOME/repos/akasha/akasha/h/agent-hooks/block-biome/block-biome.code.ts"
  )
})

test("a name carrying more of a segment than the path that moved is left alone", () => {
  const moved = new Map([["akasha/h/agent-hook", "akasha/h/agent-hooks"]])
  const was = "bun $HOME/repos/akasha/akasha/h/agent-hooks/block-biome/block-biome.code.ts"
  expect(resettledText(was, SPELT, moved)).toBe(was)
})

test("a path with no spelling of the root before it is left alone", () => {
  expect(resettledText("akasha/a/b.ts", SPELT, MOVED)).toBe("akasha/a/b.ts")
  expect(resettledText("/other/akasha/a/b.ts", SPELT, MOVED)).toBe("/other/akasha/a/b.ts")
})

test("a document naming nothing that moved yields no place to rewrite", () => {
  expect(namedUnder("bun $HOME/repos/akasha/akasha/z/y.ts", SPELT, MOVED)).toEqual([])
})

test("a settings document is told by the stem and the tail of its name", () => {
  expect(settlingNamed(`/seat/${STEM}abc${TAIL}`)).toBe(true)
  expect(settlingNamed(`/seat/${STEM}${TAIL}`)).toBe(false)
  expect(settlingNamed("/seat/settings.json")).toBe(false)
  expect(settlingNamed(`/seat/${STEM}abc.txt`)).toBe(false)
})

test("a command line names its document after the flag or joined to the flag", () => {
  expect(settlingIn(["claude", "--settings", "/seat/one.json"])).toBe("/seat/one.json")
  expect(settlingIn(["claude", "--settings=/seat/one.json"])).toBe("/seat/one.json")
  expect(settlingIn(["claude", "--other", "/seat/one.json"])).toBe(null)
})

test("the folder looked in is read off what a live command line names", () => {
  expect(foldersOf([`/seat/${STEM}one${TAIL}`, `/seat/${STEM}two${TAIL}`])).toEqual(["/seat"])
  expect(foldersOf([])).toEqual([])
})

test("only the documents the spawner names are looked at", () => {
  const under = scratch()
  const one = settlingAt(under, "one", "{}")
  writeFileSync(join(under, "other.json"), "{}")
  mkdirSync(join(under, `${STEM}folder${TAIL}`))
  expect(settlingsUnder(under)).toEqual([one])
  expect(settlingsUnder(join(under, "nowhere"))).toEqual([])
})

test("a document no live process names is rewritten beside the one that is", () => {
  const under = scratch()
  const body = "bun $HOME/repos/akasha/akasha/a/b.ts"
  const live = settlingAt(under, "live", body)
  const idle = settlingAt(under, "zidle", body)
  const said = resettleOver(ROOT, MOVED, true, { held: [live], home: HOME })
  expect(said.rewritten).toEqual([live, idle])
  expect(readFileSync(idle, "utf8")).toBe("bun $HOME/repos/akasha/akasha/c/b.ts")
})

test("no live command line means no folder is looked in", () => {
  const under = scratch()
  const at = settlingAt(under, "one", "bun $HOME/repos/akasha/akasha/a/b.ts")
  const said = resettleOver(ROOT, MOVED, true, { held: [], home: HOME })
  expect(said.rewritten).toEqual([])
  expect(readFileSync(at, "utf8")).toBe("bun $HOME/repos/akasha/akasha/a/b.ts")
})

test("a dry run names what it would rewrite and writes nothing", () => {
  const under = scratch()
  const was = "bun $HOME/repos/akasha/akasha/a/b.ts"
  const at = settlingAt(under, "dry", was)
  const said = resettleOver(ROOT, MOVED, false, { held: [at], home: HOME })
  expect(said.rewritten).toEqual([at])
  expect(readFileSync(at, "utf8")).toBe(was)
})

test("a landing rewrites the document and leaves the untouched one alone", () => {
  const under = scratch()
  const at = settlingAt(under, "one", "bun $HOME/repos/akasha/akasha/a/b.ts")
  const other = settlingAt(under, "two", "bun $HOME/repos/akasha/akasha/z/y.ts")
  const said = resettleOver(ROOT, MOVED, true, { held: [at], home: HOME })
  expect(said.rewritten).toEqual([at])
  expect(said.unchanged).toEqual([other])
  expect(said.unwritten).toEqual([])
  expect(readFileSync(at, "utf8")).toBe("bun $HOME/repos/akasha/akasha/c/b.ts")
})

test("a document that would not take the rewrite is named and the others still take it", () => {
  const under = scratch()
  const body = "bun $HOME/repos/akasha/akasha/a/b.ts"
  const one = settlingAt(under, "aaa", body)
  const shut = settlingAt(under, "zzz", body)
  chmodSync(shut, 0o400)
  const said = resettleOver(ROOT, MOVED, true, { held: [one], home: HOME })
  chmodSync(shut, 0o600)
  expect(said.rewritten).toEqual([one])
  expect(said.unwritten.map((held) => held.path)).toEqual([shut])
  expect(readFileSync(shut, "utf8")).toBe(body)
})

test("what is reported names each document rather than counting them", () => {
  const said = resettledSaid(
    { rewritten: ["/seat/one"], unchanged: [], unwritten: [{ path: "/seat/two", why: "denied" }] },
    ["/seat/one"],
    false
  )
  expect(said.some((one) => one.includes("/seat/one"))).toBe(true)
  expect(said.some((one) => one.includes("/seat/two") && one.includes("denied"))).toBe(true)
  expect(said.some((one) => one.includes("relaunching"))).toBe(true)
})

test("nothing named as moved is answered as no document naming what moved", () => {
  const under = scratch()
  const at = settlingAt(under, "one", "bun $HOME/repos/akasha/akasha/z/y.ts")
  const said = resettleOver(ROOT, new Map(), true, { held: [at], home: HOME })
  expect(said.rewritten).toEqual([])
  expect(resettledSaid(said, [], false)[0]).toBe("no agent settings document named what moved")
})
