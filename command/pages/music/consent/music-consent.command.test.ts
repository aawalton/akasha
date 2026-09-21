import { expect, test } from "bun:test"
import {
  type Asking,
  musicConsent,
  rowsOf,
} from "akasha/command/pages/music/consent/music-consent.command.code.ts"

const GIVEN = { root: "/nowhere", from: "/nowhere", calledAs: "consent" } as never

test("the run says the consent was saved once it was", async () => {
  const asked: string[][] = []
  const asking: Asking = async (args) => {
    asked.push([...args])
  }
  const answer = await musicConsent([], GIVEN, asking)
  expect(answer.code).toBe(0)
  expect(asked).toEqual([[]])
})

test("the consent module is asked for every scope rather than a named one", async () => {
  const asked: string[][] = []
  const asking: Asking = async (args) => {
    asked.push([...args])
  }
  await musicConsent([], GIVEN, asking)
  expect(asked[0]).toEqual([])
})

test("a consent that threw is refused rather than said to be saved", async () => {
  const asking: Asking = async () => {
    throw new Error("spotify refused the consent, saying access_denied")
  }
  const answer = await musicConsent([], GIVEN, asking)
  expect(answer.code).not.toBe(0)
})

test("the rows say what became of the consent", () => {
  expect(rowsOf("spotify consent is saved")).toEqual(["spotify consent is saved"])
})
