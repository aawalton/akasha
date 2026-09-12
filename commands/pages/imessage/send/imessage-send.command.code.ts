import { readFileSync, statSync } from "node:fs"
import { basename, resolve } from "node:path"
import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  JSON_SAID,
  proseIn,
  type Reading,
  wordsIn,
} from "akasha/alan/harness/imessage/command-reading/imessage-command-reading.module.code.ts"
import {
  isEmailLike,
  isPhoneLike,
  searchContacts,
} from "akasha/alan/harness/imessage/contacts-db/contacts-db.module.code.ts"
import { MACBOOK } from "akasha/alan/harness/imessage/host/imessage-host.module.code.ts"
import { fetchContacts } from "akasha/alan/harness/imessage/remote/imessage-remote.module.code.ts"
import {
  buildSendScript,
  type SendAttachment,
  sentSaid,
} from "akasha/alan/harness/imessage/send/imessage-send.module.code.ts"
import { streamSshLines } from "akasha/alan/harness/ssh-access/ssh-reach/ssh-reach.module.code.ts"
import type { SshTarget } from "akasha/alan/harness/ssh-access/ssh-target/ssh-target.module.code.ts"
import {
  answering,
  asJson,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { filing, wordFilling } from "akasha/commands/modules/filling/command-filling.module.code.ts"

const TO = "--to"

const TEXT = filing("--text")

const IMAGE = "--image"

const MOST_BYTES = 10 * 1024 * 1024

const VALUED = [TO, TEXT.said, TEXT.file, IMAGE]

const SWITCHES = [JSON_SAID]

const WANTS = "who the message goes to"

export type Read = {
  readonly to: string
  readonly text: string | undefined
  readonly image: string | undefined
  readonly json: boolean
}

export function readIn(argv: readonly string[], given: Given): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const refusals: string[] = []
  const to = wordFilling(said, TO, WANTS)
  if (typeof to === "object") refusals.push(...to.refused)
  else if (to === undefined) refusals.push(`this names ${WANTS}, and nothing did`)
  const body = proseIn(given, said, TEXT)
  if ("refused" in body) refusals.push(...body.refused)
  const image = said.named[IMAGE]
  const text = "refused" in body ? undefined : body.text
  if (text === undefined && image === undefined && !("refused" in body)) {
    refusals.push("this sends a body, a picture, or both, and neither was said")
  }
  if (refusals.length > 0 || typeof to !== "string") return { refused: refusals }
  return { to, text, image, json: said.flags.has(JSON_SAID) }
}

export function attachmentAt(root: string, path: string): SendAttachment {
  const at = resolve(root, path)
  let size: number
  try {
    const stat = statSync(at)
    if (!stat.isFile()) throw new Error("it is no plain file")
    size = stat.size
  } catch (thrown) {
    throw new InputError(`\`${IMAGE} ${path}\` would not open — ${whyOf(thrown)}`)
  }
  if (size > MOST_BYTES) {
    throw new InputError(
      `\`${IMAGE} ${path}\` is ${String(size)} bytes, past the ${String(MOST_BYTES)} a message carries`
    )
  }
  return { fileB64: readFileSync(at).toString("base64"), filename: basename(at) }
}

export async function handleFor(to: string): Promise<string> {
  if (isPhoneLike(to) || isEmailLike(to)) return to.trim()
  const matched = searchContacts(await fetchContacts(), to)
  if (matched.length === 0) {
    throw new InputError(
      `no contact matches "${to}" — say a phone number, an address, or a fuller name`
    )
  }
  if (matched.length > 1) {
    throw new InputError(
      `"${to}" lands on ${matched.map((each) => each.name).join(", ")} rather than one`
    )
  }
  const one = matched[0]
  if (one === undefined) throw new InputError(`no contact matches "${to}"`)
  const reached = one.phones[0] ?? one.emails[0]
  if (reached === undefined) {
    throw new InputError(`"${one.name}" carries no phone number and no address to send to`)
  }
  return reached
}

export type Lines = (target: SshTarget, script: string) => AsyncIterable<string>

export async function sent(script: string, done: string[], lines: Lines): Promise<void> {
  for await (const line of lines(MACBOOK, script)) {
    const one = sentSaid(line)
    if (one !== null) done.push(one)
  }
}

export function imessageSend(
  argv: readonly string[],
  given: Given,
  lines: Lines = streamSshLines
): Promise<Answer> {
  const said = readIn(argv, given)
  if ("refused" in said) return Promise.resolve(refusedBy(said.refused))
  return answering(async (done) => {
    const attachment = said.image === undefined ? undefined : attachmentAt(given.root, said.image)
    const handle = await handleFor(said.to)
    await sent(buildSendScript(handle, said.text, attachment), done, lines)
    if (said.json) {
      return asJson({
        sent: true,
        to: handle,
        text: said.text ?? null,
        image: said.image === undefined ? null : resolve(given.root, said.image),
      })
    }
    return told([`sent\t${handle}`])
  })
}
