import { getFilesystem } from "akasha/alan/web/capacitor-bridge/capacitor-bridge.module.code.ts"
import { z } from "zod"

const ReaddirResultSchema = z.object({
  files: z.array(z.union([z.string(), z.object({ name: z.string() }).passthrough()])),
})

const ReadFileResultSchema = z.object({ data: z.string() })

export async function readDocumentsFile(path: string): Promise<string | null> {
  const fs = getFilesystem()
  if (fs == null) return null
  try {
    const result = await fs.readFile({ path, directory: "DOCUMENTS", encoding: "utf8" })
    const file = ReadFileResultSchema.safeParse(result)
    return file.success ? file.data.data : null
  } catch {
    return null
  }
}

export async function writeDocumentsFile(path: string, data: string): Promise<void> {
  const fs = getFilesystem()
  if (fs == null) return
  await fs.writeFile({ path, data, directory: "DOCUMENTS", encoding: "utf8" })
}

export async function listDocumentsFiles(): Promise<readonly string[]> {
  const fs = getFilesystem()
  if (fs == null) return []
  try {
    const result = await fs.readdir({ path: "", directory: "DOCUMENTS" })
    const parsed = ReaddirResultSchema.safeParse(result)
    if (!parsed.success) return []
    return parsed.data.files.map((f) => (typeof f === "string" ? f : f.name))
  } catch {
    return []
  }
}

export async function deleteDocumentsFile(path: string): Promise<void> {
  const fs = getFilesystem()
  if (fs == null || typeof fs.deleteFile !== "function") return
  try {
    await fs.deleteFile({ path, directory: "DOCUMENTS" })
  } catch {}
}
