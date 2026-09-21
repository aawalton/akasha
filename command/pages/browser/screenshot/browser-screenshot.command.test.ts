import { expect, test } from "bun:test"
import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"
import { expandPanels } from "akasha/command/argument/pages/expand-panels.argument.ts"
import { fullPage } from "akasha/command/argument/pages/full-page.argument.ts"
import { height } from "akasha/command/argument/pages/height.argument.ts"
import { hydrationSelector } from "akasha/command/argument/pages/hydration-selector.argument.ts"
import { out } from "akasha/command/argument/pages/out.argument.ts"
import { path } from "akasha/command/argument/pages/path.argument.ts"
import { rootSelector } from "akasha/command/argument/pages/root-selector.argument.ts"
import { signInPath } from "akasha/command/argument/pages/sign-in-path.argument.ts"
import { signedIn } from "akasha/command/argument/pages/signed-in.argument.ts"
import { timeoutMs } from "akasha/command/argument/pages/timeout-ms.argument.ts"
import { url } from "akasha/command/argument/pages/url.argument.ts"
import { width } from "akasha/command/argument/pages/width.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { browserScreenshot } from "akasha/command/pages/browser/screenshot/browser-screenshot.command.code.ts"
import { browserScreenshot as page } from "akasha/command/pages/browser/screenshot/browser-screenshot.command.ts"

const CALLED_AS = "akasha browser screenshot"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PART = "argument/"

const PAGES: readonly Argument[] = [
  url,
  path,
  out,
  width,
  height,
  fullPage,
  expandPanels,
  signedIn,
  signInPath,
  rootSelector,
  hydrationSelector,
  timeoutMs,
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

const WHERE = [url.said, LOCAL, path.said, "/a-page", out.said, "/var/tmp/a-shot.png"]

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await browserScreenshot(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(DECLARED.length).toBe(page.arguments.length)
  expect(REQUIRED.map((one) => one.said)).toEqual([url.said, path.said, out.said])
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

test("a flag this takes nothing of is refused, naming every argument in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(DECLARED.map((one) => one.said).join("`, `"))
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalsOf([out.said])
  expect(said[0]).toBe(`\`${out.said}\` takes a value, and none follows it`)
})

test("an argument carrying no value is refused where a value is joined to it", async () => {
  for (const one of DECLARED.filter((each) => !each.carries)) {
    const said = await refusalsOf([...WHERE, `${one.said}=1`])
    expect(said.length).toBe(1)
    expect(said[0]).toContain(`\`${one.said}\``)
    expect(said[0]).toContain("carries no value")
  }
})

test("an argument taking a whole number is refused a word that is none", async () => {
  const said = await refusalsOf([...WHERE, width.said, "wide"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`${width.said} wide`)
  expect(said[0]).toContain("whole number")
})

test("an origin on the loopback address is refused as a localhost one is", async () => {
  const said = await refusalsOf([
    url.said,
    "http://127.0.0.1:8080",
    path.said,
    "/a-page",
    out.said,
    "/var/tmp/a-shot.png",
  ])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("127.0.0.1:8080")
})

test("a localhost origin is refused before any browser opens", async () => {
  const said = await refusalsOf(WHERE)
  expect(said.length).toBe(1)
  expect(said[0]).toContain(url.said)
  expect(said[0]).toContain(LOCAL)
})
