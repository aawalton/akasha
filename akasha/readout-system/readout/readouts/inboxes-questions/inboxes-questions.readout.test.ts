import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import { fetchOpenQuestions, questionsOpen } from "./inboxes-questions.readout.code.ts"

test("the questions asked for are the open ones", () => {
  const asked = questionsOpen()
  expect(asked["page-type"]).toBe("question")
  expect(asked.where).toEqual({ status: { is: "open" } })
})

test("no day bounds the count, since an open question is open whatever the day", () => {
  expect(questionsOpen().where).toEqual({ status: { is: "open" } })
  expect(questionsOpen().limit).toBeUndefined()
})

test("the reading is how many rows answered rather than a number read off one row", async () => {
  const three = [{ values: { slug: "a" } }, { values: { slug: "b" } }, { values: { slug: "c" } }]
  expect(await fetchOpenQuestions(answering(three))).toBe(3)
})

test("no open question is a reading of zero rather than no reading", async () => {
  expect(await fetchOpenQuestions(answering([]))).toBe(0)
})

test("a store that refuses is a fault rather than a count of zero", async () => {
  await expect(fetchOpenQuestions(refusing("the store is down"))).rejects.toThrow(
    "unknown rather than none"
  )
})
