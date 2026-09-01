export type TreeSeq = number & { readonly __brand: "TreeSeq" }

function treeSeq(seq: number): TreeSeq {
  return seq as TreeSeq
}

export function treeSeqOfProject(project: {
  readonly seq: number
  readonly parentSeq: number | null
}): TreeSeq {
  return treeSeq(project.parentSeq ?? project.seq)
}

export function treeSeqOfNamedWorktree(seq: number): TreeSeq {
  return treeSeq(seq)
}

export function projectWorktreePath(base: string, seq: TreeSeq): string {
  return `${base}/${seq}`
}

export function parseProjectWorktreeSeq(path: string, base: string): TreeSeq | null {
  const prefix = `${base}/`
  if (!path.startsWith(prefix)) return null
  const leaf = path.slice(prefix.length)
  if (!/^[1-9]\d*$/.test(leaf)) return null
  return treeSeq(Number(leaf))
}
