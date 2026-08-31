import { expect, test } from "bun:test"
import { join } from "node:path"
import type { Given } from "../../calling/calling.module.code.ts"
import { DATA, INPUT } from "../../cli/cli.module.code.ts"
import { iosApp, readIn } from "./ios-app.command.code.ts"
import { iosApp as page } from "./ios-app.command.ts"

const root = join(import.meta.dir, "..", "..", "..", "..")

function given(at: string): Given {
  return { root: at, calledAs: "akasha ios-app", from: at, writer: null, agentId: null }
}

test("an act nobody named is refused with the acts there are", () => {
  const held = readIn([])
  expect("refused" in held ? held.refused : "").toContain("build")
})

test("an act this does not carry is refused rather than tried", () => {
  const held = readIn(["deploy", "alanwalton"])
  expect("refused" in held ? held.refused : "").toContain("deploy")
})

test("an act naming no app is refused rather than defaulted", () => {
  const held = readIn(["build"])
  expect("refused" in held ? held.refused : "").toContain("names an app")
})

test("one call names one app", () => {
  const held = readIn(["build", "alanwalton", "smilingjenny"])
  expect("refused" in held ? held.refused : "").toContain("one call names one app")
})

test("an app and an act stand as the first word and the second", () => {
  expect(readIn(["build", "alanwalton"])).toEqual({ act: "build", app: "alanwalton" })
})

test("an app no page is slugged for refuses at the data rather than the caller", () => {
  const answer = iosApp(["build", "nosuchapp"], given(root))
  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("nosuchapp")
})

test("an app naming no build script refuses before reaching a machine", () => {
  const answer = iosApp(["build", "smilingjenny"], given(root))
  expect(answer.code).toBe(DATA)
  expect(answer.refusals.join(" ")).toContain("build-script")
})

test("a caller saying nothing is refused as the caller's fault", () => {
  expect(iosApp([], given(root)).code).toBe(INPUT)
})

test("every act the page shows is one this takes", () => {
  for (const one of page.taking) {
    const first = one.said.split(" ")[0] ?? ""
    if (first.startsWith("<")) continue
    const held = readIn([first])
    expect("refused" in held ? held.refused : "").not.toContain("is no act this carries")
  }
})
