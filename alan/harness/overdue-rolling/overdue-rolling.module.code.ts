import { patchPages } from "@akasha/pages/access/patch"
import type { Page, PageWhere } from "@akasha/pages/core/page-types"
import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"

export const WRITER = "overdue-rolling"

export type Rolling = {
  readonly pageTypeSlug: string
  readonly dueKey: string
  readonly undone: PageWhere
}

export const ROLLED: readonly Rolling[] = [
  {
    pageTypeSlug: "to-do",
    dueKey: "toDoDueDate",
    undone: [{ key: "toDoCompletedAt", isEmpty: true }],
  },
]

export function narrowFor(one: Rolling, day: string): PageWhere {
  return [{ key: one.dueKey, lt: day }, ...one.undone]
}

export type Patching = (args: {
  readonly pageTypeSlug: string
  readonly where: PageWhere
  readonly set: Readonly<Record<string, string>>
}) => Promise<readonly Page[]>

export type Rolled = {
  readonly pageTypeSlug: string
  readonly slugs: readonly string[]
}

export async function rolledOnto(one: Rolling, day: string, patch: Patching): Promise<Rolled> {
  const moved = await patch({
    pageTypeSlug: one.pageTypeSlug,
    where: narrowFor(one, day),
    set: { [one.dueKey]: day },
  })
  return {
    pageTypeSlug: one.pageTypeSlug,
    slugs: moved.flatMap((each) => (each.slug === null ? [] : [each.slug])),
  }
}

export async function rollingOnto(
  day: string,
  patch: Patching = patchPages
): Promise<readonly Rolled[]> {
  const rolled: Rolled[] = []
  for (const one of ROLLED) rolled.push(await rolledOnto(one, day, patch))
  return rolled
}

export function saidOf(rolled: readonly Rolled[], day: string): string {
  const each = rolled.map((one) => `${one.slugs.length} of \`${one.pageTypeSlug}\``)
  return `${each.join(", ")} now come due on ${day}`
}

if (import.meta.main) {
  process.env.PAGE_WRITER = WRITER
  const day = getEsoDayStr(new Date())
  const rolled = await rollingOnto(day)
  process.stdout.write(`${saidOf(rolled, day)}\n`)
}
