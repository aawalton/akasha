import { z } from "zod"

const SynthOutput = z.array(
  z
    .object({
      name: z
        .string()
        .min(1)
        .regex(/^[a-z0-9][a-z0-9-]*$/),
      yaml: z.string().min(1),
    })
    .strict()
)

export type SynthEntry = z.infer<typeof SynthOutput>[number]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isThunk(value: unknown): value is () => unknown {
  return typeof value === "function"
}

export async function loadSynthOutputs(synthPath: string): Promise<readonly SynthEntry[]> {
  const mod: unknown = await import(synthPath)
  const entry = isRecord(mod) ? mod.default : undefined
  if (!isThunk(entry)) {
    throw new Error(`${synthPath}: default export is not a function`)
  }
  return SynthOutput.parse(await entry())
}
