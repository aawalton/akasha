import { z } from "zod"
import { getFilesystem } from "../capacitor-bridge/capacitor-bridge.module.code.ts"

const ReaddirResultSchema = z.object({
  files: z.array(z.union([z.string(), z.object({ name: z.string() }).passthrough()])),
})

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
