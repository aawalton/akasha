import type {
  DockerfileExtensions,
  ServiceConfig,
} from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-extensions/dockerfile-extensions.module.code.ts"
import { HEADER } from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-services/dockerfile-services.module.code.ts"

export function generateToolImageDockerfile(
  _appName: string,
  _config: ServiceConfig,
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
