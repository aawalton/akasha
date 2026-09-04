import { requireGet } from "@akasha/utils-narrow/require-get"
import {
  emitBuilderPreamble,
  emitPackageJsonCopies,
  emitSourceCopies,
  emitWorkspaceInstall,
} from "../dockerfile-builder/dockerfile-builder.module.code.ts"
import { collectAllDeps } from "../dockerfile-deps/dockerfile-deps.module.code.ts"
import type {
  DockerfileExtensions,
  ServiceConfig,
} from "../dockerfile-extensions/dockerfile-extensions.module.code.ts"
import { HEADER } from "../dockerfile-services/dockerfile-services.module.code.ts"

export function generateNextjsDockerfile(
  appName: string,
  config: ServiceConfig,
  nameMap: Map<string, string>,
  ext: DockerfileExtensions
): string {
  const appDir = config.dir
  const skipDefaultArgs = ext.no_default_build_args === true

  const deps = collectAllDeps(appDir, nameMap)
  const depDirs = deps.map((d) => requireGet(nameMap, d, "nameMap")).sort()

  const runtimeAlias = ext.runtime_stage_alias ?? "runtime"
  const lines: string[] = []

  lines.push(...emitBuilderPreamble(ext))
  lines.push(...emitPackageJsonCopies(depDirs, appDir, ext))
  lines.push(...emitWorkspaceInstall(depDirs, appDir, ext))
  lines.push(...emitSourceCopies(depDirs, appDir, appName, ext))

  if (!skipDefaultArgs && !ext.no_supabase_url) {
    lines.push("ARG NEXT_PUBLIC_SUPABASE_URL")
  }
  if (!skipDefaultArgs) {
    lines.push("ARG NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }
  if (ext.extra_build_args?.length != null && ext.extra_build_args.length > 0) {
    lines.push(
      "# Server-side env vars needed at build time for page data collection (module evaluation)"
    )
    for (const arg of ext.extra_build_args) {
      lines.push(`ARG ${arg}`)
    }
  }

  lines.push("")

  if (!skipDefaultArgs && !ext.no_supabase_url) {
    lines.push("ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL")
  }
  if (!skipDefaultArgs) {
    lines.push("ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }
  if (ext.extra_build_envs?.length != null && ext.extra_build_envs.length > 0) {
    for (const env of ext.extra_build_envs) {
      lines.push(env)
    }
  }

  if (!skipDefaultArgs) {
    lines.push("ENV NEXT_TELEMETRY_DISABLED=1")
  }
  lines.push("")

  lines.push(`WORKDIR /workspace/${appDir}`)

  if (ext.pre_build_commands?.length != null && ext.pre_build_commands.length > 0) {
    lines.push("")
    for (const cmd of ext.pre_build_commands) {
      lines.push(cmd)
    }
    lines.push("")
  }

  lines.push(`RUN --mount=type=cache,target=/workspace/${appDir}/.next/cache bun run build`)
  lines.push("")

  lines.push(`# Stage 2: Production runtime`)
  const runtimeImage = ext.runtime_image ?? "node:22.14.0-alpine"
  lines.push(`FROM ${runtimeImage} AS ${runtimeAlias}`)
  lines.push("")
  lines.push("WORKDIR /app")
  lines.push("")

  if (ext.copy_public_before_standalone) {
    lines.push(
      `COPY --chown=node:node --from=builder /workspace/${appDir}/public ./${appDir}/public`
    )
  }

  if (!ext.no_standalone_copy) {
    lines.push("# Copy entire standalone tree in one operation to preserve relative symlinks")
    lines.push(`# between standalone/{app}/node_modules/ and standalone/node_modules/`)

    lines.push(`COPY --chown=node:node --from=builder /workspace/${appDir}/.next/standalone ./`)
    lines.push(
      `COPY --chown=node:node --from=builder /workspace/${appDir}/.next/static ./${appDir}/.next/static`
    )
  }

  if (ext.extra_runtime_copies?.length != null && ext.extra_runtime_copies.length > 0) {
    for (const copy of ext.extra_runtime_copies) {
      lines.push(copy)
    }
  }

  lines.push("")
  lines.push("USER node")
  lines.push("")

  const port = ext.expose_port ?? 3000
  lines.push(`EXPOSE ${port}`)

  if (ext.extra_runtime_args?.length != null && ext.extra_runtime_args.length > 0) {
    lines.push("")
    for (const arg of ext.extra_runtime_args) {
      lines.push(`ARG ${arg}`)
    }
  }

  lines.push("")
  lines.push("ENV NODE_ENV=production")
  lines.push(`ENV PORT=${port}`)
  lines.push("ENV HOSTNAME=0.0.0.0")

  if (ext.extra_runtime_envs?.length != null && ext.extra_runtime_envs.length > 0) {
    for (const env of ext.extra_runtime_envs) {
      lines.push(env)
    }
  }

  if (ext.healthcheck != null) {
    lines.push("")
    lines.push(`HEALTHCHECK ${ext.healthcheck}`)
  }

  lines.push("")

  const cmd =
    ext.runtime_cmd != null
      ? `CMD [${ext.runtime_cmd.map((c) => `"${c}"`).join(", ")}]`
      : `CMD ["node", "${appDir}/server.js"]`
  lines.push(cmd)
  lines.push("")

  return HEADER + lines.join("\n")
}
