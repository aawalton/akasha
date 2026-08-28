export const RUNTIME_MARK: string =
  process.versions.bun === undefined
    ? `node:${process.versions.node}`
    : `bun:${process.versions.bun}`
