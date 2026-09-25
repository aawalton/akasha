import { createHash } from "node:crypto"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { changePropertyRecordField } from "akasha/change/mechanical/file-content/change/change-property-record-field/change-property-record-field.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { ranAwaited } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { addonSourceHash } from "akasha/command/pages/deploy/modules/addon-sourcing/deploy-addon-sourcing.module.code.ts"
import { pushBranch } from "akasha/git/modules/pushing/git-pushing.module.code.ts"
import {
  buildctlAt,
  contextArgv,
} from "akasha/infrastructure/container-image/modules/image-publishing/image-publishing.module.code.ts"
import { refFor } from "akasha/infrastructure/container-image/modules/image-ref/image-ref.module.code.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  recordsIn,
  slugsUnder,
  textAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  ARCHIVE_NAME,
  packedBundle,
} from "akasha/temper/addon/build/modules/addon-bundling/addon-bundling.module.code.ts"
import { compiledEveryAddon } from "akasha/temper/addon/build/modules/addon-compiling/addon-compiling.module.code.ts"

const PUSH_CEILING_MS = 5 * 60 * 1000

const A_SECOND = 1000

const SCRATCH_ROOT = "/var/tmp"

const SCRATCH_PREFIX = "temper-addon-bundle-"

const VERSION_NAME = "version.txt"

const BASE_IMAGE = "docker.io/library/alpine:3.22"

const PAYLOAD_UNDER = "/bundle"

const IMAGE_REPO = "cluster/temper-addons"

const DOCKERFILE = "Dockerfile"

const WEB_APP = "web-app"

const SERVICE_CLUSTER = "service-cluster"

const COPIES = "imageCopies"

const IMAGE = "image"

const COPY_TO = "copyTo"

const SOURCE_HASH = "sourceHash"

const RESTATE = `${changeMechanicalFileContent.slug}/${changePropertyRecordField.slug}` as const

const MESSAGE =
  "the addon bundle image the cluster pulls, named by the content it was built from, on the cluster service copying it"

type Published = {
  readonly lines: readonly string[]
  readonly refusals: readonly string[]
}

type Placed = {
  readonly pagePath: string
  readonly copyTo: string
}

type Held = {
  readonly image: string | null
  readonly sourceHash: string | null
}

function placedFor(root: string, slug: string): Placed | null {
  const app = listedAt(root, WEB_APP, slug)[0]
  const stated = app === undefined ? null : valueByPath(root, app.path)
  if (stated === null) return null
  const repository = refFor(IMAGE_REPO, "")
  for (const service of slugsUnder(stated.serviceClusters, `${SERVICE_CLUSTER}/`)) {
    const listed = listedAt(root, SERVICE_CLUSTER, service)[0]
    const value = listed === undefined ? null : valueByPath(root, listed.path)
    if (listed === undefined || value === null) continue
    for (const one of recordsIn(value[COPIES])) {
      const copyTo = textAt(one, COPY_TO)
      if (copyTo === null || textAt(one, IMAGE)?.startsWith(repository) !== true) continue
      return { pagePath: listed.path, copyTo }
    }
  }
  return null
}

function heldAt(root: string, placed: Placed): Held {
  const value = valueByPath(root, placed.pagePath)
  const copies = value === null ? [] : recordsIn(value[COPIES])
  const one = copies.find((each) => textAt(each, COPY_TO) === placed.copyTo)
  if (one === undefined) return { image: null, sourceHash: null }
  return { image: textAt(one, IMAGE), sourceHash: textAt(one, SOURCE_HASH) }
}

function restating(placed: Placed, field: string, to: string): Asking {
  return {
    at: RESTATE,
    given: {
      at: placed.pagePath,
      key: COPIES,
      where: COPY_TO,
      is: placed.copyTo,
      field,
      to,
      declared: true,
    },
  }
}

async function mustRun(run: readonly string[], what: string): Promise<string | null> {
  const started = Date.now()
  const done = await ranAwaited([...run], { timeout: PUSH_CEILING_MS })
  if (done.code === 0) return null
  const why =
    Date.now() - started >= PUSH_CEILING_MS
      ? `was still running after ${String(PUSH_CEILING_MS / A_SECOND)}s and was killed, so it is stuck rather than slow`
      : "failed"
  return `${what} ${why}, so nothing it would have produced is there. It ran as \`${run.join(" ")}\`.\n${done.err.trim()}`
}

function dockerfileBody(archive: string): string {
  return [
    `FROM ${BASE_IMAGE}`,
    `COPY ${archive} ${PAYLOAD_UNDER}/${ARCHIVE_NAME}`,
    `COPY ${VERSION_NAME} ${PAYLOAD_UNDER}/${VERSION_NAME}`,
    "",
  ].join("\n")
}

async function imaged(zipPath: string, pushRef: string): Promise<string | null> {
  const context = dirname(zipPath)
  writeFileSync(join(context, DOCKERFILE), dockerfileBody(basename(zipPath)))
  return await mustRun(
    [buildctlAt(), ...contextArgv(context, pushRef)],
    `building ${pushRef} and pushing it to the registry`
  )
}

type Bundled = Published & {
  readonly placed: Placed
  readonly contentHash: string | null
  readonly sourceHash: string
}

type Making = {
  readonly placed: Placed
  readonly sourceHash: string
  readonly scratch: string
  readonly codeAt: string
}

async function madeFrom(making: Making, up: string[]): Promise<Bundled> {
  const { placed, sourceHash, scratch, codeAt } = making
  const unmade = (said: Published): Bundled => ({ ...said, placed, contentHash: null, sourceHash })
  const compiled = await compiledEveryAddon(codeAt)
  if (compiled.refusals.length > 0) return unmade(compiled)
  const packed = packedBundle(codeAt, join(scratch, "bundle"))
  if (packed.refusals.length > 0 || packed.archivePath === null) {
    return unmade({ lines: [...compiled.lines, ...packed.lines], refusals: packed.refusals })
  }

  const zipPath = packed.archivePath
  const report = [...compiled.lines, ...packed.lines]
  let zip: Uint8Array
  try {
    zip = readFileSync(zipPath)
  } catch {
    return unmade({
      lines: report,
      refusals: [
        `the pack reported an archive and left no readable ${ARCHIVE_NAME} at ${zipPath}, so there is nothing to publish`,
      ],
    })
  }

  const contentHash = createHash("sha256").update(zip).digest("hex")
  const versionPath = join(dirname(zipPath), VERSION_NAME)
  writeFileSync(versionPath, `${contentHash}\n`)
  const pushRef = refFor(IMAGE_REPO, contentHash)

  const assembled = await imaged(zipPath, pushRef)
  if (assembled !== null) return unmade({ lines: report, refusals: [assembled] })
  up.push(`the addon bundle image ${pushRef}, pushed to the registry`)
  report.push(`content ${contentHash}`, `pushed ${pushRef}`)
  return { lines: report, refusals: [], placed, contentHash, sourceHash }
}

export async function bundleMadeFor(
  root: string,
  slug: string,
  commit: string,
  codeAt: string,
  up: string[] = []
): Promise<Bundled | null> {
  const placed = placedFor(root, slug)
  if (placed === null) return null
  const sourceHash = addonSourceHash(root, commit)
  if (heldAt(root, placed).sourceHash === sourceHash) {
    return {
      lines: [`sources ${sourceHash}`, `${placed.pagePath} already names the image made from them`],
      refusals: [],
      placed,
      contentHash: null,
      sourceHash,
    }
  }
  const scratch = mkdtempSync(join(SCRATCH_ROOT, SCRATCH_PREFIX))
  try {
    return await madeFrom({ placed, sourceHash, scratch, codeAt }, up)
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}

const HANDED = "tag"

const HANDED_BACK = /^tag\t(\S+)\t(\S+)\t([0-9a-f]{64})\t([0-9a-f]{64})$/

export function bundleHandedBack(made: Bundled): Published {
  if (made.refusals.length > 0 || made.contentHash === null) return made
  const { pagePath, copyTo } = made.placed
  const said = [HANDED, pagePath, copyTo, made.contentHash, made.sourceHash].join("\t")
  return { lines: [...made.lines, said], refusals: [] }
}

export function handedBackIn(said: readonly string[]): Bundled | null {
  for (const line of said) {
    const found = HANDED_BACK.exec(line)
    const [, pagePath, copyTo, contentHash, sourceHash] = found ?? []
    if (
      pagePath === undefined ||
      copyTo === undefined ||
      contentHash === undefined ||
      sourceHash === undefined
    ) {
      continue
    }
    return { lines: [], refusals: [], placed: { pagePath, copyTo }, contentHash, sourceHash }
  }
  return null
}

export async function bundleTagged(
  root: string,
  made: Bundled,
  up: string[] = []
): Promise<Published> {
  const { placed, contentHash, sourceHash } = made
  if (made.refusals.length > 0 || contentHash === null) return made
  const report = [...made.lines]
  const at = placed.pagePath
  const pushRef = refFor(IMAGE_REPO, contentHash)
  const held = heldAt(root, placed)
  const asked = [
    ...(held.image === pushRef ? [] : [restating(placed, IMAGE, pushRef)]),
    ...(held.sourceHash === sourceHash ? [] : [restating(placed, SOURCE_HASH, sourceHash)]),
  ]
  if (asked.length === 0) {
    report.push(`${at} already names this image`)
    return { lines: report, refusals: [] }
  }
  const landed = await runMechanicalChange(root, asked, MESSAGE, { done: up })
  if ("refusals" in landed) {
    return {
      lines: report,
      refusals: [`${pushRef} is pushed and ${at} was not landed — ${landed.refusals.join("; ")}`],
    }
  }
  up.push(`${at}, landed naming that image, with the manifests written from it`)
  report.push(`landed ${at} after the push, so what the page names is already in the registry`)
  const pushed = pushBranch(root)
  report.push(pushed.line)
  if (pushed.failed) {
    return { lines: report, refusals: [`${at} names ${pushRef} and never reached origin`] }
  }
  up.push(`the commit landing ${at}, pushed to origin`)
  return { lines: report, refusals: [] }
}
