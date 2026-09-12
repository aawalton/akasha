import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { asThrowaway } from "akasha/commands/arguments/pages/as-throwaway.argument.ts"
import { expectAttr } from "akasha/commands/arguments/pages/expect-attr.argument.ts"
import { expectAttrMode } from "akasha/commands/arguments/pages/expect-attr-mode.argument.ts"
import { expectAttrSelector } from "akasha/commands/arguments/pages/expect-attr-selector.argument.ts"
import { expectAttrValue } from "akasha/commands/arguments/pages/expect-attr-value.argument.ts"
import { expectCount } from "akasha/commands/arguments/pages/expect-count.argument.ts"
import { expectCountSelector } from "akasha/commands/arguments/pages/expect-count-selector.argument.ts"
import { expectText } from "akasha/commands/arguments/pages/expect-text.argument.ts"
import { expectTitle } from "akasha/commands/arguments/pages/expect-title.argument.ts"
import { hydrationSelector } from "akasha/commands/arguments/pages/hydration-selector.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { noSignIn } from "akasha/commands/arguments/pages/no-sign-in.argument.ts"
import { pageType } from "akasha/commands/arguments/pages/page-type.argument.ts"
import { path } from "akasha/commands/arguments/pages/path.argument.ts"
import { rootSelector } from "akasha/commands/arguments/pages/root-selector.argument.ts"
import { signInPath } from "akasha/commands/arguments/pages/sign-in-path.argument.ts"
import { timeoutMs } from "akasha/commands/arguments/pages/timeout-ms.argument.ts"
import { url } from "akasha/commands/arguments/pages/url.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { browserTestVerifyRender } from "akasha/commands/pages/browser/test-verify-render/browser-test-verify-render.command.code.ts"
import { browserTestVerifyRender as page } from "akasha/commands/pages/browser/test-verify-render/browser-test-verify-render.command.ts"

const CALLED_AS = "akasha browser test-verify-render"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PART = "argument/"

const PAGES: readonly Argument[] = [
  json,
  url,
  signInPath,
  path,
  pageType,
  rootSelector,
  hydrationSelector,
  timeoutMs,
  noSignIn,
  asThrowaway,
  expectText,
  expectTitle,
  expectCountSelector,
  expectCount,
  expectAttrSelector,
  expectAttr,
  expectAttrValue,
  expectAttrMode,
]

type Declared = { readonly said: string; readonly required: boolean; readonly carries: boolean }

const DECLARED: readonly Declared[] = page.arguments.map((one) => {
  const held = PAGES.find((each) => each.slug === one.argument.slice(PART.length))
  if (held === undefined) {
    throw new Error(`\`${one.argument}\` is declared and no page here is named for it`)
  }
  return {
    said: held.said,
    required: "required" in one && one.required === true,
    carries: held.value !== "none",
  }
})

const REQUIRED = DECLARED.filter((one) => one.required)

const LOCAL = "http://localhost:3000"

const WHERE = [url.said, LOCAL, path.said, "/a-page", pageType.said, "a-page-type"]

const TEXT = [expectText.said, "what a healthy render says"]

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await browserTestVerifyRender(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(DECLARED.length).toBe(page.arguments.length)
  expect(REQUIRED.map((one) => one.said)).toEqual([url.said, path.said, pageType.said])
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(DECLARED.map((one) => one.said).join("`, `"))
})

test("a call saying nothing asks by name for each argument the page requires", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(REQUIRED.length)
  for (const one of REQUIRED) {
    expect(said.some((each) => each.includes(`\`${one.said}\``))).toBe(true)
  }
})

test("no argument the page leaves optional is asked for", async () => {
  const said = (await refusalsOf([])).join("\n")
  for (const one of DECLARED.filter((each) => !each.required)) {
    expect(said).not.toContain(one.said)
  }
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalsOf([url.said])
  expect(said[0]).toBe(`\`${url.said}\` takes a value, and none follows it`)
})

test("an argument carrying no value is refused where a value is joined to it", async () => {
  for (const one of DECLARED.filter((each) => !each.carries)) {
    const said = await refusalsOf([...WHERE, ...TEXT, `${one.said}=1`])
    expect(said.length).toBe(1)
    expect(said[0]).toContain(`\`${one.said}\``)
    expect(said[0]).toContain("carries no value")
  }
})

test("an argument taking a whole number is refused a word that is none", async () => {
  const said = await refusalsOf([...WHERE, ...TEXT, timeoutMs.said, "soon"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`${timeoutMs.said} soon`)
  expect(said[0]).toContain("whole number")
})

test("an argument said twice is refused rather than taken once", async () => {
  const said = await refusalsOf([...WHERE, ...TEXT, path.said, "/another"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${path.said}\``)
  expect(said[0]).toContain("twice")
})

test("a call asserting nothing discriminating is refused before any browser opens", async () => {
  const said = await refusalsOf(WHERE)
  expect(said.length).toBe(1)
  expect(said[0]).toContain("nothing discriminating")
  expect(said[0]).toContain(expectText.said)
  expect(said[0]).toContain(expectCountSelector.said)
  expect(said[0]).toContain(expectCount.said)
  expect(said[0]).toContain(expectAttrSelector.said)
  expect(said[0]).toContain(expectAttr.said)
  expect(said[0]).toContain(expectAttrValue.said)
})

test("a count selector with no count asserts nothing discriminating", async () => {
  const said = await refusalsOf([...WHERE, expectCountSelector.said, ".row"])
  expect(said[0]).toContain("nothing discriminating")
})

test("an attribute selector short of its value asserts nothing discriminating", async () => {
  const said = await refusalsOf([
    ...WHERE,
    expectAttrSelector.said,
    ".link",
    expectAttr.said,
    "href",
  ])
  expect(said[0]).toContain("nothing discriminating")
})

test("a title alone asserts nothing discriminating", async () => {
  const said = await refusalsOf([...WHERE, expectTitle.said, "A Page"])
  expect(said[0]).toContain("nothing discriminating")
})

test("the text expected alone is discriminating, so the origin is what is weighed next", async () => {
  const said = await refusalsOf([...WHERE, ...TEXT])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(url.said)
  expect(said[0]).toContain(LOCAL)
})

test("a count selector with its count is discriminating", async () => {
  const said = await refusalsOf([...WHERE, expectCountSelector.said, ".row", expectCount.said, "3"])
  expect(said[0]).toContain(LOCAL)
})

test("an attribute selector with its attribute and value is discriminating", async () => {
  const said = await refusalsOf([
    ...WHERE,
    expectAttrSelector.said,
    ".link",
    expectAttr.said,
    "href",
    expectAttrValue.said,
    "/elsewhere",
  ])
  expect(said[0]).toContain(LOCAL)
})

test("an origin on the loopback address is refused as a localhost one is", async () => {
  const said = await refusalsOf([
    url.said,
    "http://127.0.0.1:8080",
    path.said,
    "/a-page",
    pageType.said,
    "a-page-type",
    ...TEXT,
  ])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("127.0.0.1:8080")
})
