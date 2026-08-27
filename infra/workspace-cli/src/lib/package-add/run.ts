import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"
import { exists, readText, run, writeJson, writeText } from "../package-move/fs"
import type { Logger } from "../package-move/logger"
import {
  buildClaudeMd,
  buildPackageJson,
  decideAppendWorkspace,
  derivePackageName,
  type FunctionalType,
} from "./derive"

const ROOT_PACKAGE_JSON_SCHEMA = z.record(z.string(), z.unknown())
const WORKSPACES_SCHEMA = z.array(z.string())

export interface PackageAdd {
  readonly path: string
  readonly functionalType: FunctionalType
}

export interface PackageAddResult {
  readonly name: string
  readonly path: string
  readonly functionalType: FunctionalType
}

export function runPackageAdd(opts: {
  add: PackageAdd
  root: string
  log: Logger
}): PackageAddResult {
  const { add, root, log } = opts

  const name = derivePackageName(add.path)

  if (exists(root, add.path)) {
    throw new Error(`target path already exists: ${add.path}`)
  }

  const rootRaw = readText(root, "package.json")
  const rootObj = ROOT_PACKAGE_JSON_SCHEMA.parse(JSON.parse(rootRaw))
  const workspaces = WORKSPACES_SCHEMA.parse(rootObj.workspaces ?? [])
  const decision = decideAppendWorkspace(workspaces, add.path)

  log.info(`[scaffold] creating ${add.path} (${name}, ${add.functionalType})`)
  mkdirSync(join(root, add.path), { recursive: true })
  writeJson(root, join(add.path, "package.json"), buildPackageJson(name, add.functionalType))
  writeText(root, join(add.path, "CLAUDE.md"), buildClaudeMd(name))

  if (decision.added) {
    rootObj.workspaces = [...decision.workspaces]
    log.info("[workspaces] appending to root package.json")
    writeJson(root, "package.json", rootObj)
  } else {
    log.info(`[workspaces] ${add.path} is covered by an existing glob entry — no array change`)
  }

  log.info("[lockfile] running bun install…")
  run(root, "bun", ["install"], { quiet: true })

  return { name, path: add.path, functionalType: add.functionalType }
}
