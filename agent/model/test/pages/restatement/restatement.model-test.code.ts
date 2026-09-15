import {
  type Asked,
  type Case,
  type Got,
  keptBy,
  type PageReading,
} from "akasha/agent/model/test/modules/running/model-test-running.module.code.ts"
import { restatement as test } from "akasha/agent/model/test/pages/restatement/restatement.model-test.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type Judging = {
  readonly slug: string
  readonly definition: string
  readonly decisions?: readonly { readonly decisionKind: string; readonly statement: string }[]
}

export type Putting = {
  readonly statement: string
  readonly prompt: string
}

export function asking(one: Case, reading: PageReading): readonly Asked[] {
  void reading
  return [
    {
      about: one.page,
      prompt: test.prompt
        .replace("{page}", () => one.page)
        .replace("{definition}", () => one.definition)
        .replace("{statement}", () => one.statement),
    },
  ]
}

export function keeping(one: Case, got: readonly Got[]): boolean {
  return keptBy(one, got)
}

export function restatement(page: Judging): readonly Putting[] {
  return (page.decisions ?? [])
    .filter((decision) => slugOf(decision.decisionKind) === "departure")
    .map((decision) => ({
      statement: decision.statement,
      prompt: test.prompt
        .replace("{page}", page.slug)
        .replace("{definition}", page.definition)
        .replace("{statement}", decision.statement),
    }))
}
