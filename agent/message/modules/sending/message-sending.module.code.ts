import { messageNamed } from "akasha/agent/message/modules/naming/message-naming.module.code.ts"
import { akashaSeatIdForName } from "akasha/agent/seat/page/modules/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { CEILING } from "akasha/check/code/pages/file-length/modules/length-ceiling/length-ceiling.module.code.ts"
import { pagesOriginHere } from "akasha/infrastructure/service/workstation/modules/service-reading/service-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  type Writing,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  composedFor,
  type Naming,
  pagesAtFor,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import type { Wrote } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

export const MESSAGE = "message"

const PAGE_TYPE = "page-type"

const SEAT = "seat"

export const WRITER = "message file writer <message-file-writer@alanwalton.com>"

export type Warrant = "announce" | "blocked"

export type Written =
  | { readonly kind: "written"; readonly id: string; readonly relPath: string }
  | { readonly kind: "refused"; readonly detail: string }

export type Sending = (asked: Writing) => Promise<Wrote>

export function recipientRefused(to: string): string | null {
  if (to === "") return "a message is addressed to somebody, and this names nobody"
  if (to.includes("/") || to.includes("\\")) {
    return `\`${to}\` spells a path rather than a recipient, and a recipient is one directory`
  }
  if (to.startsWith(".")) return `\`${to}\` starts with a dot, which names no seat or persona`
  return null
}

export function messagesDirRelPath(): string {
  return pagesAtFor(akashaRoot(), MESSAGE)
}

export function messageDirRelPath(_to: string): string {
  return messagesDirRelPath()
}

function unknownRecipient(to: string): string | null {
  let known: boolean
  try {
    known = akashaSeatIdForName(to) !== null
  } catch {
    return null
  }
  if (known) return null
  return (
    `no seat holds the name \`${to}\`, so a message written there would wait in a directory ` +
    `nothing drains. Refused rather than landed, because a send nobody receives must not answer ` +
    `as one that arrived`
  )
}

export const overHttp: Sending = (asked) =>
  writingFor(asked, undefined, undefined, pagesOriginHere())

export async function writeMessage(
  stated: {
    readonly to: string
    readonly from: string
    readonly warrant: Warrant
    readonly body: string
  },
  sending: Sending = overHttp
): Promise<Written> {
  const refused = recipientRefused(stated.to)
  if (refused !== null) return { kind: "refused", detail: refused }
  const unknown = unknownRecipient(stated.to)
  if (unknown !== null) return { kind: "refused", detail: unknown }
  const id = Bun.randomUUIDv7()
  const slug = messageNamed(id)
  const body = stated.body.endsWith("\n") ? stated.body : `${stated.body}\n`
  const naming: Naming = {
    pageTypeSlug: MESSAGE,
    slug,
    values: {
      id,
      type: namedAs(PAGE_TYPE, MESSAGE, null),
      slug,
      to: namedAs(SEAT, stated.to, null),
      from: stated.from,
      warrant: stated.warrant,
      body,
    },
  }
  const composed = composedFor(akashaRoot(), naming)
  if ("refused" in composed) return { kind: "refused", detail: composed.refused }
  const held = new TextEncoder().encode(composed.put.content).byteLength
  if (held > CEILING) {
    return {
      kind: "refused",
      detail:
        `a message page of ${held} bytes is over the ${CEILING} byte ceiling a file is held to, ` +
        `and a page over that ceiling can never be changed again, so send fewer words`,
    }
  }
  const wrote = await sending({
    writer: WRITER,
    message: `message to ${stated.to} from ${stated.from}`,
    pages: [naming],
  })
  if ("refused" in wrote) return { kind: "refused", detail: wrote.refused }
  return { kind: "written", id: slug, relPath: composed.put.path }
}
