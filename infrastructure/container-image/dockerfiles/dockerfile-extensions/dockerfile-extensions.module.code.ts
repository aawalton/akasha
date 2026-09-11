import { asBoolean } from "akasha/utils/narrow/as-boolean/as-boolean.module.code.ts"
import { isObjectRecord } from "akasha/utils/narrow/is-object-record/is-object-record.module.code.ts"
import { parseNumber } from "akasha/utils/narrow/parse-number/parse-number.module.code.ts"
import { stringIn } from "akasha/utils/narrow/string-in/string-in.module.code.ts"

export const SERVICE_TYPES = ["nextjs", "bun-service", "tool-image"] as const
export type ServiceType = (typeof SERVICE_TYPES)[number]

export function isServiceType(value: unknown): value is ServiceType {
  return typeof value === "string" && SERVICE_TYPES.some((t) => t === value)
}

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
