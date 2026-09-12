import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { callbackUrl } from "akasha/commands/arguments/pages/callback-url.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { googleLogin } from "akasha/commands/pages/google/login/google-login.command.code.ts"
import { googleLogin as page } from "akasha/commands/pages/google/login/google-login.command.ts"

const CALLED_AS = "akasha google login"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const PAGES = [callbackUrl]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const A_URL = "http://localhost:8080/oauth"

const loginRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await googleLogin(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the callback URL is the one argument the page names, and a call may leave it out", () => {
  expect(SAYS).toEqual([callbackUrl.said])
  expect(page.arguments.length).toBe(1)
  expect(page.arguments[0]).not.toHaveProperty("required")
})

test("a flag this takes no argument at is refused, naming the one argument it takes", async () => {
  const said = await loginRefusing(["--nope"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(`\`${callbackUrl.said}\``)
})

test("a URL said as a word is refused, this taking it at its flag alone", async () => {
  const said = await loginRefusing([A_URL])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${A_URL}\``)
  expect(said[0]).toContain(`\`${callbackUrl.said}\``)
})

test("a word after a bare dash pair is refused too, nothing here being said as a word", async () => {
  const said = await loginRefusing(["--", callbackUrl.said])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${callbackUrl.said}\``)
  expect(said[0]).toContain("no argument")
})

test("the callback URL at its flag with nothing after it is refused", async () => {
  const said = await loginRefusing([callbackUrl.said])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${callbackUrl.said}\``)
  expect(said[0]).toContain("takes a value")
})

test("the callback URL joined to an empty value is refused as the call wrote it", async () => {
  const said = await loginRefusing([`${callbackUrl.said}=`])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${callbackUrl.said}=\``)
})

test("the empty word after the callback URL names no value", async () => {
  const said = await loginRefusing([callbackUrl.said, ""])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${callbackUrl.said}\``)
  expect(said[0]).toContain("empty word")
})

test("the callback URL said twice is refused rather than the later one winning", async () => {
  const said = await loginRefusing([callbackUrl.said, A_URL, callbackUrl.said, `${A_URL}/two`])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${callbackUrl.said}\``)
  expect(said[0]).toContain("twice")
})
