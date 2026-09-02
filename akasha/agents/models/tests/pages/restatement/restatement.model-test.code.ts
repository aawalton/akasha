import { restatement as test } from "./restatement.model-test.ts"

export type Judging = {
  readonly slug: string
  readonly definition: string
  readonly invariants?: readonly { readonly invariantKind: string; readonly statement: string }[]
}

export type Asked = {
  readonly statement: string
  readonly prompt: string
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
