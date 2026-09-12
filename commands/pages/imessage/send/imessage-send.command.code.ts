import { readFileSync, statSync } from "node:fs"
import { basename, resolve } from "node:path"
import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
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
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { image as imageArgument } from "akasha/commands/arguments/pages/image.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { text as textArgument } from "akasha/commands/arguments/pages/text.argument.ts"
import { textFile } from "akasha/commands/arguments/pages/text-file.argument.ts"
import { toHandle } from "akasha/commands/arguments/pages/to-handle.argument.ts"
import {
  answering,
  asJson,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { imessageSend as page } from "akasha/commands/pages/imessage/send/imessage-send.command.ts"

const IMAGE = imageArgument.said

const MOST_BYTES = 10 * 1024 * 1024

const BODY = filing(textArgument.said)

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
      `no contact matches \`${to}\` — say a phone number, an address, or a fuller name`
    )
  }
  if (matched.length > 1) {
    throw new InputError(
      `\`${to}\` lands on ${matched.map((each) => each.name).join(", ")} rather than one`
    )
  }
  const one = matched[0]
  if (one === undefined) throw new InputError(`no contact matches \`${to}\``)
  const reached = one.phones[0] ?? one.emails[0]
  if (reached === undefined) {
    throw new InputError(`\`${one.name}\` carries no phone number and no address to send to`)
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
  const read = takenFor(argv, given.calledAs, page, [
    json,
    toHandle,
    textFile,
    textArgument,
    imageArgument,
  ])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused))
  const taken = read.taken
  const body = filledIn(given.root, taken.text, taken.textFile, BODY)
  if ("refused" in body) return Promise.resolve(refusedBy(body.refused))
  return answering(async (done) => {
    const attachment = taken.image === undefined ? undefined : attachmentAt(given.root, taken.image)
    const handle = await handleFor(taken.toHandle)
    await sent(buildSendScript(handle, body.text, attachment), done, lines)
    if (taken.json) {
      return asJson({
        sent: true,
        to: handle,
        text: body.text ?? null,
        image: taken.image === undefined ? null : resolve(given.root, taken.image),
      })
    }
    return told([`sent\t${handle}`])
  })
}
