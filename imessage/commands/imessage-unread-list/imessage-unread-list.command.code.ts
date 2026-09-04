import type { Answer } from "@akasha/command-system/calling"
import type { ImessageMessage } from "../../chat-db/chat-db.module.code.ts"
import { buildUnreadListSql } from "../../chat-db/chat-db.module.code.ts"
import {
  formatLocalMinute,
  messageLabel,
  type NameFor,
  singleLine,
} from "../../message-lines/message-lines.module.code.ts"
import {
  fetchContacts,
  fetchMessages,
  resolveContactHandleRowids,
} from "../../remote/imessage-remote.module.code.ts"
import {
  answering,
  asJson,
  CONTACT_SAID,
  countOf,
  JSON_SAID,
  LIMIT_ALSO,
  LIMIT_SAID,
  namingIn,
  noneLoose,
  oldestFirst,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../imessage-command-reading/imessage-command-reading.module.code.ts"

const VALUED = [LIMIT_SAID, CONTACT_SAID]

const SWITCHES = [JSON_SAID]

export type Read = {
  readonly contact: string | undefined
  readonly limit: number | undefined
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES, LIMIT_ALSO)
  if ("refused" in said) return said
  const refusals = [...noneLoose(said)]
  const limit = countOf(said.named[LIMIT_SAID], LIMIT_SAID)
  if (typeof limit === "object") refusals.push(...limit.refused)
  if (refusals.length > 0) return { refused: refusals }
  return {
    contact: said.named[CONTACT_SAID],
    limit: typeof limit === "number" ? limit : undefined,
    json: said.flags.has(JSON_SAID),
  }
}

export function unreadLines(
  messages: readonly ImessageMessage[],
  name: NameFor
): readonly string[] {
  return oldestFirst(messages).map((one) =>
    [formatLocalMinute(one.unixSeconds), messageLabel(one, name), singleLine(one.text)].join("\t")
  )
}

export function unreadRecords(
  messages: readonly ImessageMessage[],
  name: NameFor
): readonly unknown[] {
  return oldestFirst(messages).map((one) => ({
    rowid: one.rowid,
    guid: one.guid,
    date: formatLocalMinute(one.unixSeconds),
    unixSeconds: one.unixSeconds,
    sender: messageLabel(one, name),
    handleId: one.handleId,
    contact: one.handleId === null ? null : name(one.handleId),
    chatIdentifier: one.chatIdentifier,
    chatDisplayName: one.chatDisplayName,
    text: one.text,
  }))
}

export function imessageUnreadList(argv: readonly string[]): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusedBy(said.refused))
  return answering(async () => {
    const handleRowids =
      said.contact === undefined ? undefined : await resolveContactHandleRowids(said.contact)
    const [messages, contacts] = await Promise.all([
      fetchMessages(
        buildUnreadListSql({
          ...(said.limit === undefined ? {} : { limit: said.limit }),
          ...(handleRowids === undefined ? {} : { handleRowids }),
        })
      ),
      fetchContacts(),
    ])
    const name = namingIn(contacts)
    return said.json ? asJson(unreadRecords(messages, name)) : told(unreadLines(messages, name))
  })
}
