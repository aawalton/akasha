import { createHash } from "node:crypto"
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"
import { z } from "zod"

const checkpointSchema = z.object({
  sourceFile: z.string(),
  exportedAtMs: z.number().optional(),
  sinceDay: z.string(),
  metrics: z.array(z.string()),
  recordLinesCommitted: z.number().int().nonnegative(),
  samplesWritten: z.number().int().nonnegative(),
  updatedAt: z.string(),
})

export type ImportCheckpoint = z.infer<typeof checkpointSchema>

export interface CheckpointIdentity {
  readonly sourceFile: string
  readonly exportedAtMs: number | undefined
  readonly sinceDay: string
  readonly metrics: readonly string[]
}

export function checkpointKey(identity: CheckpointIdentity): string {
  const parts = [
    identity.sourceFile,
    String(identity.exportedAtMs ?? "unknown"),
    identity.sinceDay,
    [...identity.metrics].sort().join(","),
  ].join("\u0000")
  return createHash("sha256").update(parts).digest("hex").slice(0, 16)
}

export function defaultCheckpointDir(): string {
  return join(homedir(), ".cache", "health-import")
}

export function checkpointPath(key: string, dir: string = defaultCheckpointDir()): string {
  return join(dir, `${key}.json`)
}

export async function readCheckpoint(
  key: string,
  dir: string = defaultCheckpointDir()
): Promise<ImportCheckpoint | undefined> {
  let raw: string
  try {
    raw = await readFile(checkpointPath(key, dir), "utf8")
  } catch {
    return undefined
  }
  try {
    const parsed = checkpointSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : undefined
  } catch {
    return undefined
  }
}

export async function writeCheckpoint(
  key: string,
  checkpoint: ImportCheckpoint,
  dir: string = defaultCheckpointDir()
): Promise<undefined> {
  await mkdir(dir, { recursive: true })
  await writeFile(checkpointPath(key, dir), `${JSON.stringify(checkpoint, null, 2)}\n`, "utf8")
  return undefined
}

export async function clearCheckpoint(
  key: string,
  dir: string = defaultCheckpointDir()
): Promise<undefined> {
  await rm(checkpointPath(key, dir), { force: true })
  return undefined
}
