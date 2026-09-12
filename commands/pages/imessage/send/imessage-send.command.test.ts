import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  SENT_PICTURE,
  SENT_TEXT,
  sentSaid,
} from "akasha/alan/harness/imessage/send/imessage-send.module.code.ts"
import { image as imageArgument } from "akasha/commands/arguments/pages/image.argument.ts"
import { text as textArgument } from "akasha/commands/arguments/pages/text.argument.ts"
import { textFile } from "akasha/commands/arguments/pages/text-file.argument.ts"
import { toHandle } from "akasha/commands/arguments/pages/to-handle.argument.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Lines } from "akasha/commands/pages/imessage/send/imessage-send.command.code.ts"
import {
  imessageSend,
  sent,
} from "akasha/commands/pages/imessage/send/imessage-send.command.code.ts"

const TEXT = sentSaid(SENT_TEXT) as string

const PICTURE = sentSaid(SENT_PICTURE) as string

const SCRIPT = "set -euo pipefail"

function saying(lines: readonly string[], why?: string): Lines {
  return async function* () {
    for (const one of lines) yield one
    if (why !== undefined) throw new OperationalError(why)
  }
}

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha imessage send",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a send saying no body and no picture is refused once, naming every way to say one", async () => {
  const held = await imessageSend([toHandle.said, "5551234"], GIVEN, saying([]))

  expect(held.report).toEqual([])
  expect(held.refusals.length).toBe(1)
  for (const one of [textFile.said, textArgument.said, imageArgument.said]) {
    expect(held.refusals[0]).toContain(one)
  }
})

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
