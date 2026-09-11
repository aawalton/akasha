import { directiveKept as test } from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.ts"
import type {
  Case,
  PageReading,
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

const SIGNS = /\{asked\}|\{turn\}|\{rule\}/g

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

export type Asked = {
  readonly statement: string
  readonly prompt: string
}

export function ruleOf(one: Directive): string {
  return [`${one.name}: ${one.act}`, one.warrant, ...one.aids.map((aid) => `- ${aid}`)].join("\n")
}

export function filling(prompt: string, values: Readonly<Record<string, string>>): string {
  return prompt.replace(SIGNS, (sign) => values[sign] ?? sign)
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

export function asking(one: Case, reading: PageReading): string | null {
  const page = reading(PERSON, one.page)
  if (page === null) return null
  for (const found of directivesIn(page[DIRECTIVES])) {
    if (found.name !== one.against) continue
    return filling(test.prompt, {
      [ASKED]: one.asked ?? "",
      [TURN]: one.statement,
      [RULE]: ruleOf(found),
    })
  }
  return null
}

export function directiveKept(judging: Judging): readonly Asked[] {
  return judging.directives.map((one) => {
    const rule = ruleOf(one)
    return {
      statement: rule,
      prompt: filling(test.prompt, {
        [ASKED]: judging.asked,
        [TURN]: judging.turn,
        [RULE]: rule,
      }),
    }
  })
}
