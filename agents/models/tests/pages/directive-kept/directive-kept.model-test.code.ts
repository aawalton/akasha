import { directiveKept as test } from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.ts"

const TURN = "{turn}"

const RULE = "{rule}"

export type Directive = {
  readonly name: string
  readonly act: string
  readonly warrant: string
  readonly aids: readonly string[]
}

export type Judging = {
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

export function directiveKept(judging: Judging): readonly Asked[] {
  return judging.directives.map((one) => {
    const rule = ruleOf(one)
    return {
      statement: rule,
      prompt: test.prompt.replace(TURN, () => judging.turn).replace(RULE, () => rule),
    }
  })
}
