import { restatement as test } from "./restatement.model-test.ts"

export type Judging = {
  readonly slug: string
  readonly definition: string
  readonly invariants?: readonly { readonly invariantKind: string; readonly statement: string }[]
}

export function restatement(page: Judging): readonly string[] {
  return (page.invariants ?? [])
    .filter((invariant) => invariant.invariantKind === "departure")
    .map((invariant) =>
      test.prompt
        .replace("{page}", page.slug)
        .replace("{definition}", page.definition)
        .replace("{statement}", invariant.statement)
    )
}
