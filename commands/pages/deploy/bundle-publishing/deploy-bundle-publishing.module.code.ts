import { createHash } from "node:crypto"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { landedMechanically } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { listedAt, valuesByPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import {
  ARCHIVE_NAME,
  packedBundle,
} from "akasha/temper/addon-build/addon-bundling/addon-bundling.module.code.ts"
import { compiledEveryAddon } from "akasha/temper/addon-build/addon-compiling/addon-compiling.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const PUSH_CEILING_MS = 5 * 60 * 1000

const A_SECOND = 1000

const SCRATCH_ROOT = "/var/tmp"

const SCRATCH_PREFIX = "temper-addon-bundle-"

const VERSION_NAME = "version.txt"

const BASE_IMAGE = "docker.io/library/alpine:3.22"

const WORKING_CONTAINER = "temper-addon-bundle-build"

const PAYLOAD_UNDER = "/bundle"

const IMAGE_REPO = "cluster/temper-addons"

const PULL_REGISTRY = "registry.registry.svc.cluster.local:5000"

const PUSH_REGISTRY = "192.168.68.87:30500"

const ROUTER_APP = "router-app"

const CODE_FILE_PROPERTY = "code-file-property"

const IMAGE_SLUG = "addon-bundle-image"

const IMAGE_KEY = "addonBundleImage"

const FILE_NAME = "fileName"

const PUT = "change-mechanical/add-file-code"

const MESSAGE = "the addon bundle image the cluster pulls, named by the content it was built from"

export type Published = {
  readonly lines: readonly string[]
  readonly refusals: readonly string[]
}

export function tagFileFor(root: string, slug: string): string | null {
  const app = listedAt(root, ROUTER_APP, slug)[0]
  if (app === undefined) return null
  const stated = valuesByPath(root, ROUTER_APP).get(app.path)
  if (stated === undefined || stated[IMAGE_KEY] === undefined) return null
  const property = listedAt(root, CODE_FILE_PROPERTY, IMAGE_SLUG)[0]
  const shape =
    property === undefined
      ? null
      : (valuesByPath(root, CODE_FILE_PROPERTY).get(property.path) ?? null)
  const named = shape === null ? null : textAt(shape, FILE_NAME)
  return named === null ? null : join(dirname(app.path), named)
}

function mustRun(argv: readonly string[], what: string): string | null {
  const started = Date.now()
  const done = ran([...argv], { timeout: PUSH_CEILING_MS })
  if (done.code === 0) return null
  const why =
    Date.now() - started >= PUSH_CEILING_MS
      ? `was still running after ${String(PUSH_CEILING_MS / A_SECOND)}s and was killed, so it is stuck rather than slow`
      : "failed"
  return `${what} ${why}, so nothing it would have produced is there. It ran as \`${argv.join(" ")}\`.\n${done.err.trim()}`
}

const HASH_HELD = /ADDON_BUNDLE_CONTENT_HASH\s*=\s*"([0-9a-f]{64})"/

export function hashHeldIn(held: string | null): string | null {
  if (held === null) return null
  const found = HASH_HELD.exec(held)
  return found === null ? null : (found[1] ?? null)
}

function tagBody(contentHash: string): string {
  return [
    `export const ADDON_BUNDLE_CONTENT_HASH = "${contentHash}"`,
    "",
    `export const ADDON_BUNDLE_IMAGE = "${PULL_REGISTRY}/${IMAGE_REPO}:${contentHash}"`,
    "",
  ].join("\n")
}

function imaged(zipPath: string, versionPath: string, pushRef: string): string | null {
  ran(["buildah", "rm", WORKING_CONTAINER], { timeout: PUSH_CEILING_MS })
  const setUp = mustRun(
    ["buildah", "from", "--name", WORKING_CONTAINER, BASE_IMAGE],
    "setting up the image base"
  )
  if (setUp !== null) return setUp
  try {
    return (
      mustRun(
        ["buildah", "copy", WORKING_CONTAINER, zipPath, `${PAYLOAD_UNDER}/${ARCHIVE_NAME}`],
        "copying the bundle into the image"
      ) ??
      mustRun(
        ["buildah", "copy", WORKING_CONTAINER, versionPath, `${PAYLOAD_UNDER}/${VERSION_NAME}`],
        "copying the version file into the image"
      ) ??
      mustRun(["buildah", "commit", WORKING_CONTAINER, pushRef], "committing the image")
    )
  } finally {
    ran(["buildah", "rm", WORKING_CONTAINER], { timeout: PUSH_CEILING_MS })
  }
}

async function publishedFrom(
  root: string,
  tagFile: string,
  scratch: string,
  codeAt: string,
  up: string[]
): Promise<Published> {
  const compiled = await compiledEveryAddon(codeAt)
  if (compiled.refusals.length > 0) return compiled
  const packed = packedBundle(codeAt, join(scratch, "bundle"))
  if (packed.refusals.length > 0 || packed.archivePath === null) {
    return { lines: [...compiled.lines, ...packed.lines], refusals: packed.refusals }
  }

  const zipPath = packed.archivePath
  const report = [...compiled.lines, ...packed.lines]
  let zip: Uint8Array
  try {
    zip = readFileSync(zipPath)
  } catch {
    return {
      lines: report,
      refusals: [
        `the pack reported an archive and left no readable ${ARCHIVE_NAME} at ${zipPath}, so there is nothing to publish`,
      ],
    }
  }

  const contentHash = createHash("sha256").update(zip).digest("hex")
  const versionPath = join(dirname(zipPath), VERSION_NAME)
  writeFileSync(versionPath, `${contentHash}\n`)
  const pushRef = `${PUSH_REGISTRY}/${IMAGE_REPO}:${contentHash}`

  const assembled = imaged(zipPath, versionPath, pushRef)
  if (assembled !== null) return { lines: report, refusals: [assembled] }
  const pushed = mustRun(["podman", "push", "--tls-verify=false", pushRef], `pushing ${pushRef}`)
  if (pushed !== null) return { lines: report, refusals: [pushed] }
  up.push(`the addon bundle image ${pushRef}, pushed to the registry`)
  report.push(`content ${contentHash}`, `pushed ${pushRef}`)

  const tagPath = join(root, tagFile)
  const body = tagBody(contentHash)
  let held: string | null = null
  try {
    held = readFileSync(tagPath, "utf8")
  } catch {}
  if (hashHeldIn(held) === contentHash) {
    report.push(`${tagFile} already names this image`)
    return { lines: report, refusals: [] }
  }
  const landed = await landedMechanically(
    up,
    root,
    [{ at: PUT, given: { at: tagFile, body } }],
    MESSAGE
  )
  if ("refusals" in landed) {
    return {
      lines: report,
      refusals: [
        `${pushRef} is pushed and ${tagFile} was not landed — ${landed.refusals.join("; ")}`,
      ],
    }
  }
  up.push(`${tagFile}, landed naming that image`)
  report.push(`landed ${tagFile} after the push, so what the tag names is already in the registry`)
  return { lines: report, refusals: [] }
}

export async function publishedBundleFor(
  root: string,
  slug: string,
  dryRun: boolean,
  codeAt: string,
  up: string[] = []
): Promise<Published | null> {
  const tagFile = tagFileFor(root, slug)
  if (tagFile === null) return null
  if (dryRun) {
    return {
      lines: [
        `${slug} serves an addon bundle named by ${tagFile}, and a dry run compiles, packs and pushes nothing`,
      ],
      refusals: [],
    }
  }
  const scratch = mkdtempSync(join(SCRATCH_ROOT, SCRATCH_PREFIX))
  try {
    return await publishedFrom(root, tagFile, scratch, codeAt, up)
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}
