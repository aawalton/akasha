import { posix } from "node:path"

export type FileKind =
  | "ts"
  | "tsx"
  | "js"
  | "jsx"
  | "css"
  | "md"
  | "yaml"
  | "yml"
  | "lua"
  | "sql"
  | "json"
  | "sh"
  | "rust"
  | "toml"
  | "swift"
  | "dockerfile"
  | "systemd-unit"
  | "txt"
  | "lock"
  | "image"
  | "xml"
  | "html"
  | "python"
  | "csv"
  | "certificate"
  | "env"
  | "conf"
  | "ignore"
  | "sops-config"
  | "sops-secret"
  | "jsonl"

const CONTAINER_RECIPE_PREFIXES: readonly string[] = ["Dockerfile", "Containerfile"]

const isContainerRecipeBasename = (name: string): boolean =>
  CONTAINER_RECIPE_PREFIXES.some((prefix) => {
    if (!name.startsWith(prefix)) return false
    if (name.length === prefix.length) return true
    return name.charAt(prefix.length) === "."
  })

const PLAIN_TEXT_BASENAMES: ReadonlySet<string> = new Set([
  "LICENSE",
  "LICENCE",
  "COPYING",
  "NOTICE",
])

const ENV_BASENAME = ".env"

const isEnvBasename = (name: string): boolean =>
  name === ENV_BASENAME || name.startsWith(`${ENV_BASENAME}.`)

const IGNORE_SUFFIX = "ignore"

const isIgnoreBasename = (name: string): boolean =>
  name.startsWith(".") && name.endsWith(IGNORE_SUFFIX) && name.length > IGNORE_SUFFIX.length + 1

const SOPS_YAML_ENDING = ".sops.yaml"

const TEMPLATE_SUFFIX = ".template"

export const classifyExtension = (relPath: string): FileKind | null => {
  const base = posix.basename(relPath)
  if (isContainerRecipeBasename(base)) return "dockerfile"
  if (PLAIN_TEXT_BASENAMES.has(base)) return "txt"
  if (isEnvBasename(base)) return "env"
  if (isIgnoreBasename(base)) return "ignore"
  if (base === SOPS_YAML_ENDING) return "sops-config"
  if (base.endsWith(TEMPLATE_SUFFIX) && base.length > TEMPLATE_SUFFIX.length) {
    return classifyExtension(relPath.slice(0, relPath.length - TEMPLATE_SUFFIX.length))
  }
  if (relPath.endsWith(".tsx")) return "tsx"
  if (relPath.endsWith(".ts")) return "ts"
  if (relPath.endsWith(".jsx")) return "jsx"
  if (relPath.endsWith(".js") || relPath.endsWith(".cjs") || relPath.endsWith(".mjs")) return "js"
  if (relPath.endsWith(".css")) return "css"
  if (relPath.endsWith(".md")) return "md"
  if (relPath.endsWith(SOPS_YAML_ENDING)) return "sops-secret"
  if (relPath.endsWith(".yaml")) return "yaml"
  if (relPath.endsWith(".yml")) return "yml"
  if (relPath.endsWith(".lua")) return "lua"
  if (relPath.endsWith(".sql")) return "sql"
  if (relPath.endsWith(".jsonl")) return "jsonl"
  if (relPath.endsWith(".json") || relPath.endsWith(".code-workspace")) return "json"
  if (relPath.endsWith(".sh") || relPath.endsWith(".bash")) return "sh"
  if (relPath.endsWith(".rs")) return "rust"
  if (relPath.endsWith(".toml")) return "toml"
  if (relPath.endsWith(".swift")) return "swift"
  if (relPath.endsWith(".service") || relPath.endsWith(".timer")) return "systemd-unit"
  if (relPath.endsWith(".txt")) return "txt"
  if (relPath.endsWith(".lock")) return "lock"
  if (
    relPath.endsWith(".png") ||
    relPath.endsWith(".jpg") ||
    relPath.endsWith(".jpeg") ||
    relPath.endsWith(".ico") ||
    relPath.endsWith(".dds")
  ) {
    return "image"
  }
  if (
    relPath.endsWith(".xml") ||
    relPath.endsWith(".svg") ||
    relPath.endsWith(".kml") ||
    relPath.endsWith(".plist") ||
    relPath.endsWith(".entitlements")
  ) {
    return "xml"
  }
  if (relPath.endsWith(".html") || relPath.endsWith(".htm")) return "html"
  if (relPath.endsWith(".py")) return "python"
  if (relPath.endsWith(".csv")) return "csv"
  if (relPath.endsWith(".crt") || relPath.endsWith(".pem") || relPath.endsWith(".cer")) {
    return "certificate"
  }
  if (relPath.endsWith(".conf")) return "conf"
  return null
}
