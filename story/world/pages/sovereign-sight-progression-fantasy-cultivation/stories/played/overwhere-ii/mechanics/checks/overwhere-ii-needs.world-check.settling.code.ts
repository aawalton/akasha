import {
  harmOver,
  needsSettled,
} from "akasha/story/world/mechanics/modules/needs-weighing/needs-weighing.module.code.ts"
import { z } from "zod"

const DRY = z.object({ dryHours: z.number().min(0).default(0) })

type Weighed = Extract<ReturnType<typeof needsSettled>, { readonly answered: unknown }>

type Settled =
  | { readonly answered: Weighed["answered"] & { readonly vigourLost: number } }
  | { readonly refused: string }

export function settled(reading: unknown): Settled {
  const weighed = needsSettled(reading)
  if ("refused" in weighed) return weighed
  const dry = DRY.safeParse(reading)
  if (!dry.success) return { refused: `needs read so: ${z.prettifyError(dry.error)}` }
  const harm = harmOver("thirst", weighed.answered.thirst.weight, dry.data.dryHours)
  return {
    answered: { ...weighed.answered, vigourLost: Math.max(0, Math.ceil(harm - 1e-9)) },
  }
}
