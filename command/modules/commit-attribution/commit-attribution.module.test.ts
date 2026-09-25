import { expect, test } from "bun:test"
import { modelVersion } from "akasha/agent/model/version/model-version.page-type.ts"
import { claudeOpus55 } from "akasha/agent/model/version/pages/claude-opus-5-5.model-version.ts"
import { claudeOpus551m } from "akasha/agent/model/version/pages/claude-opus-5-5-1m.model-version.ts"
import {
  type Attribution,
  attributed,
  attributionFrom,
  attributionHeld,
  attributionLines,
  modelNamed,
} from "akasha/command/modules/commit-attribution/commit-attribution.module.code.ts"

const SESSION = "session_015hThfHxKwTU3dXSpN4iZBP"

const OPUS_EXTENDED = `${modelVersion.slug}/${claudeOpus551m.slug}`

const OPUS = `${modelVersion.slug}/${claudeOpus55.slug}`

const HELD: Attribution = { model: OPUS_EXTENDED, session: SESSION }

const CO_AUTHORED = "Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"

const SAID = `Claude-Session: https://claude.ai/code/${SESSION}`

test("a message stating no attribution gains both lines at its end", () => {
  expect(attributed("the subject line\n\nthe body", HELD)).toBe(
    `the subject line\n\nthe body\n\n${CO_AUTHORED}\n${SAID}`
  )
})

test("a message that already states the attribution gains no second one", () => {
  const message = `the subject line\n\n${CO_AUTHORED}\n${SAID}`
  expect(attributed(message, HELD)).toBe(message)
})

test("a key already there is matched whatever case it is written in", () => {
  const message = "the subject line\n\nco-authored-by: Someone <one@two.three>"
  expect(attributed(message, HELD)).toBe(`${message}\n${SAID}`)
})

test("a message stating one key of the two gains only the other", () => {
  const message = `the subject line\n\n${CO_AUTHORED}`
  expect(attributed(message, HELD)).toBe(`${message}\n${SAID}`)
})

test("a message whose last block is trailers takes the attribution with no blank line between", () => {
  const message = "the subject line\n\nChecks-bypassed: mid-refactor"
  expect(attributed(message, HELD)).toBe(`${message}\n${CO_AUTHORED}\n${SAID}`)
})

test("a message of one line holding a colon takes the attribution under a blank line", () => {
  const message = "ember-ae5b35f9310c8752c: a subagent states the agent id it acts under"
  expect(attributed(message, HELD)).toBe(`${message}\n\n${CO_AUTHORED}\n${SAID}`)
})

test("a message whose last block is prose holding a colon takes the attribution under a blank line", () => {
  const message = "the subject line\n\nthe body says this: and that"
  expect(attributed(message, HELD)).toBe(`${message}\n\n${CO_AUTHORED}\n${SAID}`)
})

test("the attribution lines come last", () => {
  const said = attributed("the subject line\n\nChecks-bypassed: mid-refactor", HELD).split("\n")
  expect(said.slice(-2)).toEqual([CO_AUTHORED, SAID])
})

test("a commit no model is recorded for is co-authored as Claude", () => {
  expect(attributed("the subject line", { model: null, session: SESSION })).toBe(
    `the subject line\n\nCo-Authored-By: Claude <noreply@anthropic.com>\n${SAID}`
  )
})

test("a model a seat records as a model version is named by that version's title", () => {
  expect(modelNamed(OPUS_EXTENDED)).toBe("Claude Opus 5.5 (1M context)")
  expect(modelNamed(OPUS)).toBe("Claude Opus 5.5")
})

test("a model version no page carries is co-authored as Claude", () => {
  expect(modelNamed(`${modelVersion.slug}/claude-nothing-at-all`)).toBe("Claude")
})

test("a model named other than as a model version is co-authored as Claude", () => {
  expect(modelNamed(claudeOpus551m.modelId)).toBe("Claude")
})

test("no session line is written where no session is known", () => {
  expect(attributionLines({ model: OPUS, session: null })).toEqual([
    "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
  ])
  expect(attributed("the subject line", { model: OPUS, session: null })).toBe(
    "the subject line\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
  )
})

test("the session named is the one the seat page states", () => {
  expect(attributionFrom({ bridgeSessionId: SESSION }).session).toBe(SESSION)
  expect(attributionFrom({ bridgeSessionId: "" }).session).toBe(null)
  expect(attributionFrom({}).session).toBe(null)
  expect(attributionFrom(null).session).toBe(null)
})

test("the model named is the one the seat page states", () => {
  expect(attributionFrom({ model: OPUS_EXTENDED }).model).toBe(OPUS_EXTENDED)
  expect(attributionFrom({ model: "" }).model).toBe(null)
  expect(attributionFrom(null).model).toBe(null)
})

test("the session the environment names is not read", () => {
  expect(attributionHeld({ CLAUDE_CODE_BRIDGE_SESSION_ID: SESSION }).session).toBe(null)
})

test("a commit no agent is writing is co-authored as Claude", () => {
  expect(attributionLines(attributionHeld({}))).toEqual([
    "Co-Authored-By: Claude <noreply@anthropic.com>",
  ])
})
