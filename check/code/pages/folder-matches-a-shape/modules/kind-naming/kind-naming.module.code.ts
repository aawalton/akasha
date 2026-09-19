import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"

export function covering(
  standing: Standing,
  wanted: readonly string[],
  pageTypeSlug: string
): boolean {
  return wanted.some((one) => standing.extending(pageTypeSlug, one))
}

export function kindsNamedBy(
  standing: Standing,
  wanted: readonly string[],
  name: string
): readonly string[] {
  const found = new Set<string>()
  if (covering(standing, wanted, name)) found.add(name)
  for (const one of wanted) {
    if (one === name || one.endsWith(`-${name}`)) found.add(one)
  }
  for (const one of standing.gathered(name)) {
    if (covering(standing, wanted, one)) found.add(one)
  }
  return [...found]
}
