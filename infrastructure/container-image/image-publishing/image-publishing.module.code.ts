import { chmodSync, existsSync, mkdirSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { ROOT } from "akasha/infrastructure/container-image/dockerfiles/dockerfile-services/dockerfile-services.module.code.ts"
import type {
  ImageBuild,
  ImageNamed,
} from "akasha/infrastructure/container-image/image-build/image-build.module.code.ts"
import {
  buildOf,
  everyNamed,
} from "akasha/infrastructure/container-image/image-build/image-build.module.code.ts"
import {
  driftedIn,
  inputsFor,
} from "akasha/infrastructure/container-image/image-inputs/image-inputs.module.code.ts"
import {
  CACHE_TAG,
  REGISTRY,
  refFor,
} from "akasha/infrastructure/container-image/image-ref/image-ref.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const BUILDER = "tcp://buildkit.buildkit.svc.cluster.local:1234"
const BUILDKIT_VERSION = "v0.28.0"
const DOCKERFILE = "Dockerfile"
const INSECURE = "registry.insecure=true"
const HELD_KINDS = [
  "application/vnd.oci.image.index.v1+json",
  "application/vnd.oci.image.manifest.v1+json",
  "application/vnd.docker.distribution.manifest.list.v2+json",
  "application/vnd.docker.distribution.manifest.v2+json",
].join(", ")

const CACHE_DIR = join(homedir(), ".cache", "akasha")
const TOOL_DIR = join(CACHE_DIR, "buildkit", BUILDKIT_VERSION)
const BUILDCTL = join(TOOL_DIR, "bin", "buildctl")

function dockerfileWrittenTo(slug: string, body: string): string {
  const at = join(CACHE_DIR, "dockerfiles", slug)
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, DOCKERFILE), body, "utf8")
  return at
}

export function buildctlAt(): string {
  if (existsSync(BUILDCTL)) return BUILDCTL
  mkdirSync(TOOL_DIR, { recursive: true })
  const held = join(TOOL_DIR, "buildkit.tar.gz")
  const url = `https://github.com/moby/buildkit/releases/download/${BUILDKIT_VERSION}/buildkit-${BUILDKIT_VERSION}.linux-amd64.tar.gz`
  const got = ran(["curl", "-sSLo", held, url])
  if (got.code !== 0) throw new Error(`buildctl could not be fetched: ${got.err.trim()}`)
  const opened = ran(["tar", "xzf", held, "-C", TOOL_DIR, "bin/buildctl"])
  if (opened.code !== 0)
    throw new Error(`the buildctl archive would not open: ${opened.err.trim()}`)
  chmodSync(BUILDCTL, 0o755)
  return BUILDCTL
}

export async function heldInRegistry(repository: string, tag: string): Promise<boolean> {
  const asked = await fetch(`http://${REGISTRY}/v2/${repository}/manifests/${tag}`, {
    method: "HEAD",
    headers: { Accept: HELD_KINDS },
  })
  return asked.ok
}

export function buildArgv(
  at: string,
  build: ImageNamed,
  ref: string,
  codeAt: string = ROOT
): readonly string[] {
  const cache = refFor(build.repository, CACHE_TAG)
  return [
    "--addr",
    BUILDER,
    "build",
    "--progress=plain",
    "--frontend",
    "dockerfile.v0",
    "--local",
    `context=${join(codeAt, build.context)}`,
    "--local",
    `dockerfile=${at}`,
    "--opt",
    `filename=${DOCKERFILE}`,
    "--export-cache",
    `type=registry,ref=${cache},mode=min,compression=zstd,${INSECURE}`,
    "--import-cache",
    `type=registry,ref=${cache},${INSECURE}`,
    "--output",
    `type=image,name=${ref},push=true,${INSECURE}`,
  ]
}

export interface Published {
  readonly slug: string
  readonly ref: string
  readonly held: boolean
  readonly built: boolean
}

export async function publish(
  build: ImageBuild,
  dryRun: boolean,
  codeAt: string = ROOT
): Promise<Published> {
  const inputs = inputsFor(build, codeAt)
  const ref = refFor(build.repository, inputs.hash)
  const held = await heldInRegistry(build.repository, inputs.hash)
  if (held || dryRun) return { slug: build.slug, ref, held, built: false }
  const drifted = driftedIn(inputs.copied, codeAt)
  if (drifted.length > 0) {
    throw new Error(
      `${build.slug} is built at the commit HEAD is at, and ${drifted.join(", ")} differs from it, so the image would not be what its tag names`
    )
  }
  const at = dockerfileWrittenTo(build.slug, inputs.dockerfile)
  const done = ran([buildctlAt(), ...buildArgv(at, build, ref, codeAt)])
  if (done.code !== 0) {
    throw new Error(`building ${ref} exited ${done.code}: ${done.err.trim()}`)
  }
  return { slug: build.slug, ref, held: false, built: true }
}

export function claimedIn(yamls: readonly string[]): readonly ImageNamed[] {
  return everyNamed().filter((one) =>
    yamls.some((yaml) => yaml.includes(`${REGISTRY}/${one.repository}:`))
  )
}

export async function publishedFor(
  yamls: readonly string[],
  dryRun: boolean,
  codeAt: string = ROOT
): Promise<readonly Published[]> {
  const done: Published[] = []
  for (const named of claimedIn(yamls)) {
    done.push(await publish(buildOf(named.slug, codeAt), dryRun, codeAt))
  }
  return done
}
