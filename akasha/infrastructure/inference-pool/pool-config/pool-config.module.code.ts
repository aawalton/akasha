import { z } from "zod"

export const PoolServiceSchema = z
  .object({
    name: z.string().min(1),
    publicPort: z.number().int().positive(),
    publicHost: z.enum(["0.0.0.0", "127.0.0.1"]),
    internalPort: z.number().int().positive(),
    launchdLabel: z.string().min(1),
  })
  .strict()
export type PoolService = z.infer<typeof PoolServiceSchema>

export const PoolConfigSchema = z
  .object({
    adminPort: z.number().int().positive(),
    warmSet: z.array(z.string().min(1)).readonly(),
    services: z.array(PoolServiceSchema).readonly(),
  })
  .strict()
export type PoolConfig = z.infer<typeof PoolConfigSchema>

export async function loadPoolConfig(path: string): Promise<PoolConfig> {
  const raw: unknown = await Bun.file(path).json()
  return PoolConfigSchema.parse(raw)
}
