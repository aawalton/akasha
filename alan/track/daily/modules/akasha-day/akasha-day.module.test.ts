import { describe, expect, test } from "bun:test"
import {
  alreadyHeld,
  camelised,
  landingRetried,
  TRIES,
} from "akasha/alan/track/daily/modules/akasha-day/akasha-day.module.code.ts"
import type { Landed } from "akasha/alan/track/daily/modules/day-narrow-types/day-narrow-types.module.code.ts"
import {
  ALREADY_HELD,
  PUT_BACK,
} from "akasha/command/modules/change-freshness/change-freshness.module.code.ts"

const MOVED: Landed = { ok: false, why: `day-2026-09-19.day.ts — ${PUT_BACK}` }

const HELD: Landed = {
  ok: false,
  why: `the tracking landing refused: \`day-2026-09-19.day.ts\` ${ALREADY_HELD}`,
}

const WRONG: Landed = { ok: false, why: "nothing was composed to write" }

const DONE: Landed = { ok: true, at: "day-2026-09-19.day.ts" }

const noPause = async (): Promise<void> => undefined

function landing(answers: readonly Landed[]): { land: () => Promise<Landed>; tries: () => number } {
  let tried = 0
  return {
    land: async () => answers[tried++] ?? answers[answers.length - 1] ?? WRONG,
    tries: () => tried,
  }
}

describe("a day page another writer moved under the landing", () => {
  test("the landing is composed again and answers what the later try landed", async () => {
    const asked = landing([MOVED, MOVED, DONE])

    expect(await landingRetried(asked.land, noPause)).toEqual(DONE)
    expect(asked.tries()).toBe(3)
  })

  test("a page that keeps moving is refused after the tries run out", async () => {
    const asked = landing([MOVED])

    expect(await landingRetried(asked.land, noPause)).toEqual(MOVED)
    expect(asked.tries()).toBe(TRIES)
  })

  test("a landing refused for another reason is not tried again", async () => {
    const asked = landing([WRONG, DONE])

    expect(await landingRetried(asked.land, noPause)).toEqual(WRONG)
    expect(asked.tries()).toBe(1)
  })
})

describe("a day page another writer landed this very body onto", () => {
  test("the refusal is told apart from every other refusal", () => {
    expect([alreadyHeld(HELD), alreadyHeld(MOVED), alreadyHeld(WRONG), alreadyHeld(DONE)]).toEqual([
      true,
      false,
      false,
      false,
    ])
  })

  test("the landing is not tried again, since another try would be refused the same way", async () => {
    const asked = landing([HELD, DONE])

    expect(await landingRetried(asked.land, noPause)).toEqual(HELD)
    expect(asked.tries()).toBe(1)
  })
})

describe("the spelling a value takes on its way into akasha", () => {
  test("every key becomes camel, whichever way the caller spelled it", () => {
    expect(camelised({ "inbox-tasks": 22, id: "x", inboxTexts: 4 })).toEqual({
      inboxTasks: 22,
      id: "x",
      inboxTexts: 4,
    })
  })

  test("nothing carries a value the caller did not state", () => {
    expect(camelised({ id: "x", title: null, date: undefined })).toEqual({ id: "x" })
  })
})
