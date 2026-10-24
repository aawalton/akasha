import { expect, test } from "bun:test"
import type { Notice } from "akasha/agent/seat/modules/notice-choosing/seat-notice-choosing.module.code.ts"
import { replyNotifyPoll } from "akasha/agent/seat/supervisor/seat-reply-notifying/modules/reply-notify-poll/reply-notify-poll.module.code.ts"

const COUPLE = {
  id: "01a16f1c-8e48-7000-b6a3-9aae18284763",
  slug: "claudius",
  role: "couples-therapist",
  persona: "claudius" as string | null,
  interactive: true,
  persons: ["alan", "jenny"],
}

type Sent = {
  readonly person: string
  readonly title: string
  readonly body?: string
  readonly link?: string
}

function pollOver(opts: {
  seat?: typeof COUPLE | null
  idle?: () => boolean
  held?: () => boolean
  replies: (string | null)[]
  sent: Sent[]
  agent?: () => string | null
  text?: (id: string) => string
  notice?: (person: string) => Notice
}): ReturnType<typeof replyNotifyPoll> {
  let at = 0
  return replyNotifyPoll({
    getAgentId: opts.agent ?? (() => COUPLE.id),
    log: () => undefined,
    readSeat: () => (opts.seat === undefined ? COUPLE : opts.seat),
    readIdle: opts.idle ?? (() => true),
    readHeld: opts.held ?? (() => false),
    readNotice: (person) => opts.notice?.(person) ?? "both",
    readReply: () => {
      const id = opts.replies[Math.min(at, opts.replies.length - 1)] ?? null
      at += 1
      if (id === null) return null
      return { id, text: opts.text === undefined ? `the words of ${id}` : opts.text(id) }
    },
    send: (person, input) => {
      opts.sent.push({ person, title: input.title, body: input.body, link: input.link })
      return Promise.resolve()
    },
  })
}

const LINK = "/seat/claudius-18284763"

test("a reply finished before the first beat is not pushed", async () => {
  const sent: Sent[] = []
  const poll = pollOver({ replies: ["old", "old"], sent })
  await poll.run()
  await poll.run()
  expect(sent).toEqual([])
})

test("a new reply reaches every person the seat answers to, once", async () => {
  const sent: Sent[] = []
  const poll = pollOver({ replies: ["old", "new", "new"], sent })
  await poll.run()
  await poll.run()
  await poll.run()
  expect(sent).toEqual([
    { person: "alan", title: "Claudius", body: "the words of new", link: LINK },
    { person: "jenny", title: "Claudius", body: "the words of new", link: LINK },
  ])
})

test("a reply is pushed only to the persons whose notice names the phone", async () => {
  const sent: Sent[] = []
  const notices: Readonly<Record<string, Notice>> = { alan: "desktop", jenny: "phone" }
  const poll = pollOver({
    replies: ["old", "new"],
    sent,
    notice: (person) => notices[person] ?? "both",
  })
  await poll.run()
  await poll.run()
  expect(sent.map((one) => one.person)).toEqual(["jenny"])
})

test("a reply every person turned the phone off for is pushed to no one", async () => {
  const sent: Sent[] = []
  const poll = pollOver({ replies: ["old", "new"], sent, notice: () => "none" })
  await poll.run()
  await poll.run()
  expect(sent).toEqual([])
})

test("a seat with the default persona is titled with its role", async () => {
  const sent: Sent[] = []
  const poll = pollOver({ seat: { ...COUPLE, persona: null }, replies: ["old", "new"], sent })
  await poll.run()
  await poll.run()
  expect(sent.map((one) => one.title)).toEqual(["Couples therapist", "Couples therapist"])
})

test("a reply the first beat found nothing before is still pushed", async () => {
  const sent: Sent[] = []
  const poll = pollOver({ replies: [null, "first"], sent })
  await poll.run()
  await poll.run()
  expect(sent.map((one) => one.person)).toEqual(["alan", "jenny"])
})

test("a seat answering to one person pushes nothing", async () => {
  const sent: Sent[] = []
  const poll = pollOver({ seat: { ...COUPLE, persons: ["alan"] }, replies: ["old", "new"], sent })
  await poll.run()
  await poll.run()
  expect(sent).toEqual([])
})

test("a headless seat answering to several persons pushes nothing", async () => {
  const sent: Sent[] = []
  const poll = pollOver({ seat: { ...COUPLE, interactive: false }, replies: ["old", "new"], sent })
  await poll.run()
  await poll.run()
  expect(sent).toEqual([])
})

test("a reply is not pushed while the turn is still going", async () => {
  const sent: Sent[] = []
  let idle = false
  const poll = pollOver({ idle: () => idle, replies: ["old", "new"], sent })
  await poll.run()
  await poll.run()
  expect(sent).toEqual([])
  idle = true
  await poll.run()
  expect(sent.map((one) => one.person)).toEqual(["alan", "jenny"])
})

test("a reply is not pushed while a message is being taken back", async () => {
  const sent: Sent[] = []
  const poll = pollOver({ held: () => true, replies: ["old", "partial"], sent })
  await poll.run()
  await poll.run()
  expect(sent).toEqual([])
})

test("a supervisor with no agent pushes nothing", async () => {
  const sent: Sent[] = []
  const poll = pollOver({ agent: () => null, replies: ["old", "new"], sent })
  await poll.run()
  await poll.run()
  expect(sent).toEqual([])
})

test("a long reply is shortened to one line", async () => {
  const sent: Sent[] = []
  const long = `${"word ".repeat(100)}\n\nend`
  const poll = pollOver({ replies: ["old", "new"], sent, text: () => long })
  await poll.run()
  await poll.run()
  const body = sent[0]?.body ?? ""
  expect(body.length).toBe(180)
  expect(body.endsWith("…")).toBe(true)
  expect(body).not.toContain("\n")
})
