import {
  type DockerfileExtensions,
  type ServiceConfig,
  systemPackagesLine,
} from "akasha/infrastructure/container-image/dockerfile/modules/extensions/dockerfile-extensions.module.code.ts"
import {
  collectExecutedDeps,
  type Seen,
} from "akasha/infrastructure/container-image/dockerfile/modules/imports/dockerfile-imports.module.code.ts"
import { HEADER } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"

const PATCHES = "patches"

export function generateBunServiceDockerfile(
  appName: string,
  config: ServiceConfig,
  ext: DockerfileExtensions,
  seen: Seen
): string {
  const appDir = config.dir

  if (ext.single_stage) {
    return generateSingleStageBunService(appName, config, ext)
  }

  const depDirs = collectExecutedDeps(appDir, seen)

  return generateWorkspaceBunService(config, ext, depDirs, seen.under(PATCHES).length > 0)
}

function generateWorkspaceBunService(
  config: ServiceConfig,
  ext: DockerfileExtensions,
  depDirs: readonly string[],
  patched: boolean
): string {
  const appDir = config.dir
  const lines: string[] = []
  const baseImage = ext.base_image ?? "oven/bun:1.3.14-alpine"
  const port = ext.expose_port ?? 3000

  if (ext.extra_stages?.length != null && ext.extra_stages.length > 0) {
    lines.push(...ext.extra_stages)
    lines.push("")
  }

  lines.push(`FROM ${baseImage} AS build`)
  lines.push("WORKDIR /workspace")
  lines.push("")

  lines.push("# Copy lockfile and config")
  lines.push("COPY --link bun.lock ./")
  if (!ext.no_tsconfig_base) {
    lines.push("COPY --link tsconfig.base.json ./")
  }
  lines.push("")

  lines.push("# Copy the root manifest")
  lines.push("COPY --link package.json ./")
  if (patched) {
    lines.push("COPY --link patches ./patches")
  }
  lines.push("")

  const installFlags =
    ext.install_flags != null ? ` ${ext.install_flags}` : " --production --frozen-lockfile"
  lines.push(`RUN bun install --backend=copyfile${installFlags}`)
  lines.push("")

  lines.push("# Copy source for workspace members")
  for (const dir of depDirs) {
    lines.push(`COPY --link ${dir} ./${dir}`)
  }
  lines.push(`COPY --link ${appDir} ./${appDir}`)
  lines.push("")

  if (ext.extra_source_copies?.length != null && ext.extra_source_copies.length > 0) {
    lines.push("# Copy raw source (not a workspace member)")
    for (const dir of ext.extra_source_copies) {
      lines.push(`COPY --link ${dir} ./${dir}`)
    }
    lines.push("")
  }

  const runtimeImage = ext.runtime_image ?? baseImage
  lines.push(`FROM ${runtimeImage}`)

  if (ext.extra_runtime_copies?.length != null && ext.extra_runtime_copies.length > 0) {
    for (const copy of ext.extra_runtime_copies) {
      lines.push(copy)
    }
  }

  const installing = systemPackagesLine(ext)
  if (installing !== null) lines.push(installing)

  if (ext.extra_run_commands?.length != null && ext.extra_run_commands.length > 0) {
    for (const cmd of ext.extra_run_commands) {
      lines.push(cmd)
    }
  }

  lines.push("WORKDIR /workspace")
  lines.push("")

  lines.push("# Copy node_modules from workspace root")
  lines.push("COPY --link --from=build /workspace/node_modules ./node_modules")
  lines.push("")

  if (!ext.no_tsconfig_base) {
    lines.push("# Copy tsconfig for runtime resolution")
    lines.push("COPY --link --from=build /workspace/tsconfig.base.json ./tsconfig.base.json")
    lines.push("")
  }

  lines.push("# Copy workspace root for package resolution")
  lines.push("COPY --link --from=build /workspace/package.json ./package.json")
  lines.push("")

  lines.push("# Copy all package sources at correct paths")
  for (const dir of depDirs) {
    lines.push(`COPY --link --from=build /workspace/${dir} ./${dir}`)
  }
  lines.push(`COPY --link --from=build /workspace/${appDir} ./${appDir}`)

  if (ext.extra_source_copies?.length != null && ext.extra_source_copies.length > 0) {
    for (const dir of ext.extra_source_copies) {
      lines.push(`COPY --link --from=build /workspace/${dir} ./${dir}`)
    }
  }

  lines.push("")
  lines.push("WORKDIR /workspace")
  lines.push("USER 1000")
  lines.push(`EXPOSE ${port}`)

  const cmd =
    ext.runtime_cmd != null
      ? `CMD [${ext.runtime_cmd.map((c) => `"${c}"`).join(", ")}]`
      : `CMD ["bun", "run", "${appDir}/src/server.ts"]`
  lines.push(cmd)
  lines.push("")

  return HEADER + lines.join("\n")
}

function generateSingleStageBunService(
  _appName: string,
  _config: ServiceConfig,
  ext: DockerfileExtensions
): string {
  const lines: string[] = []
  const runtimeImage = ext.runtime_image ?? "oven/bun:1.3.14-alpine"

  lines.push(`FROM ${runtimeImage}`)
  lines.push("")

  const installing = systemPackagesLine(ext)
  if (installing !== null) {
    lines.push(installing)
    lines.push("")
  }

  if (ext.extra_run_commands?.length != null && ext.extra_run_commands.length > 0) {
    for (const cmd of ext.extra_run_commands) {
      lines.push(cmd)
    }
    lines.push("")
  }

  return HEADER + lines.join("\n")
}
