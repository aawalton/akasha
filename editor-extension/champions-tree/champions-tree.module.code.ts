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

export interface ChampionTree {
  readonly roots: readonly DomainNode[]
  readonly unreached: readonly string[]
}

function ordered(parent: DomainRow, kin: readonly string[]): readonly Placed[] {
  if (parent.sequence.length === 0) return kin.map((slug) => ({ slug, position: null }))
  const kinship = new Set(kin)
  const placed = new Map<string, number>()
  for (const slug of parent.sequence) {
    if (!kinship.has(slug) || placed.has(slug)) continue
    placed.set(slug, placed.size + 1)
  }
  return [
    ...[...placed].map(([slug, position]) => ({ slug, position })),
    ...kin.filter((one) => !placed.has(one)).map((slug) => ({ slug, position: null })),
  ]
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

// A COUNT ASKS FOR CHILDREN AND FOR NOTHING ELSE. The domains tree is counted both as this
// module builds it and as the panel's own row carries it, and those two spell every other field
// differently.
type Nested = { readonly children: readonly Nested[] }

export function countNodes(nodes: readonly Nested[]): number {
  let total = 0
  for (const node of nodes) total += 1 + countNodes(node.children)
  return total
}
