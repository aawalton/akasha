import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  hidingFor,
  NOTICE_AT,
  type Place,
  placeIn,
} from "akasha/agent/modules/withheld-hiding/withheld-hiding.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { WITHHELD } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import {
  GAME_MASTER_SEAT,
  LORE_AT,
  loreWorld,
  OTHER_SEAT,
  UNDER_GAME_MASTER,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const CODE = join(import.meta.dir, "withheld-hiding.module.code.ts")

const scratch = scratchWorld()

afterAll(scratch.sweep)

const root = loreWorld(scratch)

mkdirSync(join(root, ".git", "objects"), { recursive: true })

mkdirSync(dirname(join(root, LORE_AT)), { recursive: true })

writeFileSync(join(root, LORE_AT), "held\n")

function placeAnew(): Place {
  const home = realpathSync(scratch.rootFor("withheld-hiding-home-"))
  const runtime = realpathSync(scratch.rootFor("withheld-hiding-runtime-"))
  const claude = join(home, ".claude", "accounts", "one")
  mkdirSync(join(claude, "shell-snapshots"), { recursive: true })
  writeFileSync(join(home, ".claude.json"), "{}\n")
  return { root, home, claude, runtime, tmux: join(runtime, "tmux-absent") }
}

function pairsIn(args: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < args.length; at += 1) {
    const one = args[at]
    if (one === "--tmpfs") found.push(`${one} ${args[at + 1]}`)
    if (one === "--ro-bind") found.push(`${one} ${args[at + 1]} ${args[at + 2]}`)
    if (one === "--unshare-net") found.push(one)
  }
  return found
}

test("a seat of another role is hidden nothing", () => {
  expect(hidingFor(placeAnew(), OTHER_SEAT)).toEqual([])
  expect(hidingFor(placeAnew(), null)).toEqual([])
})

test("a game master's call reads each withheld page as the refusal", () => {
  const place = placeAnew()
  const notice = join(place.home, NOTICE_AT)

  const pairs = pairsIn(hidingFor(place, GAME_MASTER_SEAT))

  expect(pairs).toContain(`--ro-bind ${notice} ${join(root, LORE_AT)}`)
  expect(readFileSync(notice, "utf8")).toBe(`${WITHHELD.join("\n")}\n`)
})

test("a game master's call reaches no git store, and so no tree and no history", () => {
  const pairs = pairsIn(hidingFor(placeAnew(), GAME_MASTER_SEAT))

  expect(pairs).toContain(`--tmpfs ${join(root, ".git")}`)
})

test("a game master's call has no network and no socket of the user's session", () => {
  const place = placeAnew()

  const pairs = pairsIn(hidingFor(place, GAME_MASTER_SEAT))

  expect(pairs).toContain("--unshare-net")
  expect(pairs).toContain(`--tmpfs ${place.runtime}`)
  expect(pairs.some((one) => one.includes("tmux-absent"))).toBe(false)
})

test("a game master's call writes nothing in the home folder and reads no transcript", () => {
  const place = placeAnew()
  const snapshots = join(place.claude, "shell-snapshots")
  const notice = join(place.home, NOTICE_AT)

  const pairs = pairsIn(hidingFor(place, GAME_MASTER_SEAT))

  expect(pairs[1]).toBe(`--ro-bind ${place.home} ${place.home}`)
  expect(pairs).toContain(`--tmpfs ${join(place.home, ".claude")}`)
  expect(pairs).toContain(`--ro-bind ${snapshots} ${snapshots}`)
  expect(pairs).toContain(`--ro-bind ${notice} ${join(place.home, ".claude.json")}`)
})

test("a subagent under a game master's seat is hidden what the seat is", () => {
  const place = placeAnew()

  expect(hidingFor(place, UNDER_GAME_MASTER)).toEqual(hidingFor(place, GAME_MASTER_SEAT))
})

test("the place is read off the environment the harness hands the shell", () => {
  const env = { HOME: "/h", CLAUDE_CONFIG_DIR: "/h/.claude/accounts/a", XDG_RUNTIME_DIR: "/run/u" }

  expect(placeIn(env, "/h/repos/akasha", 7)).toEqual({
    root: "/h/repos/akasha",
    home: "/h",
    claude: "/h/.claude/accounts/a",
    runtime: "/run/u",
    tmux: "/tmp/tmux-7",
  })
  expect(placeIn({ HOME: "/h", TMUX_TMPDIR: "/t" }, "/r", 7)).toMatchObject({
    claude: "/h/.claude",
    runtime: null,
    tmux: "/t/tmux-7",
  })
})

test("run on its own, the module prints one argument a line for the seat AGENT_ID names", () => {
  const place = placeAnew()
  const env = {
    ...process.env,
    HOME: place.home,
    CLAUDE_CONFIG_DIR: place.claude,
    XDG_RUNTIME_DIR: place.runtime ?? "",
  }

  const other = ran(["bun", CODE, root], { env: { ...env, AGENT_ID: OTHER_SEAT } })
  const held = ran(["bun", CODE, root], { env: { ...env, AGENT_ID: GAME_MASTER_SEAT } })

  expect(other.out).toBe("")
  expect(held.out.split("\n")).toContain("--unshare-net")
  expect(held.out.split("\n")).toContain(join(root, LORE_AT))
})
