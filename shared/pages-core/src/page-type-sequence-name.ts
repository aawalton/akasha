const SEQUENCE_NAME_PATTERN = /^pages_seq_[a-z0-9_]+$/

export function pagesSeqName(slug: string): string {
  if (slug.includes("_")) {
    throw new Error(
      `pagesSeqName: slug ${slug} contains '_' — the slug→sequence-name fold ` +
        "(hyphens→underscores) would be non-injective; slugs must be kebab-case (no underscores)"
    )
  }
  const snake = slug.replace(/-/g, "_")
  const name = `pages_seq_${snake}`
  if (!SEQUENCE_NAME_PATTERN.test(name)) {
    throw new Error(`pagesSeqName: derived name ${name} is not a safe SQL identifier`)
  }
  return name
}
