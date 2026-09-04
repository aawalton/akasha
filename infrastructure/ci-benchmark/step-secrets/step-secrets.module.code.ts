import { z } from "zod"
import type { SecretRef } from "../local-step-types/local-step-types.module.code.ts"

const SopsPayloadSchema = z.record(z.string(), z.string())

function parseSopsJson(stdout: string, sopsFilePath: string): Record<string, string> {
  try {
    return SopsPayloadSchema.parse(JSON.parse(stdout))
  } catch {
    throw new Error(`sops decrypt of ${sopsFilePath} did not return a JSON object of strings`)
  }
}

export async function loadPipelineSecrets(sopsFilePath: string): Promise<Map<string, string>> {
  const proc = Bun.spawn(["sops", "--output-type", "json", "-d", sopsFilePath], {
    stdout: "pipe",
    stderr: "pipe",
  })

  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])

  const exitCode = await proc.exited
  if (exitCode !== 0) {
    throw new Error(`sops decrypt failed (exit ${exitCode}): ${stderr}`)
  }

  const parsed = parseSopsJson(stdout, sopsFilePath)
  return new Map(Object.entries(parsed))
}

function isSecretRef(value: string | SecretRef): value is SecretRef {
  return typeof value === "object" && "fromSecret" in value
}

export function resolveStepEnv(
  env: Record<string, string | SecretRef>,
  secrets: Map<string, string>
): Record<string, string> {
  const resolved: Record<string, string> = {}
  for (const [key, value] of Object.entries(env)) {
    if (isSecretRef(value)) {
      const secret = secrets.get(value.fromSecret)
      if (secret === undefined) {
        throw new Error(`Secret "${value.fromSecret}" not found for env var "${key}"`)
      }
      resolved[key] = secret
    } else {
      resolved[key] = value
    }
  }
  return resolved
}
