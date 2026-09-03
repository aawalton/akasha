import { readFileSync, statSync } from "node:fs"
import { basename } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { InputError } from "@akasha/errors-core/exit-code"
import { runSshCapture } from "@akasha/ssh-access/ssh-reach"
import {
  isEmailLike,
  isPhoneLike,
  searchContacts,
} from "../../contacts-db/contacts-db.module.code.ts"
import { MACBOOK } from "../../host/imessage-host.module.code.ts"
import { fetchContacts } from "../../remote/imessage-remote.module.code.ts"
import { buildSendScript, type SendAttachment } from "../../send/imessage-send.module.code.ts"
import {
  answering,
  asJson,
  filing,
  JSON_SAID,
  pathAt,
  proseIn,
  type Reading,
  refusedBy,
  told,
  wordFilling,
  wordsIn,
} from "../imessage-command-reading/imessage-command-reading.module.code.ts"

const TO = "--to"

const TEXT = filing("--text")

const IMAGE = "--image"

const ATTACHMENT = "--attachment"

const MOST_BYTES = 10 * 1024 * 1024

const VALUED = [TO, TEXT.said, TEXT.file, IMAGE]

const SWITCHES = [JSON_SAID]

const ALSO: Readonly<Record<string, string>> = { [ATTACHMENT]: IMAGE }

const WANTS = "who the message goes to"

export type Read = {
  readonly to: string
  readonly text: string | undefined
  readonly image: string | undefined
  readonly json: boolean
}

export function readIn(argv: readonly string[], given: Given): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES, ALSO)
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
  const at = pathAt(root, path)
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
      `"${to}" lands on ${matched.map((one) => one.name).join(", ")} rather than one`
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

export function imessageSend(argv: readonly string[], given: Given): Promise<Answer> {
  const said = readIn(argv, given)
  if ("refused" in said) return Promise.resolve(refusedBy(said.refused))
  return answering(async () => {
    const attachment = said.image === undefined ? undefined : attachmentAt(given.root, said.image)
    const handle = await handleFor(said.to)
    await runSshCapture(MACBOOK, buildSendScript(handle, said.text, attachment))
    if (said.json) {
      return asJson({
        sent: true,
        to: handle,
        text: said.text ?? null,
        image: said.image === undefined ? null : pathAt(given.root, said.image),
      })
    }
    return told([`sent\t${handle}`])
  })
}
