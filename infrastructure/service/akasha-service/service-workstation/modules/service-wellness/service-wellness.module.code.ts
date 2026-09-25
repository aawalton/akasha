import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

const SERVICE_WORKSTATION = "service-workstation"

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

export function watcherPageIn(root: string, slug: string): string | null {
  return listedAt(root, SERVICE_WORKSTATION, slug)[0]?.path ?? null
}

export function sayingOf(
  verdicts: readonly Verdict[],
  wrote: readonly string[]
): readonly string[] {
  return verdicts
    .filter((one) => wrote.includes(one.slug))
    .map((one) =>
      one.broken === null ? `${one.slug} is well` : `${one.slug} is broken: ${one.broken}`
    )
}
