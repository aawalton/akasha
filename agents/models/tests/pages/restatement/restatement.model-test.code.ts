import { restatement as test } from "akasha/agents/models/tests/pages/restatement/restatement.model-test.ts"
import {
  type Case,
  keptBy,
  type PageReading,
} from "akasha/agents/models/tests/running/model-test-running.module.code.ts"

export type Judging = {
  readonly slug: string
  readonly definition: string
  readonly invariants?: readonly { readonly invariantKind: string; readonly statement: string }[]
}

export type Asked = {
  readonly statement: string
  readonly prompt: string
}

export function asking(one: Case, reading: PageReading): string | null {
  void reading
  return test.prompt
    .replace("{page}", () => one.page)
    .replace("{definition}", () => one.definition)
    .replace("{statement}", () => one.statement)
}

export function keeping(one: Case, got: string): boolean {
  return keptBy(one, got)
}

export function restatement(page: Judging): readonly Asked[] {
  return (page.invariants ?? [])
    .filter((invariant) => invariant.invariantKind === "departure")
    .map((invariant) => ({
      statement: invariant.statement,
      prompt: test.prompt
        .replace("{page}", page.slug)
        .replace("{definition}", page.definition)
        .replace("{statement}", invariant.statement),
    }))
}
