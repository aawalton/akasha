import { afterAll, expect, test } from "bun:test"
import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import {
  AWAY,
  REFUSAL,
  refusalFor,
  SCOPE,
} from "akasha/agent/hook/agent-hook/block-world-builder-lore/block-world-builder-lore.agent-hook.code.ts"
import { storeIn, TREES } from "akasha/file/modules/git-place/git-place.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { ASKED } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import {
  GAME_MASTER_SEAT,
  LORE_AT,
  LORE_NAME,
  loreWorld,
  OTHER_SEAT,
  UNDER_GAME_MASTER,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const root = loreWorld(scratch)

const OTHER = "agent/seat/pages/other/other.seat.ts"

const SESSION = "01a0d600-0000-7000-8000-00000000000a"

const OTHER_SESSION = "01a0d600-0000-7000-8000-00000000000b"

const FOLDER = "-held-folder"

const config = realpathSync(scratch.rootFor("world-builder-lore-config-"))

const transcripts = join(config, "projects", FOLDER)

const transcript = join(transcripts, `${SESSION}.jsonl`)

const otherTranscript = join(transcripts, `${OTHER_SESSION}.jsonl`)

const ownSubagent = join(transcripts, SESSION, "subagents", "agent-one.jsonl")

const temps = realpathSync(scratch.rootFor("world-builder-lore-temps-"))

const ownScratch = join(temps, FOLDER, SESSION, "scratchpad", "note.txt")

const otherScratch = join(temps, FOLDER, OTHER_SESSION, "scratchpad", "note.txt")

const scratchCopy = join(temps, FOLDER, SESSION, "kept", LORE_AT)

for (const one of [
  transcript,
  otherTranscript,
  ownSubagent,
  ownScratch,
  otherScratch,
  scratchCopy,
]) {
  mkdirSync(dirname(one), { recursive: true })
  writeFileSync(one, "{}\n")
}

function payloadOf(
  tool: string,
  input: Record<string, string>,
  from: string = root
): Record<string, unknown> {
  return {
    hook_event_name: "PreToolUse",
    session_id: SESSION,
    transcript_path: transcript,
    tool_name: tool,
    tool_input: input,
    cwd: from,
  }
}

function readOf(at: string): Record<string, unknown> {
  return payloadOf("Read", { file_path: at })
}

function grepOf(at: string | null, from: string = root): Record<string, unknown> {
  return payloadOf(
    "Grep",
    at === null ? { pattern: "needle" } : { pattern: "needle", path: at },
    from
  )
}

function bashOf(command: string): Record<string, unknown> {
  return payloadOf("Bash", { command })
}

test("a game master's Read of the world builder's lore is refused", () => {
  expect(refusalFor(readOf(join(root, LORE_AT)), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
  expect(refusalFor(readOf(LORE_AT), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
})

test("a subagent under a game master's seat is refused as the seat is", () => {
  expect(refusalFor(readOf(join(root, LORE_AT)), root, UNDER_GAME_MASTER)).toBe(REFUSAL)
})

test("a Read of a copy in another tree, or of a link to the page, is refused", () => {
  const copy = storeIn(root, TREES, "other", LORE_AT)
  mkdirSync(dirname(copy), { recursive: true })
  writeFileSync(copy, "copy\n")
  const away = realpathSync(scratch.rootFor("world-builder-lore-away-"))
  symlinkSync(join(root, LORE_AT), join(away, "pointer.ts"))
  expect(refusalFor(readOf(copy), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
  expect(refusalFor(readOf(join(away, "pointer.ts")), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
})

test("a game master's Read of any other file is let through", () => {
  expect(refusalFor(readOf(join(root, OTHER)), root, GAME_MASTER_SEAT)).toBeNull()
})

test("a game master's Grep over a folder holding the page is refused", () => {
  expect(refusalFor(grepOf(root), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
  expect(refusalFor(grepOf("story"), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
  expect(refusalFor(grepOf(join(root, LORE_AT)), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
})

test("a game master's Grep naming no path searches the folder it runs in", () => {
  expect(refusalFor(grepOf(null), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
  expect(refusalFor(grepOf(null, join(root, "agent")), root, GAME_MASTER_SEAT)).toBeNull()
})

test("a game master's Grep over a folder holding no withheld page is let through", () => {
  expect(refusalFor(grepOf("agent"), root, GAME_MASTER_SEAT)).toBeNull()
})

test("a game master's shell line reaching the page is refused", () => {
  expect(refusalFor(bashOf(`cat ${LORE_AT}`), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
  expect(refusalFor(bashOf(`grep -c x ${LORE_NAME}`), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
  expect(refusalFor(bashOf("rg needle"), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
  expect(refusalFor(bashOf("git log -p"), root, GAME_MASTER_SEAT)).toBe(REFUSAL)
})

test("a game master's shell line reaching nothing withheld is let through", () => {
  expect(refusalFor(bashOf(`cat ${OTHER}`), root, GAME_MASTER_SEAT)).toBeNull()
  expect(refusalFor(bashOf("git log --oneline"), root, GAME_MASTER_SEAT)).toBeNull()
})

test("a game master's Read outside the checkout and its own session is refused", () => {
  for (const one of [
    otherTranscript,
    otherScratch,
    join(config, "settings.json"),
    "/etc/hostname",
  ]) {
    expect(refusalFor(readOf(one), root, GAME_MASTER_SEAT, temps)).toBe(AWAY)
  }
  expect(refusalFor(readOf(otherTranscript), root, UNDER_GAME_MASTER, temps)).toBe(AWAY)
})

test("a game master's Grep outside the checkout and its own session is refused", () => {
  for (const one of [temps, config, transcripts, dirname(root), "/var/tmp", homedir()]) {
    expect(refusalFor(grepOf(one), root, GAME_MASTER_SEAT, temps)).toBe(AWAY)
  }
  expect(refusalFor(grepOf(null, temps), root, GAME_MASTER_SEAT, temps)).toBe(AWAY)
})

test("a game master's Read and Grep inside its own session are let through", () => {
  for (const one of [transcript, ownSubagent, ownScratch]) {
    expect(refusalFor(readOf(one), root, GAME_MASTER_SEAT, temps)).toBeNull()
  }
  expect(refusalFor(grepOf(dirname(ownScratch)), root, GAME_MASTER_SEAT, temps)).toBeNull()
  expect(refusalFor(grepOf(join(transcripts, SESSION)), root, GAME_MASTER_SEAT, temps)).toBeNull()
})

test("a copy of a withheld page inside its own session is still refused", () => {
  expect(refusalFor(readOf(scratchCopy), root, GAME_MASTER_SEAT, temps)).toBe(REFUSAL)
})

test("a payload naming no session leaves a game master only the checkout", () => {
  const bare = { tool_name: "Read", tool_input: { file_path: ownScratch }, cwd: root }
  expect(refusalFor(bare, root, GAME_MASTER_SEAT, temps)).toBe(AWAY)
  const climbing = { ...readOf(ownScratch), session_id: ".." }
  expect(refusalFor(climbing, root, GAME_MASTER_SEAT, temps)).toBe(AWAY)
})

test("a seat of another role is let through every tool", () => {
  expect(refusalFor(readOf(join(root, LORE_AT)), root, OTHER_SEAT)).toBeNull()
  expect(refusalFor(grepOf(root), root, OTHER_SEAT)).toBeNull()
  expect(refusalFor(bashOf(`cat ${LORE_AT}`), root, OTHER_SEAT)).toBeNull()
  expect(refusalFor(readOf(otherTranscript), root, OTHER_SEAT, temps)).toBeNull()
  expect(refusalFor(grepOf("/var/tmp"), root, OTHER_SEAT, temps)).toBeNull()
})

test("a caller naming no agent is let through", () => {
  expect(refusalFor(readOf(join(root, LORE_AT)), root, null)).toBeNull()
})

test("a tool this does not judge is let through", () => {
  const listing = payloadOf("Glob", { pattern: "**/*" })
  expect(refusalFor(listing, root, GAME_MASTER_SEAT)).toBeNull()
})

test("the refusal says the page is the world builder's and what to ask instead", () => {
  expect(REFUSAL).toContain("block-world-builder-lore refused this call.")
  expect(REFUSAL).toContain("a lore page that is the world builder's")
  expect(REFUSAL).toContain(`Ask your game's world builder "${ASKED}" instead`)
  expect(REFUSAL).not.toContain(LORE_NAME)
  expect(REFUSAL).not.toContain("sealed")
  expect(AWAY).toContain("block-world-builder-lore refused this call.")
  expect(AWAY).toContain("your own session")
  expect(AWAY).not.toContain(LORE_NAME)
})

test("what this does not reach is printed", () => {
  expect(SCOPE.join("\n")).toContain("NOT REACHED")
  expect(SCOPE.join("\n")).toContain("interpreter")
})
