import { expect, test } from "bun:test"
import { join } from "node:path"
import { rootOf } from "../../hook-answer/hook-answer.module.code.ts"
import { payloadOf } from "../../hook-payload/hook-payload.module.code.ts"
import { biomeIn, refusalIn, SCOPE } from "./block-biome.agent-hook.code.ts"

const SCRIPT = join(import.meta.dir, "block-biome.agent-hook.code.ts")

const ROOT = rootOf(import.meta.path)

function judged(command: string, from: string = ROOT): string | null {
  return refusalIn(command, from, ROOT)
}

test("a biome call is refused, reading as well as writing", () => {
  for (const one of ["biome check .", "biome check --write akasha/", "biome format akasha/"]) {
    expect(judged(one)).toContain("refused this call")
  }
})

test("the refusal names the command that answers instead", () => {
  const said = judged("biome check .") ?? ""
  expect(said).toContain("akasha lint")
  expect(said).toContain("akasha lint --file-path <path>")
  expect(said).toContain("Say `akasha lint --help` for what it takes.")
})

test("biome reached by a path is the same call", () => {
  expect(judged("node_modules/.bin/biome check .")).not.toBeNull()
  expect(judged("/usr/local/bin/biome check .")).not.toBeNull()
  expect(judged("./node_modules/.bin/biome lint akasha/")).not.toBeNull()
})

test("biome reached through a runner is the same call", () => {
  for (const one of ["npx biome check .", "bunx biome check .", "npx --yes biome check ."]) {
    expect(judged(one)).not.toBeNull()
  }
})

test("a prefix that sets the call up is stepped over", () => {
  expect(judged("sudo biome check .")).not.toBeNull()
  expect(judged("BIOME_LOG=one biome check .")).not.toBeNull()
})

test("a runner running something that is not biome is let through", () => {
  expect(judged("npx tsc --noEmit")).toBeNull()
  expect(judged("bunx prettier --check one.ts")).toBeNull()
})

test("a program whose name merely carries biome is let through", () => {
  for (const one of ["biomes check .", "mybiome run", "echo biome"]) expect(judged(one)).toBeNull()
})

test("a package script reaching biome is not read here", () => {
  expect(judged("npm run lint")).toBeNull()
  expect(judged("bun run lint")).toBeNull()
})

test("a refusal answers the whole call, wherever it stands in the chain", () => {
  expect(judged("ls && biome check .")).not.toBeNull()
  expect(judged("biome check . ; echo done")).not.toBeNull()
})

test("a call inside a quoted run is not read as a call", () => {
  expect(judged('echo "biome check ."')).toBeNull()
})

test("a call running outside the repository this hook stands in is let through", () => {
  expect(judged("biome check .", "/var/tmp/probe")).toBeNull()
})

test("a call stating no working directory is judged as though it ran here", () => {
  expect(judged("biome check .", "")).not.toBeNull()
})

test("the head of a segment is what is read, so biome as an argument is not a call", () => {
  expect(biomeIn("cat biome.json")).toBe(false)
  expect(biomeIn("rg biome akasha/")).toBe(false)
  expect(biomeIn("biome")).toBe(true)
})

test("the scope names the hole in this rule rather than hiding it", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("a package script reaching biome")
  expect(said).toContain("was taken")
  expect(said).toContain("prettier")
  expect(said).toContain("is NOT a finding that it is safe")
  expect(said).toContain("WHERE THE CALL RUNS")
})

test("the hook refuses on stdin with exit 2 and a blocking decision", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT], {
    stdin: Buffer.from(payloadOf("biome check .", ROOT)),
  })
  expect(ran.exitCode).toBe(2)
  const said: unknown = JSON.parse(ran.stdout.toString())
  expect(said).toMatchObject({ decision: "block" })
  expect((said as { reason: string }).reason).toContain("akasha lint")
})

test("the hook stands aside on stdin for a call that is not biome", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT], {
    stdin: Buffer.from(payloadOf("npm run lint", ROOT)),
  })
  expect(ran.exitCode).toBe(0)
  expect(ran.stdout.toString()).toBe("")
})

test("a payload that will not parse lets the call through rather than refusing it", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from("{") })
  expect(ran.exitCode).toBe(5)
  expect(ran.stderr.toString()).toContain("the call was not refused")
})

test("the hook prints its scope when it is asked", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(ran.exitCode).toBe(0)
  expect(ran.stdout.toString()).toContain("NOT REACHED")
})
