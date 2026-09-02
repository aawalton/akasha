import { expect, test } from "bun:test"
import { RosterUnreachable } from "../file-read/file-read.module.code.ts"
import { answerPages, type PagesDeps, type PageTypeReading } from "./answer.module.code.ts"

const AT = "https://alanwalton.com/api/pages/readout"

function depsReading(readPageType: PagesDeps["readPageType"]): PagesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    ask: async () => ({ rows: [] }),
    readPageType,
  }
}

test("a roster that will not read refuses at 501 and names why", async () => {
  const deps = depsReading(() => Promise.reject(new RosterUnreachable("there is no roster left")))
  const answered = await answerPages(new Request(AT), "readout", deps)
  expect(answered.status).toBe(501)
  const said = (await answered.json()) as { error: string; unread: readonly string[] }
  expect(said.unread[0]).toContain("there is no roster left")
  expect(said.error).toContain("went unread")
})

test("a page type nothing is named for is still answered 404", async () => {
  const deps = depsReading(async () => null)
  const answered = await answerPages(new Request(AT), "readout", deps)
  expect(answered.status).toBe(404)
})

test("a raise that is not the roster is left to raise", async () => {
  const deps = depsReading(() => Promise.reject(new Error("something else entirely")))
  expect(answerPages(new Request(AT), "readout", deps)).rejects.toThrow("something else entirely")
})

test("a page type that reads is answered with its rows", async () => {
  const reading: PageTypeReading = { pageTypeId: "one", definitions: [] }
  const answered = await answerPages(
    new Request(AT),
    "readout",
    depsReading(async () => reading)
  )
  expect(answered.status).toBe(200)
})
