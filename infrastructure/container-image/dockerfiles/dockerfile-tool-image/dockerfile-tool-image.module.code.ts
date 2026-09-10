import { join } from "node:path"
import type {
  DockerfileExtensions,
  ServiceConfig,
} from "../dockerfile-extensions/dockerfile-extensions.module.code.ts"
import { HEADER } from "../dockerfile-services/dockerfile-services.module.code.ts"

export function generateToolImageDockerfile(
  _appName: string,
  _config: ServiceConfig,
  _nameMap: Map<string, string>,
  ext: DockerfileExtensions
): string {
  const lines: string[] = []
  for (const donor of ext.external_donors ?? []) {
    lines.push(`FROM ${donor.image} AS ${donor.name}`)
  }
  lines.push(`FROM ${ext.base_image ?? "alpine:3.21"}`)

  if (ext.run_as_user != null) lines.push("USER root")

  if (ext.system_packages?.length != null && ext.system_packages.length > 0) {
    lines.push(`RUN apk add --no-cache ${ext.system_packages.join(" ")}`)
  }

  if (ext.extra_run_commands?.length != null && ext.extra_run_commands.length > 0) {
    for (const cmd of ext.extra_run_commands) {
      lines.push(cmd)
    }
  }

  if (ext.run_as_user != null) lines.push(`USER ${ext.run_as_user}`)

  lines.push("")
  return HEADER + lines.join("\n")
}

export function getOutputPath(
  repoRoot: string,
  config: ServiceConfig,
  ext: DockerfileExtensions
): string {
  if (ext.output_filename != null && config.type === "tool-image") {
    return join(repoRoot, config.dir, ext.output_filename)
  }
  if (ext.output_filename != null) {
    return join(repoRoot, config.dir, "deploy", ext.output_filename)
  }
  if (config.type === "nextjs") {
    return join(repoRoot, config.dir, "deploy/Dockerfile.nextjs")
  }
  if (config.type === "bun-service") {
    return join(repoRoot, config.dir, "Dockerfile")
  }
  return join(repoRoot, config.dir, "deploy/Dockerfile")
}
