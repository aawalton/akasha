import { z } from "zod"
import { apiFetch } from "~/lib/api-fetch"

export const ReadMarkInputSchema = z.object({
  turnId: z.string().min(1),
})

export async function submitReadMark(args: {
  externalId: string
  turnId: string
}): Promise<boolean> {
  const input = ReadMarkInputSchema.safeParse({ turnId: args.turnId })
  if (!input.success) return false
  try {
    const res = await apiFetch(`/api/awen/read/${encodeURIComponent(args.externalId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input.data),
    })
    return res.ok
  } catch {
    return false
  }
}
