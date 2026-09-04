import { existsSync } from "node:fs"
import { join } from "node:path"
import type { DockerfileExtensions } from "../dockerfile-extensions/dockerfile-extensions.module.code.ts"
import { ROOT } from "../dockerfile-services/dockerfile-services.module.code.ts"

export function emitBuilderPreamble(ext: DockerfileExtensions): readonly string[] {
  const lines: string[] = []
  if (ext.extra_stages?.length != null && ext.extra_stages.length > 0) {
    lines.push(...ext.extra_stages)
    lines.push("")
  }

  lines.push("# Stage 1: Install dependencies and build")
  lines.push(
    "# Single stage for install + build avoids cross-stage COPY issues with bun's",
    "# hardlink-based package installation (hardlinks point to the global cache volume",
    "# which is not accessible in COPY --from= instructions)."
  )

  const baseImage = ext.base_image ?? "oven/bun:1.3.14-alpine"
  lines.push(`FROM ${baseImage} AS builder`)
  lines.push("WORKDIR /workspace")
  lines.push("")
  return lines
}

export function emitPackageJsonCopies(
  depDirs: readonly string[],
  appDir: string,
  ext: DockerfileExtensions
): readonly string[] {
  const lines: string[] = []
  lines.push("# Copy lockfile and base tsconfig")
  lines.push("COPY bun.lock ./")
  if (!ext.no_tsconfig_base) {
    lines.push("COPY tsconfig.base.json ./")
  }
  lines.push("")

  lines.push("# Copy ALL shared package.json files")
  for (const dir of depDirs) {
    lines.push(`COPY ${dir}/package.json ./${dir}/package.json`)
  }
  lines.push(`COPY ${appDir}/package.json ./${appDir}/package.json`)

  if (ext.extra_install_copies?.length != null && ext.extra_install_copies.length > 0) {
    for (const copy of ext.extra_install_copies) {
      lines.push(`COPY ${copy} ./${copy}`)
    }
  }

  if (existsSync(join(ROOT, "patches"))) {
    lines.push("COPY patches ./patches")
  }
  lines.push("")
  return lines
}

export function emitWorkspaceInstall(
  depDirs: readonly string[],
  appDir: string,
  ext: DockerfileExtensions
): readonly string[] {
  const lines: string[] = []
  const workspacesList = [...depDirs, appDir].map((d) => `"${d}"`).join(",")
  lines.push("# Write a trimmed workspace package.json listing all shared packages + app.")
  lines.push(`RUN printf '{"private":true,"workspaces":[${workspacesList}]}\\n' > package.json`)
  lines.push("")

  const installCmd =
    ext.install_flags != null
      ? `RUN --mount=type=cache,target=/root/.bun/install/cache bun install --backend=copyfile ${ext.install_flags}`
      : "RUN --mount=type=cache,target=/root/.bun/install/cache bun install --backend=copyfile"
  lines.push(installCmd)
  lines.push("")
  return lines
}

export function emitSourceCopies(
  depDirs: readonly string[],
  appDir: string,
  appName: string,
  ext: DockerfileExtensions
): readonly string[] {
  const lines: string[] = []
  lines.push("# Copy ALL shared package sources")
  for (const dir of depDirs) {
    lines.push(`COPY ${dir} ./${dir}`)
  }
  lines.push("")

  if (ext.extra_source_copies?.length != null && ext.extra_source_copies.length > 0) {
    for (const dir of ext.extra_source_copies) {
      lines.push(`COPY ${dir} ./${dir}`)
    }
    lines.push("")
  }

  if (ext.bulk_app_copy) {
    lines.push("# Copy app source")
    lines.push(`COPY ${appDir}/ ./${appDir}/`)
  } else {
    lines.push(`# Copy ${appName} source`)

    if (ext.source_dirs?.length != null && ext.source_dirs.length > 0) {
      for (const dir of ext.source_dirs) {
        lines.push(`COPY ${appDir}/${dir} ./${appDir}/${dir}`)
      }
    }

    if (ext.config_files?.length != null && ext.config_files.length > 0) {
      lines.push("")
      lines.push("# Copy config files")
      const configCopies = ext.config_files.map((f) => `     ${appDir}/${f}`)
      let isFirst = true
      for (const copy of configCopies) {
        if (isFirst) {
          lines.push(`COPY ${copy.trim()} \\`)
          isFirst = false
        } else {
          lines.push(`${copy} \\`)
        }
      }
      lines.push(`     ./${appDir}/`)
    }
  }

  lines.push("")
  return lines
}
