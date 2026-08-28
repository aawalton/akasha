const IN = ":"

export type Repo = {
  readonly repo: string
  readonly root: string
}

export const notIn = (repo: string): string =>
  `is no page of \`${repo}\`: an address is a repository, a colon, and a path inside it`

export const addressIn = (repo: string, path: string): string => `${repo}${IN}${path}`

export const repoOf = (address: string): string | null => {
  const cut = address.indexOf(IN)
  return cut <= 0 ? null : address.slice(0, cut)
}

export const pathIn = (address: string): string | null => {
  const cut = address.indexOf(IN)
  return cut <= 0 || cut === address.length - 1 ? null : address.slice(cut + 1)
}

export const pathOf = (repo: Repo, address: string): string | null =>
  repoOf(address) === repo.repo ? pathIn(address) : null
