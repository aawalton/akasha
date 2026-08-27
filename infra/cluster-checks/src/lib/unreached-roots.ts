export const buildIsRepoConfig = (packageDirs: readonly string[]): ((path: string) => boolean) => {
  const dirs = packageDirs
    .filter((dir) => dir !== "" && dir !== ".")
    .map((dir) => (dir.endsWith("/") ? dir : `${dir}/`))
  return (path: string): boolean => {
    const cut = path.lastIndexOf("/")
    const dir = cut === -1 ? "" : path.slice(0, cut + 1)
    return dirs.some((packageDir) => packageDir.startsWith(dir) && packageDir.length > dir.length)
  }
}

export type TrackedFile = {
  readonly path: string
  readonly bytes: number
}

export type UnreachedRoot = {
  readonly path: string
  readonly isDirectory: boolean
  readonly bytes: number
  readonly files: number
  readonly packages: readonly string[]
}

export type UnreachedRootsReading = {
  readonly totalFiles: number
  readonly totalBytes: number
  readonly unreachedFiles: number
  readonly unreachedBytes: number
  readonly roots: readonly UnreachedRoot[]
}

type DirTally = {
  totalFiles: number
  unreachedFiles: number
  unreachedBytes: number
  readonly childDirs: Set<string>
  readonly packages: Set<string>
}

const ROOT_KEY = ""

const parentOf = (path: string): string => {
  const cut = path.lastIndexOf("/")
  return cut === -1 ? ROOT_KEY : path.slice(0, cut)
}

const ancestorsOf = (path: string): readonly string[] => {
  const out: string[] = []
  let dir = parentOf(path)
  for (;;) {
    out.push(dir)
    if (dir === ROOT_KEY) return out
    dir = parentOf(dir)
  }
}

const emptyTally = (): DirTally => ({
  totalFiles: 0,
  unreachedFiles: 0,
  unreachedBytes: 0,
  childDirs: new Set(),
  packages: new Set(),
})

export const collectUnreachedRoots = (
  files: readonly TrackedFile[],
  isReached: (path: string) => boolean,
  ownerOf: (path: string) => string | undefined
): UnreachedRootsReading => {
  const tallies = new Map<string, DirTally>()
  const directFilesByDir = new Map<string, TrackedFile[]>()
  const tallyFor = (dir: string): DirTally => {
    const found = tallies.get(dir)
    if (found !== undefined) return found
    const made = emptyTally()
    tallies.set(dir, made)
    return made
  }

  let totalBytes = 0
  let unreachedFiles = 0
  let unreachedBytes = 0

  for (const file of files) {
    totalBytes += file.bytes
    const reached = isReached(file.path)
    if (!reached) {
      unreachedFiles += 1
      unreachedBytes += file.bytes
    }
    const owner = reached ? undefined : ownerOf(file.path)

    const parent = parentOf(file.path)
    const siblings = directFilesByDir.get(parent)
    if (siblings === undefined) directFilesByDir.set(parent, [file])
    else siblings.push(file)
    const ancestors = ancestorsOf(file.path)
    for (const [index, dir] of ancestors.entries()) {
      const tally = tallyFor(dir)
      tally.totalFiles += 1
      if (!reached) {
        tally.unreachedFiles += 1
        tally.unreachedBytes += file.bytes
        if (owner !== undefined) tally.packages.add(owner)
      }
      const child = ancestors[index - 1]
      if (child !== undefined) tally.childDirs.add(child)
    }
  }

  const roots: UnreachedRoot[] = []

  const walk = (dir: string): undefined => {
    const tally = tallies.get(dir)
    if (tally === undefined || tally.totalFiles === 0) return
    if (dir !== ROOT_KEY && tally.unreachedFiles === tally.totalFiles) {
      roots.push({
        path: `${dir}/`,
        isDirectory: true,
        bytes: tally.unreachedBytes,
        files: tally.unreachedFiles,
        packages: [...tally.packages].sort(),
      })
      return
    }
    for (const child of tally.childDirs) walk(child)
    for (const file of directFilesByDir.get(dir) ?? []) {
      if (isReached(file.path)) continue
      const owner = ownerOf(file.path)
      roots.push({
        path: file.path,
        isDirectory: false,
        bytes: file.bytes,
        files: 1,
        packages: owner === undefined ? [] : [owner],
      })
    }
  }

  walk(ROOT_KEY)
  roots.sort((a, b) => b.bytes - a.bytes || a.path.localeCompare(b.path))

  return {
    totalFiles: files.length,
    totalBytes,
    unreachedFiles,
    unreachedBytes,
    roots,
  }
}
