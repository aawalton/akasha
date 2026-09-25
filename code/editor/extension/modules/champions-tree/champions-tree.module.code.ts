export interface DomainRow {
  readonly slug: string
  readonly relPath: string
  readonly persona: string | null
  readonly parent: string | null
  readonly sequence: readonly string[]
}

export interface DomainNode {
  readonly slug: string
  readonly relPath: string
  readonly persona: string | null
  readonly position: number | null
  readonly children: readonly DomainNode[]
}

interface Placed {
  readonly slug: string
  readonly position: number | null
}

interface ChampionTree {
  readonly roots: readonly DomainNode[]
  readonly unreached: readonly string[]
}

function ordered(parent: DomainRow, kin: readonly string[]): readonly Placed[] {
  if (parent.sequence.length === 0) return kin.map((slug) => ({ slug, position: null }))
  const named = new Set(parent.sequence)
  const placed: Placed[] = []
  const unplaced: Placed[] = []
  for (const slug of kin) {
    if (named.has(slug)) placed.push({ slug, position: placed.length + 1 })
    else unplaced.push({ slug, position: null })
  }
  return [...placed, ...unplaced]
}

export function championTree(rows: readonly DomainRow[]): ChampionTree {
  const byslug = new Map(rows.map((row) => [row.slug, row]))
  const children = new Map<string, string[]>()
  const rootSlugs: string[] = []
  for (const row of [...rows].sort((a, b) => a.slug.localeCompare(b.slug))) {
    const parent = row.parent
    if (parent === null || parent === row.slug || !byslug.has(parent)) {
      rootSlugs.push(row.slug)
      continue
    }
    const kin = children.get(parent) ?? []
    kin.push(row.slug)
    children.set(parent, kin)
  }

  const seen = new Set<string>()
  const build = (slug: string, position: number | null): DomainNode => {
    seen.add(slug)
    const row = byslug.get(slug) as DomainRow
    return {
      slug,
      relPath: row.relPath,
      persona: row.persona,
      position,
      children: ordered(row, children.get(slug) ?? [])
        .filter((one) => !seen.has(one.slug))
        .map((one) => build(one.slug, one.position)),
    }
  }
  const roots = rootSlugs.map((slug) => build(slug, null))
  const unreached = rows
    .map((row) => row.slug)
    .filter((slug) => !seen.has(slug))
    .sort((a, b) => a.localeCompare(b))
  return { roots, unreached }
}

type Nested = { readonly children: readonly Nested[] }

export function countNodes(nodes: readonly Nested[]): number {
  let total = 0
  for (const node of nodes) total += 1 + countNodes(node.children)
  return total
}
