import {
  type Asked,
  anyYes,
  type Case,
  filling,
  type Got,
} from "akasha/agent/model/test/modules/running/model-test-running.module.code.ts"
import { needsAttention as test } from "akasha/agent/model/test/pages/needs-attention/needs-attention.model-test.ts"

const ASKED = "{asked}"

const TURN = "{turn}"

const YES = "YES"

export function promptFor(asked: string, turn: string): string {
  return filling(test.prompt, { [ASKED]: asked, [TURN]: turn })
}

export function asking(one: Case): readonly Asked[] {
  return [{ about: test.slug, prompt: promptFor(one.asked ?? "", one.statement) }]
}

export function keeping(one: Case, got: readonly Got[]): boolean {
  return anyYes(got) === (one.answer === YES)
}
