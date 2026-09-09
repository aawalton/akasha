import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"

const LANES = 40

const SEEDED = "seed.txt"

const GO = "go"

const READY = "ready-"
const SPENT = "spent-"

const WAITED = 120000

const TICK = 1

export type Lane = {
  readonly name: string
  readonly milliseconds: number
}

export type Measured = {
  readonly lanes: number
  readonly landed: number
  readonly wallSeconds: number
  readonly lane: readonly number[]
}

export function percentileOf(sorted: readonly number[], at: number): number {
  if (sorted.length === 0) return 0
  const held = Math.min(sorted.length - 1, Math.floor((at / 100) * sorted.length))
  return sorted[held] ?? 0
}

export function ratedIn(landed: number, wallSeconds: number): number {
  return wallSeconds <= 0 ? 0 : landed / wallSeconds
}

export function linesFor(said: Measured): readonly string[] {
  const sorted = [...said.lane].sort((one, two) => one - two)
  return [
    `lanes\t${said.lanes}`,
    `landed\t${said.landed}`,
    `wall\t${said.wallSeconds.toFixed(2)}s`,
    `rate\t${ratedIn(said.landed, said.wallSeconds).toFixed(1)}/s`,
    `lane p50\t${percentileOf(sorted, 50)}ms`,
    `lane p90\t${percentileOf(sorted, 90)}ms`,
    `lane p99\t${percentileOf(sorted, 99)}ms`,
    `lane max\t${sorted[sorted.length - 1] ?? 0}ms`,
  ]
}

function namesOf(many: number): readonly string[] {
  return Array.from({ length: many }, (_, at) => `lane${String(at).padStart(3, "0")}`)
}

function seeded(scratch: ReturnType<typeof scratchWorld>): string {
  const root = scratch.rootFor("akasha-landing-throughput-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  writeFileSync(join(root, SEEDED), "held")
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

function landsOn(landingAt: string, root: string, name: string): string {
  return `import { landing } from ${JSON.stringify(landingAt)}
import { existsSync, writeFileSync } from "node:fs"
writeFileSync(${JSON.stringify(join(root, `${READY}${name}`))}, "ready")
while (!existsSync(${JSON.stringify(join(root, GO))})) Bun.sleepSync(${TICK})
const began = Date.now()
const said = await landing(
  ${JSON.stringify(root)},
  [{ kind: "add", path: ${JSON.stringify(`${name}.txt`)}, content: "held\\n" }],
  "held",
  { named: ["admits"], over: () => [] }
)
writeFileSync(${JSON.stringify(join(root, `${SPENT}${name}`))}, String(Date.now() - began))
if ("refusals" in said) throw new Error(said.refusals.join(" "))`
}

async function readyIn(root: string, names: readonly string[]): Promise<undefined> {
  const until = Date.now() + WAITED
  while (Date.now() < until) {
    if (names.every((one) => existsSync(join(root, `${READY}${one}`)))) return
    await Bun.sleep(TICK)
  }
  throw new Error(`the lanes were not all at the gate within ${WAITED / 1000}s`)
}

function laneIn(root: string, name: string): number {
  const at = join(root, `${SPENT}${name}`)
  return existsSync(at) ? Number(readFileSync(at, "utf8")) : 0
}

export function failingIn(codes: readonly number[], why: string | null): readonly string[] {
  const failed = codes.filter((one) => one !== 0).length
  if (failed === 0) return []
  return [`failed\t${failed}`, `why\t${why ?? "the lane said nothing"}`]
}

async function whyOfFirst(
  kids: readonly Bun.Subprocess[],
  codes: readonly number[]
): Promise<string | null> {
  const at = codes.indexOf(1)
  const kid = at < 0 ? undefined : kids[at]
  if (kid === undefined) return null
  const said = await new Response(kid.stderr as ReadableStream).text()
  return said.trim().split("\n").filter(Boolean).slice(-1)[0] ?? null
}

export async function measured(from: string): Promise<readonly string[]> {
  const landingAt = join(from, "commands/modules/landing/landing.module.code.ts")
  const scratch = scratchWorld()
  try {
    const root = seeded(scratch)
    const names = namesOf(LANES)
    const kids = names.map((one) =>
      Bun.spawn(["bun", "-e", landsOn(landingAt, root, one)], { stderr: "pipe" })
    )
    await readyIn(root, names)
    const began = Date.now()
    writeFileSync(join(root, GO), GO)
    const codes = await Promise.all(kids.map((one) => one.exited))
    const wallSeconds = (Date.now() - began) / 1000
    return [
      ...linesFor({
        lanes: LANES,
        landed: codes.filter((one) => one === 0).length,
        wallSeconds,
        lane: names.map((one) => laneIn(root, one)),
      }),
      ...failingIn(codes, await whyOfFirst(kids, codes)),
    ]
  } finally {
    scratch.sweep()
  }
}
