import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  SENT_PICTURE,
  SENT_TEXT,
  sentSaid,
} from "akasha/alan/harness/imessage/send/imessage-send.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Lines } from "akasha/commands/pages/imessage/send/imessage-send.command.code.ts"
import { sent } from "akasha/commands/pages/imessage/send/imessage-send.command.code.ts"

const TEXT = sentSaid(SENT_TEXT) as string

const PICTURE = sentSaid(SENT_PICTURE) as string

const SCRIPT = "set -euo pipefail"

function saying(lines: readonly string[], why?: string): Lines {
  return async function* () {
    for (const one of lines) yield one
    if (why !== undefined) throw new OperationalError(why)
  }
}

test("each send that landed is named as soon as the script says so", async () => {
  const done: string[] = []

  await sent(SCRIPT, done, saying([SENT_TEXT, SENT_PICTURE]))
  expect(done).toEqual([TEXT, PICTURE])
})

test("a picture that failed after the text leaves the text named in the refusal", async () => {
  const held = await answering(async (done) => {
    await sent(SCRIPT, done, saying([SENT_TEXT], "osascript exited 1"))
    return told([])
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([TEXT])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(TEXT)
  expect(last).not.toContain(PICTURE)
})

test("a send that threw before anything went names nothing", async () => {
  const held = await answering(async (done) => {
    await sent(SCRIPT, done, saying([], "ssh exited 255"))
    return told([])
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a line the script did not mark is named by nothing", async () => {
  const done: string[] = []

  await sent(SCRIPT, done, saying(["some other chatter", SENT_TEXT]))
  expect(done).toEqual([TEXT])
})
