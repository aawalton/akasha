import type { Dirent } from "node:fs"
import { existsSync, readdirSync, rmSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { listFiles, run, runCapture } from "./fs"
import type { Logger } from "./logger"

function hasTrackedFiles(root: string, dirPath: string): boolean {
  const { stdout, status } = runCapture(root, "git", ["ls-files", "--", dirPath])
  if (status !== 0) return false
  return stdout.trim().length > 0
}

function findPackageDistDirs(root: string): readonly string[] {
  const out: string[] = []
  const ignore = new Set(["node_modules", ".git", ".next", ".serena", ".turbo"])
  const pkgRoot = join(root, "packages")
  if (!existsSync(pkgRoot)) return out

  function walk(absDir: string): undefined {
    let entries: Dirent[]
    try {
      entries = readdirSync(absDir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      if (ignore.has(entry.name)) continue
      const abs = join(absDir, entry.name)
      if (entry.name === "dist") {
        const parentPkgJson = join(absDir, "package.json")
        if (existsSync(parentPkgJson) && statSync(parentPkgJson).isFile()) {
          out.push(relative(root, abs).split("\\").join("/"))
        }
        continue
      }
      walk(abs)
    }
  }
  walk(pkgRoot)
  return out
}

export function cleanupArtifacts(root: string, log: Logger): undefined {
  log.info("\n[cleanup] scanning for stale build artifacts")

  const buildInfos = listFiles(root, ".").filter(
    (path) => path.endsWith("/tsconfig.tsbuildinfo") || path === "tsconfig.tsbuildinfo"
  )
  let tsbuildRemoved = 0
  for (const path of buildInfos) {
    rmSync(join(root, path), { force: true })
    tsbuildRemoved += 1
    log.info(`  rm ${path}`)
  }

  const distDirs = findPackageDistDirs(root)
  let distRemoved = 0
  let distSkipped = 0
  for (const path of distDirs) {
    if (hasTrackedFiles(root, path)) {
      log.info(`  (skip tracked) ${path}`)
      distSkipped += 1
      continue
    }
    rmSync(join(root, path), { recursive: true, force: true })
    distRemoved += 1
    log.info(`  rm -r ${path}`)
  }

  log.info(
    `[cleanup] removed ${tsbuildRemoved} tsbuildinfo file(s), ${distRemoved} dist/ dir(s); skipped ${distSkipped} tracked dist/ dir(s)`
  )
}

export function regenerateLockfile(root: string, log: Logger): undefined {
  log.info("\n[cleanup] running bun install to regenerate lockfile")
  run(root, "bun", ["install"])
  log.info("[cleanup] bun install complete")
}
