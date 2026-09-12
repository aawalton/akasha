import { directiveKept as test } from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.ts"
import {
  type Asked,
  anyYes,
  type Beside,
  type Case,
  filling,
  type Got,
  type PageReading,
} from "akasha/agents/models/tests/running/model-test-running.module.code.ts"

const PERSON = "person"

const NAME = "name"

const ACT = "act"

const WARRANT = "warrant"

const AIDS = "aids"

const DIRECTIVES = "directives"

const ASKED = "{asked}"

const TURN = "{turn}"

const RULE = "{rule}"

const YES = "YES"

const JUDGED = "Neither Clock Nor Meter"

export type Directive = {
  readonly name: string
  readonly act: string
  readonly warrant: string
  readonly aids: readonly string[]
}

export type Judging = {
  readonly asked: string
  readonly turn: string
  readonly directives: readonly Directive[]
}

export type Putting = {
  readonly statement: string
  readonly prompt: string
}

export type Putter = (judging: Judging) => readonly Putting[]

export function ruleOf(one: Directive): string {
  return [`${one.name}: ${one.act}`, one.warrant, ...one.aids.map((aid) => `- ${aid}`)].join("\n")
}

export function directivesIn(given: unknown): readonly Directive[] {
  if (!Array.isArray(given)) return []
  const found: Directive[] = []
  for (const one of given) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const held = one as Record<string, unknown>
    const name = held[NAME]
    const act = held[ACT]
    const warrant = held[WARRANT]
    const aids = held[AIDS]
    if (typeof name !== "string" || typeof act !== "string" || typeof warrant !== "string") continue
    if (!Array.isArray(aids) || aids.some((aid) => typeof aid !== "string")) continue
    found.push({ name, act, warrant, aids: aids as readonly string[] })
  }
  return found
}

export function judgedIn(directives: readonly Directive[], judged: string): readonly Directive[] {
  return directives.filter((one) => one.name === judged)
}

export function judgingOf(prompt: string, judged: string): Beside {
  return {
    asking(one: Case, reading: PageReading): readonly Asked[] {
      const page = reading(PERSON, one.page)
      if (page === null) return []
      return judgedIn(directivesIn(page[DIRECTIVES]), judged).map((found) => ({
        about: found.name,
        prompt: filling(prompt, {
          [ASKED]: one.asked ?? "",
          [TURN]: one.statement,
          [RULE]: ruleOf(found),
        }),
      }))
    },
    keeping(one: Case, got: readonly Got[]): boolean {
      return anyYes(got) === (one.answer === YES && one.against === judged)
    },
  }
}

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export function puttingOf(prompt: string, judged: string): Putter {
  return (judging: Judging) =>
    judgedIn(judging.directives, judged).map((one) => {
      const rule = ruleOf(one)
      return {
        statement: rule,
        prompt: filling(prompt, {
          [ASKED]: judging.asked,
          [TURN]: judging.turn,
          [RULE]: rule,
        }),
      }
    })
}

export const directiveKept = puttingOf(test.prompt, JUDGED)
