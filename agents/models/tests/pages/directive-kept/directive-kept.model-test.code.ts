import { directiveKept as test } from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.ts"

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
