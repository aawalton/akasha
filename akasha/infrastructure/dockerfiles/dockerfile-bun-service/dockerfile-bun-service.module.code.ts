import { existsSync } from "node:fs"
import { join } from "node:path"
import { requireGet } from "@akasha/utils-narrow/require-get"
import type {
  DockerfileExtensions,
  ServiceConfig,
} from "../dockerfile-extensions/dockerfile-extensions.module.code.ts"
import { collectExecutedDeps } from "../dockerfile-imports/dockerfile-imports.module.code.ts"
import { HEADER, ROOT } from "../dockerfile-services/dockerfile-services.module.code.ts"

export function generateBunServiceDockerfile(
  appName: string,
  config: ServiceConfig,
  nameMap: Map<string, string>,
  ext: DockerfileExtensions,
  allWorkspaceDirs: readonly string[]
): string {
  const appDir = config.dir

  if (ext.single_stage) {
    return generateSingleStageBunService(appName, config, ext)
  }

  const deps = collectExecutedDeps(appDir, nameMap)
  const depDirs = deps.map((d) => requireGet(nameMap, d, "nameMap")).sort()

  return generateWorkspaceBunService(appName, config, nameMap, ext, deps, depDirs, allWorkspaceDirs)
}

export function generateWorkspaceBunService(
  _appName: string,
  config: ServiceConfig,
  _nameMap: Map<string, string>,
  ext: DockerfileExtensions,
  _deps: readonly string[],
  depDirs: readonly string[],
  allWorkspaceDirs: readonly string[]
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

  lines.push("# Copy workspace root and all member package.jsons")
  lines.push("COPY --link package.json ./")
  for (const dir of allWorkspaceDirs) {
    lines.push(`COPY --link ${dir}/package.json ./${dir}/package.json`)
  }
  if (existsSync(join(ROOT, "patches"))) {
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

  if (ext.system_packages?.length != null && ext.system_packages.length > 0) {
    lines.push(`RUN apk add --no-cache ${ext.system_packages.join(" ")}`)
  }

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

  if (ext.system_packages?.length != null && ext.system_packages.length > 0) {
    lines.push(`RUN apk add --no-cache ${ext.system_packages.join(" ")}`)
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
