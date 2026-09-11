import {
  type Directive,
  directivesIn,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { directivesKept as test } from "akasha/agents/models/tests/pages/directives-kept/directives-kept.model-test.ts"
import {
  type Case,
  filling,
  type PageReading,
} from "akasha/agents/models/tests/running/model-test-running.module.code.ts"

const PERSON = "person"

const DIRECTIVES = "directives"

const ASKED = "{asked}"

const TURN = "{turn}"

const RULES = "{rules}"

const YES = "YES"

const LETTERS = /[^a-z]/g

export function rulesOf(every: readonly Directive[]): string {
  return every.map((one) => ruleOf(one)).join("\n\n")
}

export function lettersIn(said: string): string {
  return said.toLowerCase().replace(LETTERS, "")
}

export function names(got: string, rule: string): boolean {
  const said = lettersIn(got)
  const name = lettersIn(rule)
  return name !== "" && said.startsWith(name)
}

export function asking(one: Case, reading: PageReading): string | null {
  const page = reading(PERSON, one.page)
  if (page === null) return null
  const every = directivesIn(page[DIRECTIVES])
  if (every.length === 0) return null
  return filling(test.prompt, {
    [ASKED]: one.asked ?? "",
    [TURN]: one.statement,
    [RULES]: rulesOf(every),
  })
}

export function keeping(one: Case, got: string): boolean {
  return names(got, one.against ?? "") === (one.answer === YES)
}
