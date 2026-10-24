import { expect, test } from "bun:test"
import { replyNotifyPoll } from "akasha/agent/seat/supervisor/seat-reply-notifying/modules/reply-notify-poll/reply-notify-poll.module.code.ts"

const COUPLE = {
  id: "01a16f1c-8e48-7000-b6a3-9aae18284763",
  slug: "couples-therapy-couples-therapist",
  role: "couples-therapist",
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
  replies: (string | null)[]
  sent: Sent[]
  agent?: () => string | null
  text?: (id: string) => string
}): ReturnType<typeof replyNotifyPoll> {
  let at = 0
  return replyNotifyPoll({
    getAgentId: opts.agent ?? (() => COUPLE.id),
    log: () => undefined,
    readSeat: () => (opts.seat === undefined ? COUPLE : opts.seat),
    readIdle: opts.idle ?? (() => true),
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

const LINK = "/seat/couples-therapy-couples-therapist-18284763"

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
    { person: "alan", title: "Couples therapist", body: "the words of new", link: LINK },
    { person: "jenny", title: "Couples therapist", body: "the words of new", link: LINK },
  ])
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
