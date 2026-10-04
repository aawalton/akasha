import { expect, test } from "bun:test"
import {
  jobHanded,
  type Seating,
  type Starting,
} from "akasha/command/pages/story/turn/modules/turn-job-handing/turn-job-handing.module.code.ts"

const JOB: Starting = {
  persona: "mari",
  role: "reviewer",
  game: "the-saga",
  flex: "flex-1",
  prompt: "review the turn",
}

const NAME = "mari-reviewer-the-saga-flex-1"

const ID = "an-agent"

function seating(seen: string[], over: Partial<Seating> = {}): Seating {
  return {
    nameOf: () => NAME,
    liveAs: () => null,
    up: () => false,
    held: async () => false,
    wentAway: () => false,
    start: async (starting) => {
      seen.push(`start ${starting.prompt}`)
      return NAME
    },
    send: async (name, body) => {
      seen.push(`send ${name} ${body}`)
      return null
    },
    resume: async (name, prompt) => {
      seen.push(`resume ${name} ${prompt}`)
      return undefined
    },
    ...over,
  }
}

test("a seat that never ran is started with its job as its prompt", async () => {
  const seen: string[] = []
  expect(await jobHanded(JOB, [], seating(seen))).toEqual({ how: "started", name: NAME })
  expect(seen).toEqual(["start review the turn"])
})

test("a seat that is up is sent its job, and nothing starts or resumes it", async () => {
  const seen: string[] = []
  const up = seating(seen, { liveAs: () => ID, up: () => true })
  expect(await jobHanded(JOB, [], up)).toEqual({ how: "sent", name: NAME })
  expect(seen).toEqual([`send ${NAME} review the turn`])
})

test("a seat whose session holds its name is sent its job rather than started again", async () => {
  const seen: string[] = []
  const booting = seating(seen, { held: async () => true })
  expect(await jobHanded(JOB, [], booting)).toEqual({ how: "sent", name: NAME })
  expect(seen).toEqual([`send ${NAME} review the turn`])
})

test("a seat whose page went is resumed on its session with its job", async () => {
  const seen: string[] = []
  const gone = seating(seen, { wentAway: () => true })
  expect(await jobHanded(JOB, [], gone)).toEqual({ how: "resumed", name: NAME })
  expect(seen).toEqual([`resume ${NAME} review the turn`])
})

test("a seat whose page is there with no process behind it is resumed", async () => {
  const seen: string[] = []
  const crashed = seating(seen, { liveAs: () => ID })
  expect(await jobHanded(JOB, [], crashed)).toEqual({ how: "resumed", name: NAME })
  expect(seen).toEqual([`resume ${NAME} review the turn`])
})

test("a resume refused because the seat came up meanwhile sends the job instead", async () => {
  const seen: string[] = []
  let asked = 0
  const racing = seating(seen, {
    wentAway: () => true,
    held: async () => {
      asked += 1
      return asked > 1
    },
    resume: async () => {
      throw new Error("held by a live tmux session")
    },
  })
  expect(await jobHanded(JOB, [], racing)).toEqual({ how: "sent", name: NAME })
  expect(seen).toEqual([`send ${NAME} review the turn`])
})

test("a refused resume of a seat that stayed down throws, so the start is told", async () => {
  const failing = seating([], {
    wentAway: () => true,
    resume: async () => {
      throw new Error("the session is gone")
    },
  })
  await expect(jobHanded(JOB, [], failing)).rejects.toThrow("the session is gone")
})

test("a job a seat that is up could not be sent throws, so the start is told", async () => {
  const refusing = seating([], { liveAs: () => ID, up: () => true, send: async () => "no inbox" })
  await expect(jobHanded(JOB, [], refusing)).rejects.toThrow("no inbox")
})
