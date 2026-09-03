import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import { z } from "zod"

export interface CompanionVersion {
  id: string
  versionNumber: number
  isCheckpoint: boolean
  checkpointName: string | null
  createdAt: string
  buildHash: string
  buildMetadata: Record<string, unknown>
}

const companionVersionSchema = z.object({
  id: z.string(),
  versionNumber: z.number(),
  isCheckpoint: z.boolean(),
  checkpointName: z.string().nullable(),
  createdAt: z.string(),
  buildHash: z.string(),
  buildMetadata: z.record(z.string(), z.unknown()),
})

const responseSchema = z.union([
  z.object({ versions: z.array(companionVersionSchema) }),
  z.object({ error: z.string() }),
])

export async function getCompanionVersions(
  buildId: BuildId
): Promise<{ versions: CompanionVersion[] } | { error: string }> {
  try {
    const response = await fetch(`/api/companion-versions/${encodeURIComponent(buildId)}`, {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    })
    if (!response.ok) {
      return { error: `Failed to fetch versions: HTTP ${response.status}` }
    }
    return responseSchema.parse(await response.json())
  } catch (err) {
    return {
      error: `Failed to fetch versions: ${err instanceof Error ? err.message : "Unknown error"}`,
    }
  }
}
