import { expect, test } from "bun:test"
import type { Asked } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import {
  askedLoudly,
  refusalSaid,
} from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"

const QUERY = { "page-type": "world-quest", keys: ["reward"] }

const REFUSED: Asked = { ok: false, why: "`keys` names `reward`" }

const ANSWERED: Asked = {
  ok: true,
  answer: { n: 0, value: null, over: null, rows: [], faults: [], omitted: [], unfound: [] },
}

test("a refused question is reported with the question and the store's reason", async () => {
  const said: string[] = []
  const asked = await askedLoudly(
    QUERY,
    async () => REFUSED,
    (one) => {
      said.push(one)
      return undefined
    }
  )
  expect(asked).toBe(REFUSED)
  expect(said).toEqual([refusalSaid(QUERY, REFUSED.ok ? "" : REFUSED.why)])
  expect(said[0]).toContain("`keys` names `reward`")
  expect(said[0]).toContain(JSON.stringify(QUERY))
})

test("an answered question is reported nowhere", async () => {
  const said: string[] = []
  const asked = await askedLoudly(
    QUERY,
    async () => ANSWERED,
    (one) => {
      said.push(one)
      return undefined
    }
  )
  expect(asked).toBe(ANSWERED)
  expect(said).toEqual([])
})
