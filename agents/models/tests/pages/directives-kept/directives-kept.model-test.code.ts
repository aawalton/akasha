import {
  type Directive,
  directivesIn,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { directivesKept as test } from "akasha/agents/models/tests/pages/directives-kept/directives-kept.model-test.ts"
import {
  type Asked,
  type Case,
  filling,
  type Got,
  type PageReading,
} from "akasha/agents/models/tests/running/model-test-running.module.code.ts"

const PERSON = "person"

const DIRECTIVES = "directives"

const ASKED = "{asked}"

const TURN = "{turn}"

const RULES = "{rules}"

const YES = "YES"

const NONE = "none"

const LETTERS = /[^a-z]/g

const ABOUT = "every rule"

export function rulesOf(every: readonly Directive[]): string {
  return every.map((one) => ruleOf(one)).join("\n\n")
}

function lettersIn(said: string): string {
  return said.toLowerCase().replace(LETTERS, "")
}

export function namesARule(got: string): boolean {
  const said = lettersIn(got)
  return said !== "" && !said.startsWith(NONE)
}

export function asking(one: Case, reading: PageReading): readonly Asked[] {
  const page = reading(PERSON, one.page)
  if (page === null) return []
  const every = directivesIn(page[DIRECTIVES])
  if (every.length === 0) return []
  return [
    {
      about: ABOUT,
      prompt: filling(test.prompt, {
        [ASKED]: one.asked ?? "",
        [TURN]: one.statement,
        [RULES]: rulesOf(every),
      }),
    },
  ]
}

export function keeping(one: Case, got: readonly Got[]): boolean {
  return namesARule(got[0]?.said ?? "") === (one.answer === YES)
}
