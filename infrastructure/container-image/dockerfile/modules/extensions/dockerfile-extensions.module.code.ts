import { asBoolean } from "akasha/code/type/narrowing/modules/as-boolean/as-boolean.module.code.ts"
import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"

const SERVICE_TYPES = ["nextjs", "bun-service", "tool-image"] as const
type ServiceType = (typeof SERVICE_TYPES)[number]

const PACKAGE_INSTALLERS = ["apk", "apt"] as const
type PackageInstaller = (typeof PACKAGE_INSTALLERS)[number]

const DEFAULT_INSTALLER: PackageInstaller = "apk"

export interface ServiceConfig {
  type: ServiceType
  dir: string
  extensionFile?: string
}

export interface DockerfileExtensions {
  extra_stages?: readonly string[]
  extra_install_copies?: readonly string[]
  extra_build_args?: readonly string[]
  extra_build_envs?: readonly string[]
  pre_build_commands?: readonly string[]
  extra_runtime_args?: readonly string[]
  extra_runtime_envs?: readonly string[]
  extra_runtime_copies?: readonly string[]
  config_files?: readonly string[]
  source_dirs?: readonly string[]
  bulk_app_copy?: boolean
  runtime_stage_alias?: string
  copy_public_before_standalone?: boolean
  no_supabase_url?: boolean

  base_image?: string
  runtime_image?: string
  runtime_cmd?: readonly string[]
  no_standalone_copy?: boolean
  no_default_build_args?: boolean
  system_packages?: readonly string[]
  package_installer?: PackageInstaller
  single_stage?: boolean
  extra_run_commands?: readonly string[]
  expose_port?: number
  extra_source_copies?: readonly string[]
  healthcheck?: string
  install_flags?: string
  no_build_step?: boolean
  no_tsconfig_base?: boolean
  output_filename?: string
  run_as_user?: string
  external_donors?: readonly { readonly name: string; readonly image: string }[]
}

function asStringArrayOrUndefined(value: unknown): readonly string[] | undefined {
  if (value === undefined) return undefined
  if (!Array.isArray(value)) return undefined
  return value.filter((v): v is string => typeof v === "string")
}

function asExternalDonorsOrUndefined(
  value: unknown
): readonly { readonly name: string; readonly image: string }[] | undefined {
  if (value === undefined) return undefined
  if (!Array.isArray(value)) {
    throw new Error("external_donors must be an array of { name, image } objects")
  }
  return value.map((entry, index) => {
    if (!isObjectRecord(entry)) {
      throw new Error(`external_donors[${index}] must be an object with string name and image`)
    }
    const name = entry.name
    const image = entry.image
    if (typeof name !== "string" || typeof image !== "string") {
      throw new Error(`external_donors[${index}] must have string name and string image fields`)
    }
    return { name, image }
  })
}

function asPackageInstallerOrUndefined(value: unknown): PackageInstaller | undefined {
  if (value === undefined) return undefined
  const found = PACKAGE_INSTALLERS.find((one) => one === value)
  if (found === undefined) {
    throw new Error(`package_installer is one of ${PACKAGE_INSTALLERS.join(", ")}`)
  }
  return found
}

export function systemPackagesLine(ext: DockerfileExtensions): string | null {
  const packages = ext.system_packages
  if (packages === undefined || packages.length === 0) return null
  const named = packages.join(" ")
  const installer = ext.package_installer ?? DEFAULT_INSTALLER
  switch (installer) {
    case "apk":
      return `RUN apk add --no-cache ${named}`
    case "apt":
      return `RUN apt-get update && apt-get install -y --no-install-recommends ${named} && rm -rf /var/lib/apt/lists/*`
    default:
      return assertNever(installer)
  }
}

export function parseDockerfileExtensions(value: unknown): DockerfileExtensions {
  if (!isObjectRecord(value)) return {}
  return {
    extra_stages: asStringArrayOrUndefined(value.extra_stages),
    extra_install_copies: asStringArrayOrUndefined(value.extra_install_copies),
    extra_build_args: asStringArrayOrUndefined(value.extra_build_args),
    extra_build_envs: asStringArrayOrUndefined(value.extra_build_envs),
    pre_build_commands: asStringArrayOrUndefined(value.pre_build_commands),
    extra_runtime_args: asStringArrayOrUndefined(value.extra_runtime_args),
    extra_runtime_envs: asStringArrayOrUndefined(value.extra_runtime_envs),
    extra_runtime_copies: asStringArrayOrUndefined(value.extra_runtime_copies),
    config_files: asStringArrayOrUndefined(value.config_files),
    source_dirs: asStringArrayOrUndefined(value.source_dirs),
    bulk_app_copy: asBoolean(value.bulk_app_copy),
    runtime_stage_alias: stringIn(value.runtime_stage_alias) ?? undefined,
    copy_public_before_standalone: asBoolean(value.copy_public_before_standalone),
    no_supabase_url: asBoolean(value.no_supabase_url),
    base_image: stringIn(value.base_image) ?? undefined,
    runtime_image: stringIn(value.runtime_image) ?? undefined,
    runtime_cmd: asStringArrayOrUndefined(value.runtime_cmd),
    no_standalone_copy: asBoolean(value.no_standalone_copy),
    no_default_build_args: asBoolean(value.no_default_build_args),
    system_packages: asStringArrayOrUndefined(value.system_packages),
    package_installer: asPackageInstallerOrUndefined(value.package_installer),
    single_stage: asBoolean(value.single_stage),
    extra_run_commands: asStringArrayOrUndefined(value.extra_run_commands),
    expose_port: parseNumber(value.expose_port),
    extra_source_copies: asStringArrayOrUndefined(value.extra_source_copies),
    healthcheck: stringIn(value.healthcheck) ?? undefined,
    install_flags: stringIn(value.install_flags) ?? undefined,
    no_build_step: asBoolean(value.no_build_step),
    no_tsconfig_base: asBoolean(value.no_tsconfig_base),
    output_filename: stringIn(value.output_filename) ?? undefined,
    run_as_user: stringIn(value.run_as_user) ?? undefined,
    external_donors: asExternalDonorsOrUndefined(value.external_donors),
  }
}
