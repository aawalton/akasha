import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  bridgeSessionAt,
  bridgeSessionIn,
  bridgeSessionPoll,
  publicSessionOf,
  TAIL_BYTES,
} from "akasha/agent/seat/session/modules/seat-bridge-session/seat-bridge-session.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const AGENT = "01a0c43b-c850-7000-bf18-1f9984f6d268"

const BRIDGED = "cse_01BY2EZJe6W8MkFJ9XHyw6ia"

const LINKED = "session_01BY2EZJe6W8MkFJ9XHyw6ia"

const LATER = "cse_0164iiws5Ysdz2Z432LWjjRh"

function bridge(id: string): string {
  return JSON.stringify({
    type: "bridge-session",
    sessionId: "c694cb2e-4ab9-4018-90a6-f94c4f144d39",
    bridgeSessionId: id,
    lastSequenceNum: 1,
  })
}

const OPENING = '{"type":"bridge-session","sessionId":"c694cb2e","lastSequenceNum":0}'

const SAID = '{"type":"user","message":{"content":"the bridge-session is here"}}'

test("a session is written as claude.ai names it in a link", () => {
  expect(publicSessionOf(BRIDGED)).toBe(LINKED)
})

test("a session already named as a link is left as it is", () => {
  expect(publicSessionOf(LINKED)).toBe(LINKED)
})

test("the session is the one the last bridge record names", () => {
  expect(bridgeSessionIn([bridge(BRIDGED), SAID, bridge(LATER), SAID].join("\n"))).toBe(
    "session_0164iiws5Ysdz2Z432LWjjRh"
  )
})

test("a bridge record naming no session is read over", () => {
  expect(bridgeSessionIn([bridge(BRIDGED), OPENING].join("\n"))).toBe(LINKED)
})

test("a transcript naming no session names none", () => {
  expect(bridgeSessionIn([OPENING, SAID].join("\n"))).toBe(null)
})

test("a line broken off at the start of what is read is read over", () => {
  expect(bridgeSessionIn([bridge(BRIDGED), bridge(LATER).slice(10)].join("\n"))).toBe(LINKED)
})

const scratch = scratchWorld()

afterAll(scratch.sweep)

function transcriptOf(lines: readonly string[]): string {
  const path = join(scratch.rootFor("seat-bridge-session-"), "transcript.jsonl")
  writeFileSync(path, `${lines.join("\n")}\n`)
  return path
}

test("only the end of the transcript is read", () => {
  const filler = SAID.repeat(Math.ceil(TAIL_BYTES / SAID.length))
  expect(bridgeSessionAt(transcriptOf([bridge(LATER), filler]))).toBe(null)
  expect(bridgeSessionAt(transcriptOf([bridge(LATER), filler, bridge(BRIDGED)]))).toBe(LINKED)
})

test("a transcript that is not there names no session", () => {
  expect(bridgeSessionAt(join(scratch.rootFor("seat-bridge-session-"), "gone.jsonl"))).toBe(null)
})

type Kept = { agent: string; session: string | null }

function polled(args: {
  readonly agent: string | null
  readonly transcript: string | null
  readonly held: string | null
}): Promise<readonly Kept[]> {
  const kept: Kept[] = []
  const poll = bridgeSessionPoll({
    getAgentId: () => args.agent,
    readTranscript: () => args.transcript,
    readHeld: () => args.held,
    keep: (agent, session) => {
      kept.push({ agent, session })
      return undefined
    },
    clear: (agent) => {
      kept.push({ agent, session: null })
      return undefined
    },
  })
  return poll.run().then(() => kept)
}

test("the supervisor writes the session its transcript names beside the seat", async () => {
  const transcript = transcriptOf([bridge(BRIDGED)])
  expect(await polled({ agent: AGENT, transcript, held: null })).toEqual([
    { agent: AGENT, session: LINKED },
  ])
})

test("a session already beside the seat is not written again", async () => {
  const transcript = transcriptOf([bridge(BRIDGED)])
  expect(await polled({ agent: AGENT, transcript, held: LINKED })).toEqual([])
})

test("a transcript naming no session clears the session beside the seat", async () => {
  const transcript = transcriptOf([OPENING, SAID])
  expect(await polled({ agent: AGENT, transcript, held: LINKED })).toEqual([
    { agent: AGENT, session: null },
  ])
})

test("a transcript that is not there clears the session beside the seat", async () => {
  const transcript = join(scratch.rootFor("seat-bridge-session-"), "gone.jsonl")
  expect(await polled({ agent: AGENT, transcript, held: LINKED })).toEqual([
    { agent: AGENT, session: null },
  ])
})

test("a transcript naming no session beside a seat holding none clears nothing", async () => {
  const transcript = transcriptOf([OPENING, SAID])
  expect(await polled({ agent: AGENT, transcript, held: null })).toEqual([])
})

test("a transcript naming another session replaces the one beside the seat", async () => {
  const transcript = transcriptOf([bridge(BRIDGED), bridge(LATER)])
  expect(await polled({ agent: AGENT, transcript, held: LINKED })).toEqual([
    { agent: AGENT, session: "session_0164iiws5Ysdz2Z432LWjjRh" },
  ])
})

test("a supervisor holding no agent writes nothing", async () => {
  const transcript = transcriptOf([bridge(BRIDGED)])
  expect(await polled({ agent: null, transcript, held: null })).toEqual([])
})

test("a seat stating no transcript has nothing written", async () => {
  expect(await polled({ agent: AGENT, transcript: null, held: null })).toEqual([])
})
