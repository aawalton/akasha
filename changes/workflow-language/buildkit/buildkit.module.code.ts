import { IMAGES } from "../images/images.module.code.ts"
import type { CIContext, Step } from "../workflow-types/workflow-types.module.code.ts"

export function wrapBuildctlWithRetry(buildctlCmd: string): string {
  return `# buildctl with transient-gRPC retry (6 attempts, ~170s budget — project #9769)
buildkit_ok=0
for buildkit_attempt in 1 2 3 4 5 6; do
  case "$buildkit_attempt" in
    1) ;;
    2) sleep 5;;
    3) sleep 15;;
    4) sleep 30;;
    5) sleep 60;;
    6) sleep 60;;
  esac
  buildkit_err=$(mktemp)
  buildkit_fifo="$buildkit_err.pipe"
  mkfifo "$buildkit_fifo"
  tee "$buildkit_err" < "$buildkit_fifo" >&2 &
  buildkit_tee=$!
  if ${buildctlCmd} 2> "$buildkit_fifo"; then
    buildkit_rc=0
  else
    buildkit_rc=$?
  fi
  wait "$buildkit_tee"
  rm -f "$buildkit_fifo"
  if [ "$buildkit_rc" -eq 0 ]; then
    rm -f "$buildkit_err"
    buildkit_ok=1
    break
  fi
  if ! grep -qE 'connect: connection refused|code = Unavailable|transport: Error while dialing' "$buildkit_err"; then
    rm -f "$buildkit_err"
    exit "$buildkit_rc"
  fi
  rm -f "$buildkit_err"
  echo "[buildkit] attempt $buildkit_attempt failed (BuildKit unreachable, exit $buildkit_rc); will retry" >&2
done
if [ "$buildkit_ok" -eq 0 ]; then
  echo "[buildkit] giving up after 6 buildctl attempts" >&2
  exit 1
fi`
}

interface BuildkitBuildConfig {
  name: string
  context: string
  dockerfile?: string
  filename?: string
  tag: string | ((ci: CIContext) => string)
  buildArgs?: Record<string, string | ((ci: CIContext) => string)>
  cacheTag?: string
  cache?: boolean
  dependsOn?: readonly string[]
  image?: string
  preCommands?: readonly string[] | ((ci: CIContext) => readonly string[])
  volumes?: readonly string[]
  environment?: Record<string, string>
}

export function buildkitBuild(config: BuildkitBuildConfig): Step {
  const { name, context, dockerfile, filename, tag, buildArgs, cacheTag } = config

  const commands = (ci: CIContext): readonly string[] => {
    const resolvedTag = typeof tag === "function" ? tag(ci) : tag
    const cacheRef = cacheTag ?? resolvedTag.replace(/:[^:/]*$/, ":buildcache")

    const pre = config.preCommands
      ? typeof config.preCommands === "function"
        ? config.preCommands(ci)
        : config.preCommands
      : []

    const parts = [
      "buildctl",
      "--addr tcp://buildkit.buildkit.svc.cluster.local:1234",
      "build",
      "--progress=plain",
      "--frontend dockerfile.v0",
      `--local context=${ci.workspace}/${context}`,
      `--local dockerfile=${ci.workspace}/${dockerfile ?? context}`,
    ]

    if (filename != null) {
      parts.push(`--opt filename=${filename}`)
    }

    if (buildArgs) {
      for (const [key, value] of Object.entries(buildArgs)) {
        const resolved = typeof value === "function" ? value(ci) : value
        parts.push(`--opt build-arg:${key}=${resolved}`)
      }
    }

    if (config.cache !== false) {
      parts.push(
        `--export-cache type=registry,ref=${cacheRef},mode=min,compression=zstd,registry.insecure=true`,
        `--import-cache type=registry,ref=${cacheRef},registry.insecure=true`
      )
    }

    parts.push(`--output type=image,name=${resolvedTag},push=true,registry.insecure=true`)

    return [...pre, wrapBuildctlWithRetry(parts.join(" \\\n  "))]
  }

  return {
    name,
    image: config.image ?? IMAGES.BUILDKIT,
    commands,
    ...(config.dependsOn && { dependsOn: config.dependsOn }),
    ...(config.volumes && { volumes: config.volumes }),
    ...(config.environment && { environment: config.environment }),
  }
}
