import { expect, test } from "bun:test"
import {
  parseListUnsubscribe,
  postedSaid,
} from "akasha/alan/google/email/list-unsubscribe/list-unsubscribe.module.code.ts"

const URL = "https://list.example.com/u/abc"

test("one-click is used only where the sender says one-click is offered", () => {
  expect(parseListUnsubscribe(`<${URL}>`, undefined).oneClickUrl).toBeUndefined()
  expect(parseListUnsubscribe(`<${URL}>`, "List-Unsubscribe=One-Click").oneClickUrl).toBe(URL)
})

test("a POST that reached the server names the address and what came back", () => {
  const said = postedSaid(URL, 500)

  expect(said).toContain(URL)
  expect(said).toContain("500")
})

test("a POST names what reached the server rather than what the list did with it", () => {
  const said = postedSaid(URL, 500)

  expect(said).toContain("that server's to say")
  expect(said).not.toContain("unsubscribed")
})
