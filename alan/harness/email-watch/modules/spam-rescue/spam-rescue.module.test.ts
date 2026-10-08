import { expect, test } from "bun:test"
import type {
  Mailbox,
  Message,
} from "akasha/alan/google/email/modules/gmail-mailbox/gmail-mailbox.module.code.ts"
import type { Rule } from "akasha/alan/harness/email-watch/modules/email-rule-reading/email-rule-reading.module.code.ts"
import { rescued } from "akasha/alan/harness/email-watch/modules/spam-rescue/spam-rescue.module.code.ts"

const NOW = new Date("2026-10-08T12:00:00.000Z")

function ruleOf(slug: string, from: string, rescueFromSpam: boolean): Rule {
  return {
    slug,
    relPath: `${slug}.email-rule-code.ts`,
    kind: "code",
    filing: "archive",
    actions: [],
    forwardTo: null,
    delayMinutes: 0,
    rescueFromSpam,
    judgment: "",
    conditions: [{ field: "from", test: "ends with", negated: false, values: [from] }],
  }
}

function messageOf(id: string, fromAddress: string, labelIds: readonly string[]): Message {
  return {
    id,
    threadId: id,
    from: fromAddress,
    fromAddress,
    to: "alan@example.com",
    cc: "",
    subject: "Your secure link to sign in",
    listId: "",
    labelIds,
    arrivedAt: NOW,
    unsubscribe: "",
    oneClickUnsubscribe: false,
  }
}

interface Modified {
  readonly id: string
  readonly add?: readonly string[]
  readonly remove?: readonly string[]
}

function boxOf(spam: readonly Message[]): {
  readonly box: Mailbox
  readonly since: Date[]
  readonly modified: Modified[]
} {
  const since: Date[] = []
  const modified: Modified[] = []
  const box: Mailbox = {
    profile: () => Promise.reject(new Error("not asked")),
    addedSince: () => Promise.reject(new Error("not asked")),
    inboxIds: () => Promise.reject(new Error("not asked")),
    spamIds: (after) => {
      since.push(after)
      return Promise.resolve(spam.map((one) => one.id))
    },
    message: (id) => {
      const found = spam.find((one) => one.id === id)
      return found === undefined
        ? Promise.reject(new Error(`message ${id}: gone from the mailbox`))
        : Promise.resolve(found)
    },
    rawOf: () => Promise.reject(new Error("not asked")),
    modify: (id, change) => {
      modified.push({ id, ...change })
      return Promise.resolve()
    },
    send: () => Promise.reject(new Error("not asked")),
  }
  return { box, since, modified }
}

const RESCUING = ruleOf("login-links", "mail.anthropic.com", true)

const LEAVING = ruleOf("other-mail", "example.com", false)

test("a message whose rule rescues it leaves spam for the inbox", async () => {
  const { box, modified } = boxOf([messageOf("m1", "no-reply@mail.anthropic.com", ["SPAM"])])
  const rescues = await rescued([LEAVING, RESCUING], box, NOW)
  expect(rescues.map((one) => [one.message.id, one.rule.slug])).toEqual([["m1", "login-links"]])
  expect(modified).toEqual([{ id: "m1", add: ["INBOX"], remove: ["SPAM"] }])
})

test("a message whose rule rescues nothing is left in spam", async () => {
  const { box, modified } = boxOf([
    messageOf("m1", "news@example.com", ["SPAM"]),
    messageOf("m2", "someone@elsewhere.org", ["SPAM"]),
  ])
  expect(await rescued([LEAVING, RESCUING], box, NOW)).toEqual([])
  expect(modified).toEqual([])
})

test("the first rule a message matches decides, as it does in the inbox", async () => {
  const first = ruleOf("first", "anthropic.com", false)
  const { box, modified } = boxOf([messageOf("m1", "no-reply@mail.anthropic.com", ["SPAM"])])
  expect(await rescued([first, RESCUING], box, NOW)).toEqual([])
  expect(modified).toEqual([])
})

test("only the last hour of spam is asked for", async () => {
  const { box, since } = boxOf([])
  await rescued([RESCUING], box, NOW)
  expect(since).toEqual([new Date("2026-10-08T11:00:00.000Z")])
})

test("spam is not listed where no rule rescues", async () => {
  const { box, since } = boxOf([messageOf("m1", "no-reply@mail.anthropic.com", ["SPAM"])])
  expect(await rescued([LEAVING], box, NOW)).toEqual([])
  expect(since).toEqual([])
})

test("a message already out of spam or gone is passed over", async () => {
  const { box, modified } = boxOf([messageOf("m1", "no-reply@mail.anthropic.com", ["INBOX"])])
  const listing = box.spamIds
  box.spamIds = async (after) => [...(await listing(after)), "gone"]
  expect(await rescued([RESCUING], box, NOW)).toEqual([])
  expect(modified).toEqual([])
})
