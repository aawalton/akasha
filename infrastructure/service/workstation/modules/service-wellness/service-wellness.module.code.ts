import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

export const WELL = "well"

export const LOOKED_AT = "lookedAt"

export type Verdict = {
  readonly slug: string
  readonly pagePath: string
  readonly broken: string | null
}

function wellIn(one: Verdict): boolean {
  return one.broken === null
}

function unchanged(root: string, one: Verdict): boolean {
  return uncommittedIn(root, one.pagePath)?.[WELL] === wellIn(one)
}

export function keepVerdicts(root: string, verdicts: readonly Verdict[]): readonly string[] {
  const wrote: string[] = []
  for (const one of verdicts) {
    if (unchanged(root, one)) continue
    mergeUncommitted(root, one.pagePath, { [WELL]: wellIn(one) })
    wrote.push(one.slug)
  }
  return wrote
}

export function lookedBeside(
  root: string,
  verdicts: readonly Verdict[],
  now: string,
  own: string | null
): readonly string[] {
  const wrote = keepVerdicts(root, verdicts)
  if (own !== null) mergeUncommitted(root, own, { [LOOKED_AT]: now })
  return wrote
}

export function looked(
  root: string,
  verdicts: readonly Verdict[],
  now: string,
  slug: string
): readonly string[] {
  const mine = verdicts.find((one) => one.slug === slug)
  return lookedBeside(root, verdicts, now, mine?.pagePath ?? null)
}
