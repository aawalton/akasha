import { afterAll, expect, test } from "bun:test"
import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  alreadyRunning,
  ranOver,
} from "akasha/code/running/modules/code-tests/code-tests.module.code.ts"
import {
  CONFINER,
  confinedArgv,
  confinerHere,
  HELD_IN_HOME,
  hiddenUnder,
  unconfinable,
} from "akasha/code/running/modules/test-confinement/test-confinement.module.code.ts"
import {
  OPEN_PLACE,
  PLANTED,
  readsNoSecret,
  SECRET_PLACES,
} from "akasha/code/running/modules/test-confinement/test-confinement.module.test-fixtures.ts"
import { ran, ranAwaited } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function homePlanted(): string {
  const home = realpathSync(scratch.rootFor("test-confinement-"))
  for (const one of [...SECRET_PLACES, OPEN_PLACE]) {
    const at = join(home, one)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, PLANTED)
  }
  return home
}

const APART = !alreadyRunning()

function repoReading(home: string): string {
  const root = realpathSync(scratch.rootFor("test-confinement-repo-"))
  mkdirSync(join(root, "akasha"))
  writeFileSync(join(root, "akasha/one.test.ts"), readsNoSecret(home, APART))
  return root
}

async function withEnv<T>(held: Record<string, string>, run: () => Promise<T>): Promise<T> {
  const was = Object.keys(held).map((name) => [name, optionalEnv(name)] as const)
  Object.assign(process.env, held)
  try {
    return await run()
  } finally {
    for (const [name, one] of was) {
      if (one === undefined) delete process.env[name]
      else process.env[name] = one
    }
  }
}

function readConfined(home: string, one: string): string {
  const confiner = confinerHere()
  if (confiner === null) throw new Error(unconfinable())
  const hidden = hiddenUnder(home, HELD_IN_HOME, [])
  return ran([...confinedArgv(confiner, hidden, ["cat", join(home, one)], APART)]).out
}

test("the file the workstation's secrets are loaded from is a secret place", () => {
  expect(HELD_IN_HOME).toContain(".secrets.env")
  expect(HELD_IN_HOME).toContain(".config/sops")
})

test("every secret place under a home is found, and a place beside it named after it too", () => {
  const home = homePlanted()
  const found = hiddenUnder(home, HELD_IN_HOME, []).map((one) => one.path.slice(home.length + 1))
  expect(found).toEqual([
    ".claude/accounts/one/.credentials.json",
    ".config/sops",
    ".kube",
    ".secrets.env",
    ".secrets.env.bak",
    ".ssh",
  ])
})

test("a secret folder is covered by an empty folder and a secret file by an empty file", () => {
  const home = homePlanted()
  const argv = confinedArgv(CONFINER, hiddenUnder(home, HELD_IN_HOME, []), ["true"])
  expect(argv[argv.indexOf(join(home, ".ssh")) - 1]).toBe("--tmpfs")
  expect(argv[argv.indexOf(join(home, ".secrets.env")) - 1]).toBe("/dev/null")
  expect(argv).toContain("--unshare-pid")
  expect(argv.slice(-2)).toEqual(["--", "true"])
})

test("a run inside a test run shares the processes of the run it is inside", () => {
  expect(confinedArgv(CONFINER, [], ["true"], false)).not.toContain("--unshare-pid")
})

test("a secret place not on the machine is left out", () => {
  const home = realpathSync(scratch.rootFor("test-confinement-bare-"))
  expect(hiddenUnder(home, HELD_IN_HOME, ["/no/such/secret/place"])).toEqual([])
})

test("a process confined reads nothing of a secret, and still reads what is no secret", () => {
  const home = homePlanted()
  for (const one of SECRET_PLACES) expect(readConfined(home, one)).not.toContain(PLANTED)
  expect(readConfined(home, OPEN_PLACE)).toBe(PLANTED)
})

test("a test reads nothing of a secret file or another process's variables, in the overlay or out", async () => {
  const home = homePlanted()
  const root = repoReading(home)
  const holder = ranAwaited(["sleep", "6"], { env: { ...process.env, HELD_SECRET: PLANTED } })
  await withEnv({ HOME: home }, async () => {
    expect((await ranOver(root, ["akasha"], 1)).verdict).toBe("pass")
    expect((await ranOver(root, ["akasha"], 1, null, {})).verdict).toBe("pass")
  })
  await holder
}, 30000)

test("a machine with no confiner runs no test rather than running one unconfined", async () => {
  const root = repoReading(homePlanted())
  const empty = realpathSync(scratch.rootFor("test-confinement-path-"))
  await withEnv({ PATH: empty }, async () => {
    await expect(ranOver(root, ["akasha"], 1)).rejects.toThrow(unconfinable())
  })
})
