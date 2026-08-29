import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Judging } from "../checks-system/judging/judging.module.code.ts"
import { bytesOf as bytes } from "../testing-system/bodying/bodying.module.code.ts"
import { gitIn as git } from "../testing-system/gitting/gitting.module.code.ts"
import { until } from "../testing-system/waiting/waiting.module.code.ts"
import { holding, LOCK_AT } from "./holding.module.code.ts"
import { baseOf, landing } from "./landing.module.code.ts"
import { CARRIED } from "./landing.module.test-fixtures.ts"
import { scratchWorld } from "./scratching/scratching.module.code.ts"

const HOLDING_AT = new URL("./holding.module.code.ts", import.meta.url).pathname

const LANDING_AT = new URL("./landing.module.code.ts", import.meta.url).pathname

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-holding-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

const ADMITS: Judging = { named: ["admits"], over: () => [] }

const indexIn = (root: string): string => join(root, ".git/data/index")

const AT_ONCE = ["b", "c", "d", "e"]

const idOf = (one: string): string =>
  `01a04e11-0000-7000-8000-00000000000${AT_ONCE.indexOf(one) + 3}`

const pageOf = (one: string): string =>
  `export const ${one} = { id: "${idOf(one)}", pageTypeSlug: "domain", slug: "${one}" }\n`

const running = (said: string): Bun.Subprocess => Bun.spawn(["bun", "-e", said], { stderr: "pipe" })

function marking(root: string, at: string, name: string): string {
  return `import { holding } from ${JSON.stringify(HOLDING_AT)}
import { appendFileSync } from "node:fs"
holding(${JSON.stringify(root)}, () => {
  appendFileSync(${JSON.stringify(at)}, "in ${name}\\n")
  Bun.sleepSync(300)
  appendFileSync(${JSON.stringify(at)}, "out ${name}\\n")
})`
}

function sitting(root: string): string {
  return `import { holding } from ${JSON.stringify(HOLDING_AT)}
holding(${JSON.stringify(root)}, () => Bun.sleepSync(60000))`
}

function landsOn(root: string, path: string, body: string, ready: string, go: string): string {
  return `import { landing } from ${JSON.stringify(LANDING_AT)}
import { existsSync, writeFileSync } from "node:fs"
writeFileSync(${JSON.stringify(ready)}, "ready")
while (!existsSync(${JSON.stringify(go)})) Bun.sleepSync(1)
const said = landing(
  ${JSON.stringify(root)},
  [{ path: ${JSON.stringify(path)}, body: new TextEncoder().encode(${JSON.stringify(body)}) }],
  "held",
  { named: ["admits"], over: () => [] }
)
if ("refusals" in said) throw new Error(said.refusals.join(" "))`
}

async function heldBy(root: string): Promise<Bun.Subprocess> {
  const kid = running(sitting(root))
  expect(await until(() => existsSync(join(root, LOCK_AT)))).toBe(true)
  return kid
}

async function killed(kid: Bun.Subprocess): Promise<void> {
  kid.kill("SIGKILL")
  await kid.exited
}

test("callers asking at once take the hold one at a time, and none overlaps another", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const at = join(root, "witness.txt")
  const kids = ["a", "b", "c", "d"].map((one) => running(marking(root, at, one)))
  expect(await Promise.all(kids.map((one) => one.exited))).toEqual([0, 0, 0, 0])
  const said = readFileSync(at, "utf8").trim().split("\n")
  expect(said.length).toBe(8)
  for (let held = 0; held < said.length; held += 2) {
    expect(said[held]).toStartWith("in ")
    expect(said[held + 1]).toBe(`out ${said[held]?.slice(3)}`)
  }
})

test("landings at once each land, and none takes another back", async () => {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, CARRIED, "held", ADMITS)
  const was = baseOf(root)
  const go = join(root, "go")
  const ready = (one: string): string => join(root, `ready-${one}`)
  const kids = AT_ONCE.map((one) =>
    running(landsOn(root, `akasha/${one}.domain.ts`, pageOf(one), ready(one), go))
  )
  expect(await until(() => AT_ONCE.every((one) => existsSync(ready(one))))).toBe(true)
  writeFileSync(go, "go")
  expect(await Promise.all(kids.map((one) => one.exited))).toEqual(AT_ONCE.map(() => 0))
  const carried = CARRIED.map((one) => one.path)
  expect(git(root, ["ls-tree", "--name-only", "-r", "HEAD", "akasha/"]).trim().split("\n")).toEqual(
    [...AT_ONCE.map((one) => `akasha/${one}.domain.ts`), ...carried].sort()
  )
  expect(git(root, ["rev-list", "--count", `${was}..HEAD`]).trim()).toBe(String(AT_ONCE.length))
  for (const one of AT_ONCE) {
    expect(existsSync(join(indexIn(root), `identity/page/id/${idOf(one)}.jsonl`))).toBe(true)
    expect(existsSync(join(indexIn(root), `identity/domain/slug/${one}.jsonl`))).toBe(true)
  }
})

test("a hold whose holder is gone is taken rather than waited on", async () => {
  const root = repoWith({ "one.txt": "committed" })
  await killed(await heldBy(root))
  expect(existsSync(join(root, LOCK_AT))).toBe(true)
  const from = Date.now()
  expect(holding(root, () => "held", 10000)).toBe("held")
  expect(Date.now() - from).toBeLessThan(2000)
})

test("a landing after a holder was killed outright still lands", async () => {
  const root = repoWith({ "one.txt": "committed" })
  await killed(await heldBy(root))
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, "new.txt"), "utf8")).toBe("proposed")
  expect(existsSync(join(root, LOCK_AT))).toBe(false)
})

test("a caller that waits out the hold is refused, and the landing it would have run never runs", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const kid = await heldBy(root)
  let ran = false
  let why = ""
  try {
    holding(
      root,
      () => {
        ran = true
        return landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
      },
      200
    )
  } catch (thrown) {
    why = thrown instanceof Error ? thrown.message : String(thrown)
  }
  expect(why).toContain("this change was not judged and nothing was written")
  expect(ran).toBe(false)
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(baseOf(root)).toBe(was)
  await killed(kid)
})

test("a hold is released however the act inside it ends, so one failure wedges nothing after it", () => {
  const root = repoWith({ "one.txt": "committed" })
  const at = join(root, LOCK_AT)
  let stood = false
  expect(() =>
    holding(root, () => {
      stood = existsSync(at)
      throw new Error("thrown for the test")
    })
  ).toThrow("thrown for the test")
  expect(stood).toBe(true)
  expect(existsSync(at)).toBe(false)
  const throwing: Judging = {
    named: ["throwing"],
    over: () => {
      throw new Error("thrown for the test")
    },
  }
  expect(() =>
    landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", throwing)
  ).toThrow("thrown for the test")
  expect(existsSync(at)).toBe(false)
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(existsSync(at)).toBe(false)
})
